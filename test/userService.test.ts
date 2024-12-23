import { UserService } from '../src/services/UserService';

describe('UserService with MongoMemoryServer', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    test('should create a user with a valid id', async () => {
      const user = await userService.createUser('John Doe', 'john@example.com', 30);

      // Check if id is defined and is a string (MongoDB ObjectId is serialized as a string)
      expect(user.id).toBeDefined();
      expect(user.id).toMatch(/[a-f\d]{24}/);
      // expect(typeof user.id).toBe('string');


      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.age).toBe(30);  // Ensure age is set correctly
    });

    test('should create a user without age', async () => {
      const user = await userService.createUser('Jane Doe', 'jane@example.com');

      // Ensure age is undefined when not provided
      expect(user.age).toBeUndefined();
    });

    test('should throw an error if name is too short', async () => {
      await expect(userService.createUser('Jo', 'john@example.com', 25)).rejects.toThrow(
        'Name should be at least 3 characters long',
      );
    });

    test('should throw an error for invalid email format', async () => {
      await expect(userService.createUser('John Doe', 'invalid-email', 25)).rejects.toThrow('Invalid email format');
    });

    test('should throw an error for invalid age', async () => {
      await expect(userService.createUser('John Doe', 'john@example.com', 130)).rejects.toThrow(
        'Age must be between 0 and 120',
      );
    });
  });

  describe('getAllUsers', () => {
    test('should get a list of users', async () => {
      await userService.createUser('Jane Doe', 'jane@example.com', 28); // Add a user for testing
      const users = await userService.getAllUsers();

      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
    });
  });
});
