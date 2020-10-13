import React from 'react';
import { useQuery } from 'react-query';
import { config } from '../../config';
import { Emoji } from './types/Emoji';

type Props = {
	onEmojiSelected(emoji: string): void;
};

export const EmojiSelector = ({ onEmojiSelected }: Props) => {
	const { isLoading, error, data } = useQuery('emojisData', async () => {
		const response = await fetch(
			`${config.emojiApiUrl}/emojis?access_key=${config.emojiApiKey}&search=computer`
		);
		return response.json();
	});

	if (isLoading) return <>Loading...</>;

	if (error) return <>An error has occurred: {console.error(error)}</>;

	return (
		<div className="flex p-4">
			{data.map(({ slug, character }: Emoji) => (
				<button key={slug} onClick={() => onEmojiSelected(character)}>
					{character}
				</button>
			))}
		</div>
	);
};
