import { Role, RoleFilterInput, RoleModel } from '../entities/RoleEntity';
import { UserModel } from '../entities/UserEntity';
import { Types } from 'mongoose';
import { PagerInput } from '../graphql/typeDefs/paginationTypeDef';

export class RoleRepository {
  async findAll(pager?: PagerInput, filter?: RoleFilterInput): Promise<Role[]> {
    const page = pager?.page || 1;
    const limit = pager?.limit || 20;
    const query: { [name: string]: unknown } = {}

    if (filter?.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }
    if (filter?.userId) {
      query.userId = new Types.ObjectId(filter.userId)
    }

    return await RoleModel.find(query).populate('userId')
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async create(name: string, userId: string): Promise<Role> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId format. Must be a valid ObjectId.");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newRole = await RoleModel.create({
      name,
      userId: userId,
    });

    // Populate userId field before returning
    return await newRole.populate("userId");
  }
}