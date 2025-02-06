import { ClassType, Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Pagination {
  @Field(() => Int)
  currentPage!: number;

  @Field(() => Int)
  lastPage!: number;

  @Field(() => Int)
  from!: number;

  @Field(() => Int)
  to!: number;

  @Field(() => Int)
  perPage!: number;

  @Field(() => Int)
  total!: number;
}

@InputType()
export class PagerInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;

  @Field(() => Int, { defaultValue: 20 })
  limit: number = 20;
}

export function PaginatedResponse<TItem extends object>(
  itemsField: ClassType<TItem>
) {
  @ObjectType()
  class PaginatedResponseClass {
    @Field(() => [itemsField])
    documents!: TItem[];

    @Field(() => Pagination)
    pagination!: Pagination;
  }
  return PaginatedResponseClass;
}
