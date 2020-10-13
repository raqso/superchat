import { useQuery } from 'react-query';

import { config } from '../../config';
import { Emoji } from './types/Emoji';

export const useEmojis = (category: string) => {
	const queryKey = `categoryData${category}`;
	const getEmojis = async (): Promise<Emoji[]> => {
		const response = await fetch(
			`${config.emojiApiUrl}/categories/${category}?access_key=${config.emojiApiKey}`
		);

		return response.json();
	};
	const { isLoading, error, data: emojis } = useQuery(queryKey, getEmojis);

	return { isLoading, error, emojis };
};
