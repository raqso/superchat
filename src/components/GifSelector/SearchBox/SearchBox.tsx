import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchBoxProps = {
	searchText?: string;
	handleSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBox = ({
	searchText,
	handleSearchTextChange,
}: SearchBoxProps) => (
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
