import React, { useCallback, useRef, useState, useEffect } from 'react';
import { auth } from '../../firebase';
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

		await addMessage({
			text: formValue,
			userId,
			photoURL,
			displayName,
		});

		setFormValue('');
		dummyRef?.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const handleFormValueChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormValue(event.target.value);
	};

	const onPhotoClick = useCallback((event) => {
		event.preventDefault();
		console.log('Not implemented!');
	}, []);

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
			<form
				onSubmit={sendMessage}
				className="bg-gray-700 p-4 flex justify-between"
			>
				<button className="mr-4 hover:opacity-75" onClick={onPhotoClick}>
					<FontAwesomeIcon icon={faCamera} size="2x" color="#2d3748" />
				</button>
				<input
					value={formValue}
					placeholder="Say something nice..."
					onChange={handleFormValueChange}
					className="w-full px-4 py-3 mr-2"
				/>
				<button
					type="submit"
					disabled={!formValue}
					className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
						!formValue ? 'opacity-50' : ' hover:bg-blue-700'
					}`}
				>
					Send
				</button>
			</form>
		</>
	);
};
