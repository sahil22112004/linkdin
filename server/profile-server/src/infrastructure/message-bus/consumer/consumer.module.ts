import { Module } from "@nestjs/common";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { RabbitMQConsumer } from "./user.consume"
import { TypeOrmModule } from "@nestjs/typeorm";
import { consumeCommand } from "../cli/consumerCommand";
import { config } from "dotenv";
import { UserInbox } from "../../../domain/entities/userInbox.entity";
import { User } from "../../../domain/entities/user.entity";
import { CreateUserService } from "./createUser.service";

config()

@Module({
  imports: [
      TypeOrmModule.forFeature([User, UserInbox]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, UserInbox],
      synchronize: false,
    }),
  ],
  providers: [RabbitMQConnection, RabbitMQConsumer,consumeCommand,CreateUserService],
})
export class ConsumerModule {}