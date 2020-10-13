import React from 'react';
import { useQuery } from 'react-query';
import { config } from '../../config';
import { Tab } from '../Tabs/Tab';
import { Tabs } from '../Tabs/Tabs';
import { Category } from './types/Category';

type Props = {
	onEmojiSelected(emoji: string): void;
};

export const EmojiSelector = ({ onEmojiSelected }: Props) => {
	const { isLoading, error, data } = useQuery(
		'categoriesData',
		async (): Promise<Category[]> => {
			const response = await fetch(
				`${config.emojiApiUrl}/categories?access_key=${config.emojiApiKey}`
			);
			return response.json();
		}
	);

	if (isLoading) return <>Loading...</>;

	if (error) return <>An error has occurred: {console.error(error)}</>;

	return (
		<div className="flex p-4">
			{data && (
				<Tabs>
					{data.map(({ slug, subCategories }) => (
						<Tab key={slug} label={slug}>
							{subCategories.join(', ')}
						</Tab>
					))}
				</Tabs>
			)}
		</div>
	);
};
