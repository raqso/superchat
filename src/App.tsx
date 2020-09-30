import React, { useCallback } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ChatRoom } from './components/ChatRoom/ChatRoom';

import { auth } from './config/firebase';
import { create } from './models/Room';
import { SignInOut } from './components/SignInOut/SignInOut';
import { Logo } from './components/Logo/Logo';
import { LoginInfo } from './components/LoginInfo/LoginInfo';
import { SideBarContainer } from './components/SideBarContainer/SideBarContainer';

const App = () => {
	const [user] = useAuthState(auth);

	const createRoom = useCallback(async () => {
		const { id } = await create({
			public: false,
			adminUid: user?.uid,
		});

		goToRoom(id);
	}, [user]);

	return (
		<div className="h-screen flex flex-col">
			<header className="bg-gray-900 p-4 flex justify-between">
				<SideBarContainer />
				<Logo />
				<button onClick={createRoom}>Create Room</button>
				<SignInOut />
			</header>
			{user ? <ChatRoom /> : <LoginInfo />}
		</div>
	);
};

export default App;

function goToRoom(id: string) {
	window.location.href = `/${id}`;
}
