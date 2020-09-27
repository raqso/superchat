import React, { useCallback, useRef, useState, useEffect } from 'react';
import { auth, storage } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { addMessage, Message, messagesQuery } from '../../models/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import styles from './ChatRoom.module.css';

export const ChatRoom = () => {
	const dummyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
	});

	const [messages] = useCollectionData<Message & { id: string }>(
		messagesQuery,
		{
			idField: 'id',
		}
	);

	const [formValue, setFormValue] = useState('');
	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!auth.currentUser) {
			return;
		}

		const { uid: userId, photoURL, displayName } = auth.currentUser;

		const messagePhoto = file ? await uploadPhoto() : null;
		const messageDoc: Partial<Message> = {
			text: formValue,
			userId,
			photoURL,
			displayName,
		};
		if (messagePhoto) {
			messageDoc.messageImageUrl = messagePhoto;
		}
		await addMessage(messageDoc);

		setFormValue('');
		dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const handleFormValueChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormValue(event.target.value);
	};

	const [file, setFile] = useState<File | null>(null);
	const [url, setURL] = useState('');
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target?.files?.length) {
				return;
			}

			setFile(event.target.files[0]);
			const previewUrl = window.URL.createObjectURL(event.target.files[0]);
			setURL(previewUrl);
		},
		[]
	);

	const uploadPhoto = useCallback(async () => {
		if (!file) {
			return;
		}

		const uploadTask = await storage.ref(`/images/${file.name}`).put(file);
		const imageUrl = await uploadTask.ref.getDownloadURL();

		return imageUrl;
	}, [file]);

	return (
		<>
			<section
				className={`${styles.messagesContainer} bg-gray-800 py-2 px-1 sm:px-4`}
			>
				{messages &&
					messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				<div ref={dummyRef}></div>
			</section>
			<div className="bg-gray-700 p-4 flex justify-between">
				<div className={`${styles.uploadWrapper} flex hover:opacity-75`}>
					{!file && (
						<button className="mr-4">
							<FontAwesomeIcon icon={faCamera} size="2x" color="#2d3748" />
						</button>
					)}
					{url && <img src={url} alt="element to upload" className="mr-2" />}
					<input type="file" onChange={handleChange} />
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
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					>
						Send
					</button>
				</form>
			</div>
		</>
	);
};
