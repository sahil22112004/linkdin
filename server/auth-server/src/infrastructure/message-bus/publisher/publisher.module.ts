import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from 'dotenv'
import { UsersOutbox } from "../../../domain/entities/userOutBox.entity";
import { UsersPublisher } from "./user.publisher";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { PublishCommand } from "../cli/publishCommand";

config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UsersOutbox],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UsersOutbox]),
  ],
  providers: [RabbitMQConnection, UsersPublisher, PublishCommand],
})
export class ProducerModule {}