import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { User } from '../../entities/UserEntity';
import { UserService } from '../../services/UserService';

@Resolver(User)
export class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('age', () => Int, { nullable: true }) age?: number
  ): Promise<User> {
    return this.userService.createUser(name, email, age);
  }
}
