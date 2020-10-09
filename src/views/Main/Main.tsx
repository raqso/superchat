import React from 'react';

import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { Logo } from '../../components/Logo/Logo';
import { SideBarContainer } from '../../components/SideBarContainer/SideBarContainer';

export const Main = () => (
	<div className="h-screen flex flex-col">
		<header className="sm:py-2 py-0 sm:px-6 px-2 flex justify-between">
			<Logo />
			<SideBarContainer />
		</header>
		<ChatRoom />
	</div>
);
