import { Pagination } from "../graphql/typeDefs/paginationTypeDef";

export const pagination = <T>(
  documents: T[],
  totalDocuments: number,
  page: number = 1,
  limit: number = 20
): { documents: T[]; pagination: Pagination } => {
  if (limit > 100) {
    throw new Error('Limit exceeded');
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalDocuments / limit);

  // Calculate skip value based on page and limit
  const skip = (page - 1) * limit;

  // Correct calculation for from and to based on totalDocuments and document length
  let fromItem = skip + 1;
  let toItem = skip + documents.length;

  // If no documents, reset `fromItem` and `toItem`
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

