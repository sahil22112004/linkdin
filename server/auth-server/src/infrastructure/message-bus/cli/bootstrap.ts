import { CommandFactory } from "nest-commander";
import { config } from "dotenv";
import { ProducerModule } from "../publisher/publisher.module";

async function bootstrap() {
  config();
  await CommandFactory.run(ProducerModule, ["warn", "error"]);
}

bootstrap();

