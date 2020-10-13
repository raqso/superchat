import React from 'react';

import { useEmojis } from '../useEmojis';

type Props = {
	category: string;
	onEmojiSelected: (emoji: string) => void;
};

export const EmojiList = ({ category, onEmojiSelected }: Props) => {
	const { isLoading, error, emojis } = useEmojis(category);

	if (isLoading) return <>Loading...</>;
	if (error) return <>An error has occurred: {console.error(error)}</>;

	return (
		<div className="flex flex-wrap justify-center">
			{emojis &&
				emojis.map(({ character, slug }) => (
					<button
						className="p-4 md:p-2 text-xl md:text-base"
						onClick={() => onEmojiSelected(character)}
						key={slug}
					>
						{character}
					</button>
				))}
		</div>
	);
};
