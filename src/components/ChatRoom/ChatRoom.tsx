import React, { useCallback, useRef, useState, useEffect } from 'react';
import { auth, storage } from '../../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IGif } from '@giphy/js-types';

import { ChatMessage } from '../ChatMessage/ChatMessage';
import {
	addMessage,
	Message,
	publicMessagesQuery,
	getMessagesQueryForRoom,
} from '../../models/Message';

import styles from './ChatRoom.module.css';
import { UploadPhotoButton } from '../UploadPhotoButton/UploadPhotoButton';
import { GifSelector } from '../GifSelector/GifSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useChatroom } from './useChatroom';

export const ChatRoom = () => {
	const dummyRef = useRef<HTMLDivElement>(null);

	const { gifSelectorOpened, toggleGifSelector } = useChatroom();

	useEffect(() => {
		dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
	});

	const [, roomId] = window.location.pathname.split('/');

	const [messages, loading, error] = useCollectionData<
		Message & { id: string }
	>(roomId ? getMessagesQueryForRoom(roomId) : publicMessagesQuery, {
		idField: 'id',
	});

	const [file, setFile] = useState<File>();

	const [formValue, setFormValue] = useState('');
	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!auth.currentUser) {
			return;
		}

		const { uid: userId, photoURL, displayName } = auth.currentUser;

		const messagePhoto = file ? await uploadPhoto(file) : null;
		const messageDoc: Partial<Message> = {
			text: formValue,
			userId,
			photoURL,
			displayName,
		};
		if (messagePhoto) {
			messageDoc.messageImageUrl = messagePhoto;
		}
		if (roomId) {
			messageDoc.roomId = roomId;
		} else {
			messageDoc.public = true;
		}

		const isTextInvalid = formValue.replace(/  +/g, ' ');

		if (isTextInvalid === ' ') {
			return;
		}

		await addMessage(messageDoc);

		setFormValue('');
		setFile(undefined);
		dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleFormValueChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormValue(event.target.value);
	};

	const onRemoveImage = useCallback(() => setFile(undefined), []);

	const canSend = !!formValue || !!file;

	const sendGif = async (gif: IGif) => {
		try {
			if (!auth.currentUser) {
				return;
			}

			const { uid: userId, photoURL, displayName } = auth.currentUser;

			const messageDoc: Partial<Message> = {
				text: formValue,
				userId,
				photoURL,
				displayName,
				messageImageUrl: gif.images.downsized.url,
			};

			await addMessage(messageDoc);
			toggleGifSelector();
			dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<section
				className={`${styles.messagesContainer} bg-gray-800 py-2 px-1 sm:px-4`}
			>
				{loading && <h1>Loading</h1>}
				{error && console.error(error)}
				{!loading &&
					!error &&
					messages &&
					messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				<div ref={dummyRef}></div>
			</section>
			{gifSelectorOpened && <GifSelector onGifClick={sendGif} />}
			<div className="flex bg-gray-700 p-2 justify-between">
				<div className="p-1">
					<UploadPhotoButton
						file={file}
						onFileChange={setFile}
						onRemoveImage={onRemoveImage}
					/>
					<button onClick={toggleGifSelector}>
						<FontAwesomeIcon icon={faFilm} size="2x" color="#2d3748" />
					</button>
				</div>
				<form onSubmit={sendMessage} className="flex justify-between w-full">
					<input
						value={formValue}
						placeholder="Say something nice..."
						onChange={handleFormValueChange}
						className="w-full px-4 py-3 mr-2"
					/>
					<button
						type="submit"
						disabled={!canSend}
						className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
							canSend ? 'hover:bg-blue-700' : 'opacity-50'
						}`}
					>
						Send
					</button>
				</form>
			</div>
		</>
	);
};

async function uploadPhoto(photo: File) {
	const uploadTask = await storage
		.ref(`/images/${auth.currentUser?.uid || 'noUid'}/messages/${photo.name}`)
		.put(photo);
	const imageUrl = await uploadTask.ref.getDownloadURL();

	return imageUrl;
}
