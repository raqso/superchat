import { useCallback, useState } from 'react';

export const useSidebar = () => {
	const [isSidebarOpened, setIsSidebarOpened] = useState(false);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpened((isOpened) => !isOpened);
	}, []);

	return { isSidebarOpened, toggleSidebar };
};
