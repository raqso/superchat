import { firestore as FIRESTORE } from 'firebase/app';
import { firestore } from '../config/firebase';

export interface Message {
	text: string;
	userId: string;
	photoURL: string | null;
	displayName?: string | null;
	createdAt: FIRESTORE.Timestamp;
	messageImageUrl?: string;
	roomId?: string;
}

const MAX_MESSAGES = 25;
const messagesRef = firestore.collection('messages');
const publicMessagesQuery = messagesRef
	.orderBy('public')
	.where('public', '!=', false)
	.orderBy('createdAt')
	.limitToLast(MAX_MESSAGES);

const addMessage = (
	messageData: Partial<Message>
): Promise<FIRESTORE.DocumentReference<FIRESTORE.DocumentData>> =>
	messagesRef.add({
		...messageData,
		createdAt: FIRESTORE.FieldValue.serverTimestamp(),
	});

const getMessagesQueryForRoom = (roomId: string) =>
	messagesRef
		.where('roomId', '==', roomId)
		.orderBy('createdAt')
		.limitToLast(MAX_MESSAGES);

export { publicMessagesQuery, getMessagesQueryForRoom, addMessage };
