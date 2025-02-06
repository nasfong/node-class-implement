import { RabbitMQService } from "./rabbitMQService";

(async () => {
  console.log("🚀 Worker started...");
  await RabbitMQService.consumeMessages();
})();
