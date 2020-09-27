import React from 'react';
import { formatDistance } from 'date-fns';
import styles from './ChatMessage.module.css';
import { auth } from '../../firebase';
import { Message } from '../../models/Message';

type Props = {
	message: Message;
};

export const ChatMessage = ({
	message: { text, photoURL, userId, displayName, createdAt, messageImageUrl },
}: Props) => {
	const isCurrentUserMessage = userId === auth?.currentUser?.uid;

	return (
		<div
			className={`flex justify-start items-center my-2 sm:my-3 px-1 sm:px-3 ${
				isCurrentUserMessage ? 'flex-row-reverse' : ''
			}`}
		>
			{photoURL && (
				<div aria-label={displayName || undefined} data-balloon-pos="up">
					<img
						src={photoURL}
						alt={displayName || 'user avatar'}
						className="rounded-full h-8 w-8"
					/>
				</div>
			)}
			<p
				aria-label={
					createdAt ? formatDistance(createdAt.toDate(), new Date()) : undefined
				}
				data-balloon-pos="down"
				className={`mx-2 px-4 py-2 rounded-lg break-words ${
					isCurrentUserMessage
						? 'text-white bg-blue-600'
						: 'text-gray-900 bg-gray-100'
				} ${styles.text}`}
			>
				{text}
				{messageImageUrl && (
					<a href={messageImageUrl} target="_blank" rel="noopener noreferrer">
						<img src={messageImageUrl} alt="message" className={styles.image} />
					</a>
				)}
			</p>
		</div>
	);
};
