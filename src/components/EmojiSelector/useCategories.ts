import { useQuery } from 'react-query';

import { config } from '../../config';
import { Category } from './types/Category';

export const useCategories = () => {
	const queryKey = 'categoriesData';
	const { isLoading, error, data: categories } = useQuery(
		queryKey,
		getCategories
	);

	return { isLoading, error, categories };
};

async function getCategories(): Promise<Category[]> {
	const response = await fetch(
		`${config.emojiApiUrl}/categories?access_key=${config.emojiApiKey}`
	);

	return response.json();
}
