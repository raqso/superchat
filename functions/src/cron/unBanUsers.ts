import * as functions from 'firebase-functions';
import { db } from '../config/firebase';

const LAUNCH_INTERVAL_IN_MINUTES = 5;
const BAN_TIME_IN_MINUTES = 30;

const unbanUsers = functions.pubsub
	.schedule(`every ${LAUNCH_INTERVAL_IN_MINUTES} minutes`)
	.onRun(async () => {
		const usersToUnban = await getUsersToUnban();

		if (!usersToUnban?.docs.length) {
			return console.log('No users to unban');
		}

		return unban(usersToUnban);
	});

function getUsersToUnban() {
	const banTimeInMs = BAN_TIME_IN_MINUTES * 60 * 1000;
	const unbanBeforeDate = new Date(Date.now() - banTimeInMs);

	return db.collection('bans').where('bannedAt', '<=', unbanBeforeDate).get();
}

async function unban(
	users: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) {
	await Promise.all(
		users.docs.map((bannedUser) =>
			db.collection('bans').doc(bannedUser.id).delete()
		)
	);

	return console.log(`Unbanned users: ${users.docs.map((user) => user.id)}`);
}

export { unbanUsers };
