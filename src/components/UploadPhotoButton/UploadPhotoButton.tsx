import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faWindowClose } from '@fortawesome/free-solid-svg-icons';

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
		},
		[onFileChange]
	);

	const removeImage = useCallback(() => {
		setMessageImageFile(undefined);
	}, []);

	useEffect(() => {
		if (!messageImageFile) {
			return setMessageImageUrl('');
		}

		const previewUrl = window.URL.createObjectURL(messageImageFile);
		setMessageImageUrl(previewUrl);
	}, [messageImageFile]);

	return (
		<div className={`${styles.uploadWrapper} flex hover:opacity-75 pa-2`}>
			{!messageImageFile && (
				<button className="mr-4">
					<FontAwesomeIcon icon={faCamera} size="2x" color="#2d3748" />
				</button>
			)}
			{messageImageUrl && (
				<>
					<button
						onClick={removeImage}
						className={`${styles.closeButton} hover:opacity-75`}
					>
						<FontAwesomeIcon icon={faWindowClose} size="1x" color="red" />
					</button>
					<div>
						<img
							src={messageImageUrl}
							alt="element to upload"
							className={`${styles.image} mr-2`}
						/>
					</div>
				</>
			)}
			<input type="file" onChange={handleChange} disabled={!!messageImageUrl} />
		</div>
	);
};
