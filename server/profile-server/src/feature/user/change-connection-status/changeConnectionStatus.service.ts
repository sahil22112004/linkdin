import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, ConnectionStatus } from '../../../domain/entities/connection.entity';
import { Repository, IsNull } from 'typeorm';

@Injectable()
export class ChnageConnectionStatusService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepo: Repository<Connection>,
  ) {}

  async changeStatus(
    connectionId: string,
    status: 'ACCEPTED' | 'REJECTED',
    userId: string,
  ) {
    const connection = await this.connectionRepo.findOne({
      where: { id: connectionId, deletedAt: IsNull() },
      relations: ['receiverId'],
    });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    if (connection.receiverId.id !== userId) {
      throw new BadRequestException('Not allowed');
    }

    connection.status =
      status === 'ACCEPTED'
        ? ConnectionStatus.ACCEPTED
        : ConnectionStatus.REJECTED;

    return await this.connectionRepo.save(connection);
  }
}