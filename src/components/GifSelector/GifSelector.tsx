import React, { SyntheticEvent } from 'react';
import { Carousel } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

import { useGifSelector } from './useGifSelector';
import { SearchBox } from './SearchBox/SearchBox';

type Props = {
	search?: string;
	onGifClick?:
		| ((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void)
		| undefined;
};

export function GifSelector({ onGifClick }: Props) {
	const { searchText, handleSearchTextChange, fetchGifs } = useGifSelector();

	return (
		<div className="w-full flex flex-col bg-gray-800">
			<SearchBox
				searchText={searchText}
				handleSearchTextChange={handleSearchTextChange}
			/>
			<Carousel
				fetchGifs={fetchGifs}
				gifHeight={75}
				onGifClick={onGifClick}
				backgroundColor="#4a5568"
				className="p-2"
				noLink
			/>
		</div>
	);
}