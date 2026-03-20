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
    }
  }

  handleDisconnect(socket: Socket) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderId: string;
      receiverId: string;
      content: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    const message = await this.chatService.sendMessage(
      data.conversationId,
      data.senderId,
      data.content,
    );

    this.server.to(data.receiverId).emit('newMessage', message);

    return message;
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody()
    data: { receiverId: string },
  ) {
    this.server.to(data.receiverId).emit('typing');
  }
}