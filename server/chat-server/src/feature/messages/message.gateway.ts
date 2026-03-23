import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './message.service';
import { MessageType } from '../../domain/enitites/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      socket.join(userId);
      console.log(`User connected: ${userId}`);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(data.conversationId);
    console.log(`Joined room: ${data.conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderId: string;
      content: string;
      type: 'TEXT' | 'IMAGE' | 'VIDEO';
    },
  ) {
    const messageType: MessageType =
      MessageType[data.type as keyof typeof MessageType];

    const message = await this.chatService.sendMessage(
      data.conversationId,
      data.senderId,
      data.content,
      messageType,
    );

    this.server.to(data.conversationId).emit('newMessage', message);

    return message;
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody()
    data: { conversationId: string; userId: string },
  ) {
    this.server
      .to(data.conversationId)
      .emit('typing', { userId: data.userId });
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @MessageBody()
    data: { conversationId: string; userId: string },
  ) {
    this.server
      .to(data.conversationId)
      .emit('stopTyping', { userId: data.userId });
  }
}