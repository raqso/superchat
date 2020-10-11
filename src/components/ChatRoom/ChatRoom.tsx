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
import { faFilm, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChatroom } from './useChatroom';
import clickButtonSound from '../../assets/audio/button_click.ogg';
import { useAuthState } from 'react-firebase-hooks/auth';

const audio = new Audio(clickButtonSound);

export const ChatRoom = () => {
	const dummyRef = useRef<HTMLDivElement>(null);
	const scrollToLastMessage = () =>
		dummyRef?.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	const { gifSelectorOpened, toggleGifSelector } = useChatroom();

	const [, roomId] = window.location.pathname.split('/');
	const messagesQuery = roomId
		? getMessagesQueryForRoom(roomId)
		: publicMessagesQuery;
	const [messages, loading, error] = useCollectionData<
		Message & { id: string }
	>(messagesQuery, {
		idField: 'id',
	});

	const [currentUser] = useAuthState(auth);
	useEffect(() => {
		if (!messages?.length) {
			return;
		}

		const playSound = () => {
			const lastMessage = messages[messages.length - 1];
			const isCurrentUserMessage = lastMessage.userId === currentUser?.uid;

			if (isCurrentUserMessage || isOldMessage(lastMessage)) {
				return;
			}

			return audio.play();
		};

		playSound();
	}, [messages, currentUser]);

	const [file, setFile] = useState<File>();

	const [formValue, setFormValue] = useState('');
	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSending(true);

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

		try {
			await addMessage(messageDoc);
		} catch (error) {
			console.error(error);
		}

		setIsSending(false);
		setFormValue('');
		setFile(undefined);
		scrollToLastMessage();
	};

	const handleFormValueChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormValue(event.target.value);
	};

	const onRemoveImage = useCallback(() => setFile(undefined), []);
	const [isSending, setIsSending] = useState(false);
	const canSend = !isSending && (!!formValue || !!file);

	const sendGif = async (gif: IGif) => {
		setIsSending(true);
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

			if (roomId) {
				messageDoc.roomId = roomId;
			} else {
				messageDoc.public = true;
			}

			await addMessage(messageDoc);
			toggleGifSelector();
			scrollToLastMessage();
		} catch (error) {
			console.error(error);
		}

		setIsSending(false);
	};

	useEffect(() => {
		const SCROLL_DELAY_IN_MS = 1000;
		setTimeout(scrollToLastMessage, SCROLL_DELAY_IN_MS);
	}, [messages]);

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
				<form
					onSubmit={sendMessage}
					className="flex justify-between w-full text-gray-800"
				>
					<input
						value={formValue}
						placeholder="Say something nice..."
						onChange={handleFormValueChange}
						className="w-full px-4 py-3 mr-2"
					/>
					<button
						type="submit"
						disabled={!canSend}
						className={`flex justify-center items-center bg-transparent text-white font-bold rounded-full mx-4 ${
							!canSend ? 'cursor-not-allowed opacity-75' : ''
						}`}
					>
						<FontAwesomeIcon icon={faPaperPlane} size="2x" />
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

function isOldMessage(message: Message) {
	const MESSAGE_OUTDATE_TIME_IN_SECONDS = 5;
	const currentTimeInMiliseconds = Date.now();

	return (
		message.createdAt &&
		currentTimeInMiliseconds - message.createdAt.toDate().getTime() >
			MESSAGE_OUTDATE_TIME_IN_SECONDS * 1000
	);
}
