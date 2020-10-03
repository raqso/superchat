import React, { SyntheticEvent } from 'react';
import { Carousel } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

import { useGifSelector } from './useGifSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchBoxProps = {
	searchText?: string;
	handleSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ searchText, handleSearchTextChange }: SearchBoxProps) => (
	<div className="w-full relative text-gray-600">
		<input
			className="w-full border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none my-2"
			type="search"
			name="search"
			placeholder="Search"
			value={searchText}
			onChange={handleSearchTextChange}
		/>
		<FontAwesomeIcon
			icon={faSearch}
			className="absolute right-0 top-0 mt-6 mr-4"
		/>
	</div>
);

type Props = {
	search?: string;
	onGifClick?:
		| ((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void)
		| undefined;
};

export function GifSelector({ onGifClick }: Props) {
	const { searchText, handleSearchTextChange, fetchGifs } = useGifSelector();

	return (
		<div className="w-full flex flex-col">
			<SearchBox
				searchText={searchText}
				handleSearchTextChange={handleSearchTextChange}
			/>
			<Carousel
				fetchGifs={fetchGifs}
				gifHeight={200}
				gutter={6}
				onGifClick={onGifClick}
			/>
		</div>
	);
}
