import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, ConnectionStatus } from '../../../domain/entities/connection.entity';
import { Repository, IsNull } from 'typeorm';

@Injectable()
export class FetchConnectionRequestService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepo: Repository<Connection>,
  ) {}

  async fetchPendingRequests(userId: string) {
    console.log("user id is ",userId)
    return await this.connectionRepo.find({
      where: {
        receiverId: { id: userId },
        status: ConnectionStatus.PENDING,
        deletedAt: IsNull(),
      },
      relations: ['senderId'],
    });
  }
}