import React from 'react';
import './App.css';

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { SignIn } from './components/SignIn/SignIn';
import { auth } from './firebase';

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
