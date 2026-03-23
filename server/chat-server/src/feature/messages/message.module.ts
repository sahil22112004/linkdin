import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../../domain/enitites/conversation.entity';
import { ConversationParticipant } from '../../domain/enitites/conversationParticipant.entity';
import { Message } from '../../domain/enitites/message.entity';
import { MessageRead } from '../../domain/enitites/messageRead.entity';
import { MessageController } from './message.controller';
import { ChatGateway } from './message.gateway';
import { ChatService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation,ConversationParticipant,Message,MessageRead])],
  controllers: [MessageController],
  providers: [ChatGateway,ChatService],
})
export class MessageModule {}