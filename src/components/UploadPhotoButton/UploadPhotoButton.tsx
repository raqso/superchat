import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import styles from './UploadPhotoButton.module.css';

type Props = {
	file?: File;
	onFileChange(file: File): void;
};

export const UploadPhotoButton = ({ file, onFileChange }: Props) => {
	const [messageImageFile, setMessageImageFile] = useState(file);
	const [messageImageUrl, setMessageImageUrl] = useState('');

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target?.files?.length) {
				return;
			}

			const newFile = event.target.files[0];
			setMessageImageFile(newFile);
			onFileChange(newFile);

			const previewUrl = window.URL.createObjectURL(event.target.files[0]);
			setMessageImageUrl(previewUrl);
		},
		[onFileChange]
	);

	return (
		<div className={`${styles.uploadWrapper} flex hover:opacity-75`}>
			{!messageImageFile && (
				<button className="mr-4">
					<FontAwesomeIcon icon={faCamera} size="2x" color="#2d3748" />
				</button>
			)}
			{messageImageUrl && (
				<img
					src={messageImageUrl}
					alt="element to upload"
					className={`${styles.image} mr-2`}
				/>
			)}
			<input type="file" onChange={handleChange} />
		</div>
	);
};
