import { User, UserModel } from '../entities/UserEntity';


export class UserRepository {
  async findAll(): Promise<User[]> {
    return UserModel.find();
  }

  async create(data: Partial<User>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }
}
