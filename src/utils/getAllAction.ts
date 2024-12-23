import { Model, SortOrder } from 'mongoose';

interface Pager {
  page: number;
  limit: number;
}

interface Pagination {
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  perPage: number;
  total: number;
}

const ENV = {
  ROW_LIMIT: 20,
  MAX_LIMIT: 100
}

const getAllDocuments = async <T extends Document, Q>(
  model: Model<T>,
  pager: Pager,
  query: Q,
  orderBy?:
    | 'string'
    | { [key: string]: SortOrder | { $meta: 'textScore' } }
    | [string, SortOrder][]
): Promise<{ documents: T[]; pagination: Pagination }> => {
  const sortBy = orderBy || {};
  const defaultPager: Pager = { page: 1, limit: ENV.ROW_LIMIT };
  const { page, limit } = Object.assign(defaultPager, pager);

  if (limit > ENV.MAX_LIMIT) {
    throw new Error('Limit exceeded');
  }

  const totalDocuments = Array.isArray(query)
    ? await model.countDocuments(query[0].$match)
    : await model.countDocuments(query as any);

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalDocuments / limit);

  let documents = [];
  if (Array.isArray(query)) {
    query.push({ $skip: skip });
    query.push({ $sort: sortBy });
    query.push({ $limit: limit });
    documents = await model.aggregate(query);
  } else {
    documents = await model.find(query as any).skip(skip).limit(limit).sort(sortBy);
  }

  let fromItem = skip + 1;
  let toItem = documents.length + skip;
  if (documents.length < 1) {
    fromItem = 0;
    toItem = 0;
  }
  const pagination: Pagination = {
    currentPage: page,
    lastPage: totalPages,
    from: fromItem,
    to: toItem,
    perPage: limit,
    total: totalDocuments,
  };

  return { documents, pagination };
};

export default getAllDocuments;
