import * as functions from 'firebase-functions';
const Filter = require('bad-words');

import { db, getTimestamp } from '../../config/firebase';

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

		return db.collection('bans').doc(userId).set({ bannedAt: getTimestamp() });
	});

export { onCreate };
