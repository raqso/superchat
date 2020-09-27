import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
	apiKey: 'AIzaSyBjqheQ1rSRmB73676O_IaYVA-xKF80zvk',
	authDomain: 'super-chat-796f1.firebaseapp.com',
	databaseURL: 'https://super-chat-796f1.firebaseio.com',
	projectId: 'super-chat-796f1',
	storageBucket: 'super-chat-796f1.appspot.com',
	messagingSenderId: '724318582311',
	appId: '1:724318582311:web:52cc72cb477089ac874002',
	measurementId: 'G-8KDB34TTWB',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
