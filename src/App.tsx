import React from "react";

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoom } from "./components/ChatRoom/ChatRoom";

import { auth } from "./firebase";
import { SignInOut } from "./components/SignInOut/SignInOut";
import { Logo } from "./components/Logo/Logo";

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header className="bg-gray-900 p-4 flex justify-between">
				<Logo />
				<SignInOut />
			</header>

			{user && <ChatRoom />}
		</div>
	);
}

export default App;
