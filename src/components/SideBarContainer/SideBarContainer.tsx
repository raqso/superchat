import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSidebar } from './useSidebar';
import { SideBar } from './SideBar/Sidebar';

export const SideBarContainer = () => {
	const { toggleSidebar, isSidebarOpened } = useSidebar();

	return (
		<div className="flex">
			<button onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faBars} size="2x" color="#2d3748" />
			</button>
			<SideBar opened={isSidebarOpened} onOutsideClick={toggleSidebar} />
		</div>
	);
};
