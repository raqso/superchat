import React, { useCallback, useRef, useState, useEffect } from 'react';
import { auth, storage } from '../../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { addMessage, Message, messagesQuery } from '../../models/Message';

import styles from './ChatRoom.module.css';
import { UploadPhotoButton } from '../UploadPhotoButton/UploadPhotoButton';

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
			<div className="flex bg-gray-700 p-4 justify-between">
				<UploadPhotoButton
					file={file}
					onFileChange={setFile}
					onRemoveImage={onRemoveImage}
				/>
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
