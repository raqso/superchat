import { useCallback, useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';

import { config } from '../../config';

const MAX_GIFS = 3;

const giphyFetch = new GiphyFetch(config.giphyApiKey);

export const useGifSelector = () => {
	const [searchText, setSearchText] = useState('dogs');

	const handleSearchTextChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchText(event.target.value || '');
	};

	const fetchGifs = useCallback(
		(offset: number) =>
			giphyFetch.search(searchText, { offset, limit: MAX_GIFS }),
		[searchText]
	);

	return { searchText, handleSearchTextChange, fetchGifs };
};
