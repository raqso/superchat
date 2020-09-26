import * as admin from 'firebase-admin';

if (!process.env.FIREBASE_CONFIG) {
	throw Error('No firebase config!');
}

const FieldValue = admin.firestore.FieldValue;

const getTimestamp = FieldValue.serverTimestamp;
const environmentAdminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

environmentAdminConfig.credential = admin.credential.applicationDefault();
admin.initializeApp(environmentAdminConfig);

const db = admin.firestore();
const rtDb = admin.database();
const storage = admin.storage().bucket();

export { admin, db, rtDb, storage, getTimestamp };
