import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway(3002, {
    cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly chatService: ChatService
    ) {}

    @WebSocketServer()
    server: Server

    async handleConnection(client: Socket) {
        console.log('User Connected', client.id)
    }

    async handleDisconnect(client: Socket) {
        console.log('User Disconnected', client.id)
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(
        @MessageBody() body: any,
        @ConnectedSocket() client: Socket
    ) {
        return this.chatService.joinRoom(this.server, client, body.chat_room_Id)
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(
        @MessageBody() body: any,
        @ConnectedSocket() client: Socket
    ) {
        return this.chatService.leaveRoom(this.server, client, body.chat_room_Id)
    }

    @SubscribeMessage('sendMessage')
    async sendMessage(
        @MessageBody() body: any
    ) {
        return this.chatService.sendMessage(this.server, body)
    }

    @SubscribeMessage('typing')
    async typing(
        @MessageBody() body: any
    ) {
        return this.chatService.typing(this.server, body)
    }

    @SubscribeMessage('stopTyping')
    async stopTyping(
        @MessageBody() body: any
    ) {
        return this.chatService.stopTyping(this.server, body)
    }

}

