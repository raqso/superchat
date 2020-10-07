import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../config/firebase';
import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { SignInOut } from '../../components/SignInOut/SignInOut';
import { Logo } from '../../components/Logo/Logo';
import { LoginInfo } from '../../components/LoginInfo/LoginInfo';
import { SideBarContainer } from '../../components/SideBarContainer/SideBarContainer';

export const Main = () => {
	const [user] = useAuthState(auth);

	return (
		<div className="h-screen flex flex-col">
			<header className="bg-gray-900 p-4 flex justify-between">
				<SideBarContainer />
				<Logo />
				<SignInOut />
			</header>
			{user ? <ChatRoom /> : <LoginInfo />}
		</div>
	);
};
