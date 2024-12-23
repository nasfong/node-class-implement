// jest.setup.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Declare the server globally
let mongoServer: MongoMemoryServer;

// Increase Jest's timeout for long operations
jest.setTimeout(30000);

beforeAll(async () => {
  try {
    // Start MongoMemoryServer
    mongoServer = await MongoMemoryServer.create({});
    const uri = mongoServer.getUri();

    // Set up mongoose connection
    await mongoose.connect(uri);
  } catch (error) {
    throw error;
  }
});

afterAll(async () => {
  try {
    // Close mongoose connection
    await mongoose.disconnect();

    // Stop in-memory MongoDB server
    await mongoServer.stop();
  } catch (error) {
    console.error('Error shutting down MongoMemoryServer:', error);
  }
});
