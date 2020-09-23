import React from "react";
import { auth } from "../../firebase";
import { Message } from "../../models/Message";

type Props = {
	message: Message;
};

export const ChatMessage = ({ message: { text, photoURL, userId } }: Props) => {
	const isCurrentUserMessage = userId === auth?.currentUser?.uid;

	return (
		<div
			className={`flex justify-start items-center my-8 px-4 ${
				isCurrentUserMessage ? "flex-row-reverse" : ""
			}`}
		>
			{photoURL && (
				<img
					src={photoURL}
					alt="user avatar"
					className="rounded-full h-8 w-8"
				/>
			)}
			<p
				className={`mx-2 px-4 py-2 rounded-lg ${
					isCurrentUserMessage
						? "text-white bg-blue-600"
						: "text-gray-900 bg-gray-100"
				}`}
			>
				{text}
			</p>
		</div>
	);
};
