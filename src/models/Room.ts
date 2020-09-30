import { firestore, TIMESTAMP } from '../firebase';

interface Room {
	uid: string;
	adminUid: string;
	createdAt: firebase.firestore.Timestamp;
	public: boolean;
}

const create = (data: Partial<Room>) =>
	firestore.collection('rooms').add({
		...data,
		createdAt: TIMESTAMP,
	});

export { create };
