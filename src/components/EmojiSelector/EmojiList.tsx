import React from 'react';
import { useQuery } from 'react-query';

import { config } from '../../config';
import { Emoji } from './types/Emoji';

type Props = {
	category: string;
	onEmojiSelected: (emoji: string) => void;
};

export const EmojiList = ({ category, onEmojiSelected }: Props) => {
	const { isLoading, error, data: emojisData } = useQuery(
		`categoryData${category}`,
		async (): Promise<Emoji[]> => {
			const response = await fetch(
				`${config.emojiApiUrl}/categories/${category}?access_key=${config.emojiApiKey}`
			);
			return response.json();
		}
	);

	if (isLoading) return <>Loading...</>;

	if (error) return <>An error has occurred: {console.error(error)}</>;

	return (
		<div className="flex flex-wrap">
			{emojisData &&
				emojisData.map(({ character, slug }) => (
					<button onClick={() => onEmojiSelected(character)} key={slug}>
						{character}
					</button>
				))}
		</div>
	);
};
