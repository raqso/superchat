import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import styles from './UploadPhotoButton.module.css';

type Props = {
	file?: File;
	onFileChange(file: File): void;
	onRemoveImage(): void;
};

export const UploadPhotoButton = ({
	file,
	onFileChange,
	onRemoveImage,
}: Props) => {
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target?.files?.length) {
				return;
			}

			const newFile = event.target.files[0];
			onFileChange(newFile);
		},
		[onFileChange]
	);

	return (
		<div className={`${styles.uploadWrapper} flex hover:opacity-75 pa-2`}>
			{!file && (
				<button className="mr-4">
					<FontAwesomeIcon icon={faCamera} size="2x" color="#2d3748" />
				</button>
			)}
			{file && (
				<>
					<button
						onClick={onRemoveImage}
						className={`${styles.closeButton} hover:opacity-75`}
					>
						<FontAwesomeIcon icon={faWindowClose} size="1x" color="red" />
					</button>
					<div>
						<img
							src={getPreviewUrl(file)}
							alt="element to upload"
							className={`${styles.image} mr-2`}
						/>
					</div>
				</>
			)}
			<input
				type="file"
				accept="image/*"
				onChange={handleChange}
				disabled={!!file}
			/>
		</div>
	);
};

function getPreviewUrl(file?: File) {
	if (!file) {
		return '';
	}

	return window.URL.createObjectURL(file);
}
