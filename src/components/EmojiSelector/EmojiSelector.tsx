import React from 'react';
import { useQuery } from 'react-query';

import { config } from '../../config';
import { Tab } from '../Tabs/Tab';
import { Tabs } from '../Tabs/Tabs';
import { EmojiList } from './EmojiList';
import { Category } from './types/Category';

import styles from './EmojiSelector.module.css';

type Props = {
	onEmojiSelected(emoji: string): void;
};

export const EmojiSelector = ({ onEmojiSelected }: Props) => {
	const { isLoading, error, data: categoriesData } = useQuery(
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
			{categoriesData && (
				<Tabs className={styles.content}>
					{categoriesData.map(({ slug }) => (
						<Tab key={slug} label={slug} className="px-4 py-2">
							<EmojiList category={slug} onEmojiSelected={onEmojiSelected} />
						</Tab>
					))}
				</Tabs>
			)}
		</div>
	);
};
