import * as functions from 'firebase-functions';
const Filter = require('bad-words');

import { db, TIMESTAMP } from '../../config/firebase';

const filter = new Filter();

const onCreate = functions.firestore
	.document('messages/{id}')
	.onCreate(async (snap, context) => {
		const addedMessageData = snap.data();
		const { text } = addedMessageData;

		if (!filter.isProfane(text)) {
			return;
		}

		const adjustedText = `I have been banned for saying: ${filter.clean(text)}`;

		await db
			.collection('messages')
			.doc(context.params.id)
			.update({ text: adjustedText });

		if (!context.auth?.uid) {
			return;
		}
		return db
			.collection('bannedUsers')
			.doc(context.auth?.uid)
			.set({ bannedAt: TIMESTAMP });
	});

export { onCreate };
