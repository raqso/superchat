import React, { useCallback, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ChatRoom } from './components/ChatRoom/ChatRoom';

import { auth } from './config/firebase';
import { SignInOut } from './components/SignInOut/SignInOut';
import { Logo } from './components/Logo/Logo';
import { LoginInfo } from './components/LoginInfo/LoginInfo';
import { SideBar } from './components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const [user] = useAuthState(auth);
	const [isSidebarOpened, setIsSidebarOpened] = useState(false);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpened((isOpened) => !isOpened);
	}, []);

	return (
		<div className="h-screen flex flex-col">
			<SideBar opened={isSidebarOpened} onOutsideClick={toggleSidebar} />
			<header className="bg-gray-900 p-4 flex justify-between">
				<button onClick={toggleSidebar}>
					<FontAwesomeIcon icon={faBars} size="2x" color="#2d3748" />
				</button>
				<Logo />
				<SignInOut />
			</header>
			{user ? <ChatRoom /> : <LoginInfo />}
		</div>
	);
};

export default App;
