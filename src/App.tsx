import React from "react";
import "./App.css";

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoom } from "./components/ChatRoom/ChatRoom";

import { auth } from "./firebase";
import { SignInOut } from "./components/SignInOut/SignInOut";

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header className="my-4">
				<SignInOut />
			</header>

			<section>{user && <ChatRoom />}</section>
		</div>
	);
}

export default App;
