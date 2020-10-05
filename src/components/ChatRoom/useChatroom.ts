import { useCallback, useState } from 'react';

export const useChatroom = () => {
	const [gifSelectorOpened, setGifSelectorOpened] = useState(false);

	const toggleGifSelector = useCallback(() => {
		setGifSelectorOpened((isOpened) => !isOpened);
	}, []);

	return { gifSelectorOpened, toggleGifSelector };
};
