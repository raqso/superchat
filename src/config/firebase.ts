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

export { auth, firestore, storage, TIMESTAMP };
