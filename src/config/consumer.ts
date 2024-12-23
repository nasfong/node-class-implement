import amqp from 'amqplib';

export async function consumeLogs() {
  const queueName = 'user_logs';

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || '');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    console.log(`Waiting for messages in queue: ${queueName}`);
    channel.consume(queueName, (message) => {
      if (message) {
        console.log(`Log received: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error consuming logs:', error);
  }
}
