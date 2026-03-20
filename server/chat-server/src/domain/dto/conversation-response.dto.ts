import { ConversationParticipant } from '../enitites/conversationParticipant.entity';
import { Message } from '../enitites/message.entity';

export class ConversationResponseDto {
  conversationId: string;
  participants: ConversationParticipant[];
  lastMessage: Message | null;
  unreadCount: number;
}