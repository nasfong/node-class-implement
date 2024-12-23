import { Role, RoleModel } from '../entities/RoleEntity';
import { UserModel } from '../entities/UserEntity';
import { Types } from 'mongoose';
import getAllDocuments from '../utils/getAllAction';

export class RoleRepository {
  async findAll(pager?: any): Promise<{ documents: Role[]; pagination: any }> {
    const query = {}; // You can add any additional filters if needed
    const orderBy = { name: 'asc' }; // Optional sorting by field (e.g., by name)

    // Fetch the documents and pagination details using the utility function
    return await getAllDocuments<any, {}>(RoleModel, pager, query, orderBy as any);
  }

  async create(name: string, userId: string): Promise<Role> {

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newRole = new RoleModel({
      name,
      userId
    })

    return await newRole.save();
  }
}