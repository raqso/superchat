import React from 'react';

import { useCategories } from './useCategories';
import { Tab } from '../Tabs/Tab';
import { Tabs } from '../Tabs/Tabs';
import { EmojiList } from './EmojiList/EmojiList';

import styles from './EmojiSelector.module.css';

type Props = {
	onEmojiSelected(emoji: string): void;
};

export const EmojiSelector = ({ onEmojiSelected }: Props) => {
	const { isLoading, error, categories } = useCategories();

	if (isLoading) return <>Loading...</>;
	if (error) return <>An error has occurred: {console.error(error)}</>;

	return (
		<div className="flex p-4">
			{categories && (
				<Tabs className={styles.content}>
					{categories.map(({ slug }) => (
						<Tab key={slug} label={slug} className="px-4 py-2">
							<EmojiList category={slug} onEmojiSelected={onEmojiSelected} />
						</Tab>
					))}
				</Tabs>
			)}
		</div>
	);
};
