import React from "react";

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoom } from "./components/ChatRoom/ChatRoom";

import { auth } from "./firebase";
import { SignInOut } from "./components/SignInOut/SignInOut";
import { Logo } from "./components/Logo/Logo";
import { LoginInfo } from "./components/LoginInfo/LoginInfo";

function App() {
	const [user] = useAuthState(auth);

	return (
		<div>
			<header className="bg-gray-900 p-4 flex justify-between">
				<Logo />
				<SignInOut />
			</header>
			{user ? <ChatRoom /> : <LoginInfo />}
		</div>
	);
}

export default App;
