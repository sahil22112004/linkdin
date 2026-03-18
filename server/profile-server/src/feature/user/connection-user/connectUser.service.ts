import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, ConnectionStatus } from '../../../domain/entities/connection.entity';

@Injectable()
export class ConnectUserService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepo: Repository<Connection>,
  ) {}

  async toggleConnection(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      throw new BadRequestException('Invalid');
    }

    let connection = await this.connectionRepo.findOne({
      where: [
        {
          senderId: { id: senderId },
          receiverId: { id: receiverId },
        },
        {
          senderId: { id: receiverId },
          receiverId: { id: senderId },
        },
      ],
      withDeleted: true,
      relations: ['senderId', 'receiverId'],
    });

    if (!connection) {
      return await this.connectionRepo.save({
        senderId: { id: senderId } as any,
        receiverId: { id: receiverId } as any,
        status: ConnectionStatus.PENDING,
      });
    }

    if (connection.deletedAt) {
      connection.deletedAt = null;
      connection.status = ConnectionStatus.PENDING;
      return await this.connectionRepo.save(connection);
    }

    if (connection.status === ConnectionStatus.REJECTED) {
      connection.status = ConnectionStatus.PENDING;
      connection.senderId = { id: senderId } as any;
      connection.receiverId = { id: receiverId } as any;
      return await this.connectionRepo.save(connection);
    }

    await this.connectionRepo.softDelete(connection.id);
    return { message: 'Connection removed' };
  }
}