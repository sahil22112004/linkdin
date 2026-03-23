import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationParticipant } from './domain/enitites/conversationParticipant.entity'
import { Conversation } from './domain/enitites/conversation.entity';
import { Message } from './domain/enitites/message.entity';
import { MessageRead } from './domain/enitites/messageRead.entity';
import { MessageModule } from './feature/messages/message.module';
import { config } from "dotenv"

config();



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Conversation,ConversationParticipant,Message,MessageRead],
      synchronize: false,
    }),
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
