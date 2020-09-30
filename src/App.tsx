import React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ChatRoom } from './components/ChatRoom/ChatRoom';

import { auth } from './config/firebase';
import { SignInOut } from './components/SignInOut/SignInOut';
import { Logo } from './components/Logo/Logo';
import { LoginInfo } from './components/LoginInfo/LoginInfo';

const App = () => {
	const [user] = useAuthState(auth);

	return (
		<div className="h-screen flex flex-col">
			<header className="bg-gray-900 p-4 flex justify-between">
				<Logo />
				<SignInOut />
			</header>
			{user ? <ChatRoom /> : <LoginInfo />}
		</div>
	);
};

export default App;
