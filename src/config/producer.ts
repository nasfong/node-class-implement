import amqp from 'amqplib';

export async function sendLogToQueue(logMessage: string) {
  const queueName = 'user_logs';

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || '');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(logMessage));
    console.log(`Log sent to queue: ${logMessage}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error sending log to queue:', error);
  }
}
