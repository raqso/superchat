import React from 'react';

import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { SignOut } from '../../components/SignInOut/SignInOut';
import { Logo } from '../../components/Logo/Logo';
import { SideBarContainer } from '../../components/SideBarContainer/SideBarContainer';

export const Main = () => (
	<div className="h-screen flex flex-col">
		<header className="p-4 flex justify-between">
			<SideBarContainer />
			<Logo />
			<SignOut />
		</header>
		<ChatRoom />
	</div>
);
