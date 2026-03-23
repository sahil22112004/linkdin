import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Conversation } from '../../domain/enitites/conversation.entity';
import { ConversationParticipant } from '../../domain/enitites/conversationParticipant.entity';
import { Message, MessageType } from '../../domain/enitites/message.entity';
import { MessageRead } from '../../domain/enitites/messageRead.entity';
import { ConversationResponseDto } from '../../domain/dto/conversation-response.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,

    @InjectRepository(ConversationParticipant)
    private participantRepo: Repository<ConversationParticipant>,

    @InjectRepository(Message)
    private messageRepo: Repository<Message>,

    @InjectRepository(MessageRead)
    private messageReadRepo: Repository<MessageRead>,
  ) {}

  async createOrGetConversation(user1: string, user2: string): Promise<string> {
    const conversations = await this.participantRepo
      .createQueryBuilder('cp')
      .select('cp.conversationId')
      .where('cp.userId IN (:...users)', { users: [user1, user2] })
      .groupBy('cp.conversationId')
      .having('COUNT(cp.conversationId) = 2')
      .getRawMany();

    if (conversations.length > 0) {
      return conversations[0].conversationId;
    }

    const conversation = await this.conversationRepo.save({
      isGroup: false,
    });

    await this.participantRepo.save([
      { conversation, userId: user1 },
      { conversation, userId: user2 },
    ]);

    return conversation.id;
  }

  async getUserConversations(userId: string): Promise<ConversationResponseDto[]> {
    const participants = await this.participantRepo.find({
      where: { userId },
      relations: ['conversation'],
    });

    const conversationIds = participants.map(p => p.conversation.id);

    const conversations = await this.conversationRepo.find({
      where: { id: In(conversationIds) },
      relations: ['participants'],
    });

    const result: ConversationResponseDto[] = [];

    for (const conv of conversations) {
      const lastMessage = await this.messageRepo.findOne({
        where: { conversation: { id: conv.id } },
        order: { createdAt: 'DESC' },
      });

      const unreadCount = await this.messageRepo
        .createQueryBuilder('m')
        .leftJoin(
          MessageRead,
          'mr',
          'mr.messageId = m.id AND mr.userId = :userId',
          { userId }
        )
        .where('m.conversationId = :convId', { convId: conv.id })
        .andWhere('m.senderId != :userId', { userId })
        .andWhere('mr.id IS NULL')
        .getCount();

      result.push({
        conversationId: conv.id,
        participants: conv.participants,
        lastMessage,
        unreadCount,
      });
    }

    return result;
  }

  async getMessages(
    conversationId: string,
    page = 1,
    limit = 20
  ): Promise<Message[]> {
    return this.messageRepo.find({
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType = MessageType.TEXT
  ): Promise<Message> {
    return this.messageRepo.save({
      conversation: { id: conversationId },
      senderId,
      content,
      type,
    });
  }

  async markAsRead(
    conversationId: string,
    userId: string
  ): Promise<boolean> {
    const messages = await this.messageRepo.find({
      where: { conversation: { id: conversationId } },
    });

    const unread: { message: { id: string }; userId: string }[] = [];

    for (const msg of messages) {
      if (msg.senderId === userId) continue;

      const exists = await this.messageReadRepo.findOne({
        where: {
          message: { id: msg.id },
          userId,
        },
      });

      if (!exists) {
        unread.push({
          message: { id: msg.id },
          userId,
        });
      }
    }

    if (unread.length > 0) {
      await this.messageReadRepo.save(unread);
    }

    return true;
  }
}