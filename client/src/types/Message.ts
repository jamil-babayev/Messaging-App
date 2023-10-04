import Profile from './Profile';

export interface Message {
  senderId: string;
  receiverId: string;
  sendedAt: Date;
  directId?: string;
  content: string;
}

export interface Direct {
  members: Profile[];
  messages: Message[];
}
