import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { UserInbox } from "../../../domain/entities/userInbox.entity";
import { CreateUserService } from './createUser.service'

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
    constructor(
        private rabbitConnection: RabbitMQConnection,
        @InjectRepository(UserInbox) private inboxRepository: Repository<UserInbox>,
        private CreateUserService: CreateUserService

    ) { }

    async onModuleInit() {
        const channel = await this.rabbitConnection.getChannel();

        await channel.assertExchange("users_exchange", "direct", {
            durable: true,
        });

        await channel.assertQueue("users_queue", {
            durable: true,
        });

        await channel.bindQueue(
            "users_queue",
            "users_exchange",
            "bindUser"
        );

        channel.consume(
            "users_queue",
            async (msg: any) => {
                if (!msg) return;
                try {
                    const content = msg.content.toString();
                    const data = JSON.parse(content);
                    console.log("data is", data)

                    const existing = await this.inboxRepository.findOne({
                        where: { eventId: data.messageId },
                    });

                    if (!existing) {
                        const inboxEntry = this.inboxRepository.create({
                            eventId: data.messageId,
                            handler: "user.create",
                        });
                        await this.inboxRepository.save(inboxEntry)

                        console.log("payload is ", data.Payload)

                        const res = await this.CreateUserService.CreateUser(data.Payload)


                    } else {
                        console.log("skip dublicate")
                    }

                    channel.ack(msg);

                } catch (error) {
                    console.error("Error processing message:", error);
                    channel.nack(msg, false, true);

                }

            },
            { noAck: false }
        )


    }
}