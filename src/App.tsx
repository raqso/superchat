import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { SignIn } from './components/SignIn/SignIn';

firebase.initializeApp({
	apiKey: "AIzaSyBjqheQ1rSRmB73676O_IaYVA-xKF80zvk",
	authDomain: "super-chat-796f1.firebaseapp.com",
	databaseURL: "https://super-chat-796f1.firebaseio.com",
	projectId: "super-chat-796f1",
	storageBucket: "super-chat-796f1.appspot.com",
	messagingSenderId: "724318582311",
	appId: "1:724318582311:web:52cc72cb477089ac874002",
	measurementId: "G-8KDB34TTWB",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
		<div className="App">
			<header className="App-header"></header>

			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
  );
}

export default App;
