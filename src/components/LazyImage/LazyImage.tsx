import React, { useEffect, useState } from 'react';

const placeHolder =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

type Props = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export const LazyImage = ({ src, ...rest }: Props) => {
	const [imageSrc, setImageSrc] = useState(placeHolder);
	const [imageRef, setImageRef] = useState<HTMLImageElement | null>();

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
	});

	// eslint-disable-next-line jsx-a11y/alt-text
	return <img {...rest} ref={setImageRef} src={imageSrc} />;
};
