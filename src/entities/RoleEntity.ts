import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./UserEntity";
import { PaginatedResponse } from "../graphql/typeDefs/paginationTypeDef";

@ObjectType('RoleResponse')
export class Role {
  @Field(() => ID, { name: 'id' })
  readonly id!: ObjectId;

  @Field()
  @prop({ required: true })
  name!: string;

  @Field(() => User)
  @prop({
    ref: () => User,
    required: true,
    alias: "user_Id",
  })
  userId!: Ref<User>;
}

export const RoleModel = getModelForClass(Role)

@ObjectType()
export class ListRoleResponse extends PaginatedResponse(Role) { }

@InputType()
export class RoleFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  userId?: string;
}