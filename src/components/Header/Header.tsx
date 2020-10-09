import React from 'react';

import { Logo } from '../Logo/Logo';
import { SideBarContainer } from '../SideBarContainer/SideBarContainer';

export const Header = () => (
	<header className="sm:py-2 py-0 sm:px-6 px-2 flex justify-between">
		<Logo />
		<SideBarContainer />
	</header>
);
