import { useCallback, useState } from 'react';

export const useChatroom = () => {
	const [gifSelectorOpened, setGifSelectorOpened] = useState(false);
	const [isEmojiSelecting, setEmojiSelecting] = useState(false);

	const toggleGifSelector = useCallback(
		getToggleBooleanState(setGifSelectorOpened),
		[]
	);

	const toggleEmojiSelector = useCallback(
		getToggleBooleanState(setEmojiSelecting),
		[]
	);

	return {
		gifSelectorOpened,
		toggleGifSelector,
		isEmojiSelecting,
		toggleEmojiSelector,
	};
};

function getToggleBooleanState(
	setStateFn: React.Dispatch<React.SetStateAction<boolean>>
) {
	return () => setStateFn((previousValue) => !previousValue);
}
