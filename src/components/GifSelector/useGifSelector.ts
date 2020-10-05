import { useCallback, useEffect, useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { debounce } from 'debounce';

import { config } from '../../config';

const DEFAULT_GIFS_SEARCH = 'funny';
const MAX_GIFS = 8;
const SEARCH_DELAY_IN_MS = 75;

const giphyFetch = new GiphyFetch(config.giphyApiKey);

export const useGifSelector = () => {
	const [searchText, setSearchText] = useState('');
	const [carouselKey, setCarouselKey] = useState(1);

	const handleSearchTextChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchText(event.target.value || '');
	};

	const fetchGifs = useCallback(
		(offset: number) =>
			giphyFetch.search(searchText || DEFAULT_GIFS_SEARCH, {
				offset,
				limit: MAX_GIFS,
			}),
		[searchText]
	);

	useEffect(
		debounce(() => {
			let isUnmounted = false;
			if (isUnmounted) {
				return;
			}

			setCarouselKey((currentKey) => currentKey + 1);

			return () => {
				isUnmounted = true;
			};
		}, SEARCH_DELAY_IN_MS),
		[searchText]
	);

	return { searchText, handleSearchTextChange, fetchGifs, carouselKey };
};
