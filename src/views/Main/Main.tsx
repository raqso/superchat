import React from 'react';

import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { Logo } from '../../components/Logo/Logo';
import { SideBarContainer } from '../../components/SideBarContainer/SideBarContainer';

export const Main = () => (
	<div className="h-screen flex flex-col">
		<header className="py-2 px-6 flex justify-between">
			<Logo />
			<SideBarContainer />
		</header>
		<ChatRoom />
	</div>
);
