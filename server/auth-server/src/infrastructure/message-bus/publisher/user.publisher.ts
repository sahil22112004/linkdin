import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { UsersOutbox, OutboxStatus } from "../../../domain/entities/userOutBox.entity";

@Injectable()
export class UsersPublisher {

  constructor(
    @InjectRepository(UsersOutbox)
    private outboxRepo: Repository<UsersOutbox>,
    private rabbitConnection: RabbitMQConnection
  ) {}

  async publishPendingMessages() {

    const channel = await this.rabbitConnection.getChannel();

    await channel.assertExchange("users_exchange", "direct", {
      durable: true,
    });

    const pendingMessages = await this.outboxRepo.find({
      where: { status: OutboxStatus.PENDING },
    });

    for (const msg of pendingMessages) {
      const payload = {
        messageId: msg.id,
        Payload: msg.Payload,
      };

      channel.publish(
        "users_exchange",
        "bindUser",
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
      );

      msg.status = OutboxStatus.PUBLISHED;
      await this.outboxRepo.save(msg);
    }
  }
}

