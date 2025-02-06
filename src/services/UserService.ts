import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/UserEntity';
import { RabbitMQService } from '../worker/rabbitMQService';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async createUser(name: string, email: string, age?: number): Promise<User> {
    if (!name || name.length < 3) throw new Error("Name should be at least 3 characters long");
    if (!email || !/\S+@\S+\.\S+/.test(email)) throw new Error("Invalid email format");
    if (age && (age < 0 || age > 120)) throw new Error("Age must be between 0 and 120");

    const newUser = await this.userRepository.create({ name, email, age });

    // 📨 Send a message to RabbitMQ
    await RabbitMQService.publishMessage({
      event: "USER_CREATED",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });

    return newUser;
  }
}
