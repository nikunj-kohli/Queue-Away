import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  updateDoc,
  setDoc,
  increment,
  doc,
  or,
  and
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

interface SendMessageData {
  senderId: string;
  senderName: string;
  receiverId: string;
  message: string;
  type: 'text' | 'image' | 'file';
}

export class ChatService {
  private messagesCollection = collection(db, 'messages');
  private chatsCollection = collection(db, 'chats');

  async sendMessage(messageData: SendMessageData): Promise<string> {
    try {
      // Create chat room ID
      const chatRoomId = [messageData.senderId, messageData.receiverId].sort().join('_');
      
      // Create the message
      const docRef = await addDoc(this.messagesCollection, {
        ...messageData,
        chatRoomId,
        timestamp: serverTimestamp(),
        read: false,
      });

      // Update or create chat document
      await this.updateChatDocument(messageData);

      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      throw error;
    }
  }

  private async updateChatDocument(messageData: SendMessageData) {
    const chatId = this.generateChatId(messageData.senderId, messageData.receiverId);
    
    try {
      const chatRef = doc(this.chatsCollection, chatId);
      await updateDoc(chatRef, {
        participants: [messageData.senderId, messageData.receiverId],
        lastMessage: messageData.message,
        lastMessageTime: serverTimestamp(),
        lastSenderId: messageData.senderId,
        [`unreadCount_${messageData.receiverId}`]: increment(1), // Increment unread for receiver
      });
    } catch (error) {
      // If chat doesn't exist, create it with the correct ID
      const chatRef = doc(this.chatsCollection, chatId);
      await setDoc(chatRef, {
        participants: [messageData.senderId, messageData.receiverId],
        lastMessage: messageData.message,
        lastMessageTime: serverTimestamp(),
        lastSenderId: messageData.senderId,
        [`unreadCount_${messageData.receiverId}`]: 1,
        [`unreadCount_${messageData.senderId}`]: 0,
      });
    }
  }

  private generateChatId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_');
  }

  subscribeToMessages(userId: string, businessId: string, callback: (messages: any[]) => void) {
    // Create a chat room ID to simplify the query
    const chatRoomId = [userId, businessId].sort().join('_');
    
    const q = query(
      this.messagesCollection,
      where('chatRoomId', '==', chatRoomId),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages: any[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      callback(messages);
    });
  }

  subscribeToUserChats(userId: string, callback: (chats: any[]) => void) {
    const q = query(
      this.chatsCollection,
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const chats: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const otherParticipant = data.participants.find((p: string) => p !== userId);
        
        chats.push({
          id: doc.id,
          businessId: otherParticipant,
          businessName: `Business ${otherParticipant.slice(0, 8)}`, // In real app, fetch business name
          lastMessage: data.lastMessage,
          lastMessageTime: data.lastMessageTime,
          unreadCount: data[`unreadCount_${userId}`] || 0,
        });
      });
      callback(chats);
    });
  }

  async markMessagesAsRead(userId: string, businessId: string) {
    const chatId = this.generateChatId(userId, businessId);
    const chatRef = doc(this.chatsCollection, chatId);
    
    try {
      await updateDoc(chatRef, {
        [`unreadCount_${userId}`]: 0,
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }
}

export const chatService = new ChatService();