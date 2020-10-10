import React from 'react';

import { ChatRoom } from '../../components/ChatRoom/ChatRoom';
import { Header } from '../../components/Header/Header';

export const Main = () => (
	<div className="h-screen flex flex-col">
		<Header />
		<ChatRoom />
	</div>
);
