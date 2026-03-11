import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from 'src/domain/enitites/chat.entity'
import { Server, Socket } from 'socket.io'

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Message)
        private messageRepo: Repository<Message>,
    ) {}

    async joinRoom(server: Server, client: Socket, roomId: string) {
        client.join(roomId)
        server.to(roomId).emit('userJoined', { userId: client.id })
    }

    async leaveRoom(server: Server, client: Socket, roomId: string) {
        client.leave(roomId)
        server.to(roomId).emit('userLeft', { userId: client.id })
    }

    async sendMessage(server: Server, payload: any) {

        const message = this.messageRepo.create({
            chat_room_Id: payload.chat_room_Id,
            sender_Id: payload.sender_Id,
            reciver_Id: payload.reciver_Id,
            message: payload.message
        })

        const saved = await this.messageRepo.save(message)

        server.to(payload.chat_room_Id).emit('receiveMessage', saved)

        return saved
    }

    async typing(server: Server, payload: any) {

        server.to(payload.chat_room_Id).emit('userTyping', {
            userId: payload.sender_Id
        })

    }

    async stopTyping(server: Server, payload: any) {

        server.to(payload.chat_room_Id).emit('userStopTyping', {
            userId: payload.sender_Id
        })

    }

    async getMessages(roomId: string) {

        return this.messageRepo.find({
            where: { chat_room_Id: roomId },
            order: { receivedAt: 'ASC' }
        })

    }

}