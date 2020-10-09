import React from 'react';

import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { Logo } from '../../components/Logo/Logo';
import { SideBarContainer } from '../../components/SideBarContainer/SideBarContainer';

export const Main = () => (
	<div className="h-screen flex flex-col">
		<header className="p-4 flex justify-start">
			<SideBarContainer />
			<Logo className="ml-4" />
		</header>
		<ChatRoom />
	</div>
);
