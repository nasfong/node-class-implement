import amqp, { Connection, Channel } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
const QUEUE_NAME = "user_queue";

// Initialize RabbitMQ connection and return channel
const init = async (): Promise<Channel> => {
  let connection: Connection | null = null;
  let channel: Channel | null = null;

  if (!connection) {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
  }

  if (!channel) {
    throw new Error("Channel not initialized");
  }

  return channel;
};

// Create a service object
const RabbitMQService = {
  // Publish message to queue
  publishMessage: async (message: object): Promise<void> => {
    const channel = await init();
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`📤 Message sent:`, message);
  },

  // Consume messages from queue
  consumeMessages: async (): Promise<void> => {
    const channel = await init();
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log(`📩 Received message:`, messageContent);
        channel.ack(msg); // ACK to confirm processing
      }
    });
    console.log(`🎧 Listening on queue: ${QUEUE_NAME}`);
  },
};

export { RabbitMQService };
