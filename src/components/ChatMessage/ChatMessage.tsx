import React from 'react';
import { formatDistance } from 'date-fns';

import { auth } from '../../firebase';
import { Message } from '../../models/Message';

type Props = {
	message: Message;
};

export const ChatMessage = ({
	message: { text, photoURL, userId, displayName, createdAt },
}: Props) => {
	const isCurrentUserMessage = userId === auth?.currentUser?.uid;

	return (
		<div
			className={`flex justify-start items-center my-8 px-4 ${
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
				className={`mx-2 px-4 py-2 rounded-lg max-w-3/4 ${
					isCurrentUserMessage
						? 'text-white bg-blue-600'
						: 'text-gray-900 bg-gray-100'
				}`}
			>
				{text}
			</p>
		</div>
	);
};
