import * as functions from 'firebase-functions';
const Filter = require('bad-words');

import { db, getTimestamp, admin } from '../../config/firebase';

const filter = new Filter();

const onCreate = functions.firestore
	.document('messages/{id}')
	.onCreate(async (snap, context) => {
		const addedMessageData = snap.data();
		const { text, userId } = addedMessageData;

		if (!filter.isProfane(text)) {
			return;
		}

		const adjustedText = `I have been banned for saying: ${filter.clean(text)}`;

		await db
			.collection('messages')
			.doc(context.params.id)
			.update({ text: adjustedText });

		return banUser(userId);
	});

export { onCreate };

async function banUser(userId: string) {
	const { email, uid, displayName } = await admin.auth().getUser(userId);

	return db
		.collection('bans')
		.doc(userId)
		.set({ bannedAt: getTimestamp(), email, userId: uid, name: displayName });
}
