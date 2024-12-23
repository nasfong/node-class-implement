import { ObjectType, Field, ID, Int } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@ObjectType()
export class User {
  @Field(() => ID, { name: 'id' })
  readonly id!: ObjectId;

  @Field()
  @prop({ type: String, required: true })
  name!: string;

  @Field()
  @prop({ required: true })
  email!: string;

  @Field(() => Int, { nullable: true })
  @prop({ type: Number })
  age?: number;
}

export const UserModel = getModelForClass(User);
