import React, { useEffect, useState } from 'react';

import styles from './LazyImage.module.css';

const placeHolder =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

type Props = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export const LazyImage = ({ src, className = '', ...rest }: Props) => {
	const [imageSrc, setImageSrc] = useState(placeHolder);
	const [imageRef, setImageRef] = useState<HTMLImageElement | null>();

	const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.classList.add(styles.loaded);
	};

	const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.classList.add(styles.hasError);
	};

	useEffect(() => {
		let didCancel = false;

		if (!imageRef || imageSrc !== placeHolder || !src) {
			return;
		}

		if (!IntersectionObserver) {
			setImageSrc(src);
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// when image is visible in the viewport + rootMargin
					if (
						!didCancel &&
						(entry.intersectionRatio > 0 || entry.isIntersecting)
					) {
						setImageSrc(src);
					}
				});
			},
			{
				threshold: 0.01,
				rootMargin: '75%',
			}
		);
		observer.observe(imageRef);

		return () => {
			didCancel = true;

			if (observer && observer.unobserve) {
				observer.unobserve(imageRef);
			}
		};
	}, [src, imageSrc, imageRef]);

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<img
			{...rest}
			ref={setImageRef}
			src={imageSrc}
			className={`${className} ${styles.image}`}
			onLoad={onLoad}
			onError={onError}
		/>
	);
};
