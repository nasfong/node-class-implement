import { ClassType, Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class Pagination {
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

export function PaginatedResponse<TItem extends object>(
  itemsField: ClassType<TItem>
) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field(() => [itemsField])
    documents!: TItem[];

    @Field(() => Pagination)
    pagination!: Pagination;
  }
  return PaginatedResponseClass;
}
