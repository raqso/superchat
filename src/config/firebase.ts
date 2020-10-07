import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

import { config } from './index';

firebase.initializeApp(config.firebase);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp();

if (config.firebaseDbHost && config.firebaseDbHost.includes('localhost')) {
	firestore.settings({
		host: config.firebaseDbHost,
		ssl: false,
		experimentalForceLongPolling: true, //this enables cypress to intercept multiple replies from firebase's webchannel protocol.
	});
}

export { auth, firestore, storage, TIMESTAMP };
