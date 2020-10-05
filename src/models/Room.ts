import { firestore, TIMESTAMP } from '../config/firebase';

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

const isExists = async (roomId: string): Promise<boolean> => {
	const roomSnap = await firestore.doc(`rooms/${roomId}`).get();

	return roomSnap.exists;
};

export { create, isExists };
