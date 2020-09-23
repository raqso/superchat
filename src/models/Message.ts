import { firestore } from "firebase";
export interface Message {
	text: string;
	createdAt: firestore.Timestamp;
}
