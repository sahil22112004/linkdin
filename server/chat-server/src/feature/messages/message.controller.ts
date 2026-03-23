import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './message.service';
import { ConversationResponseDto } from '../../domain/dto/conversation-response.dto';
import { Message } from '../../domain/enitites/message.entity';

@Controller('chat')
export class MessageController {
  constructor(private readonly chatService: ChatService) {}

  @Post('conversation')
  createConversation(
    @Body() body: { user1: string; user2: string },
  ): Promise<string> {
    return this.chatService.createOrGetConversation(
      body.user1,
      body.user2,
    );
  }

  @Get('conversations/:userId')
  getConversations(
    @Param('userId') userId: string,
  ): Promise<ConversationResponseDto[]> {
    return this.chatService.getUserConversations(userId);
  }

  @Get('messages/:conversationId')
  getMessages(
    @Param('conversationId') conversationId: string,
    @Query('page') page: number,
  ): Promise<Message[]> {
    return this.chatService.getMessages(conversationId, page || 1);
  }

  @Post('message')
  sendMessage(
    @Body()
    body: {
      conversationId: string;
      senderId: string;
      content: string;
    },
  ): Promise<Message> {
    return this.chatService.sendMessage(
      body.conversationId,
      body.senderId,
      body.content,
    );
  }

  @Post('read')
  markRead(
    @Body()
    body: {
      conversationId: string;
      userId: string;
    },
  ): Promise<boolean> {
    return this.chatService.markAsRead(
      body.conversationId,
      body.userId,
    );
  }
}