import { firestore as FIRESTORE } from 'firebase';
import { firestore } from '../firebase';

export interface Message {
	text: string;
	userId: string;
	photoURL: string | null;
	displayName?: string | null;
	createdAt: FIRESTORE.Timestamp;
	messageImageUrl?: string;
}

const MAX_MESSAGES = 25;
const messagesRef = firestore.collection('messages');
const messagesQuery = messagesRef
	.orderBy('createdAt')
	.limitToLast(MAX_MESSAGES);

const addMessage = (
	messageData: Partial<Message>
): Promise<FIRESTORE.DocumentReference<FIRESTORE.DocumentData>> =>
	messagesRef.add({
		...messageData,
		createdAt: FIRESTORE.FieldValue.serverTimestamp(),
	});

export { messagesQuery, addMessage };
