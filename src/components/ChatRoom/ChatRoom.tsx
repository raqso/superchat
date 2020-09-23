import React from "react";
import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { Message } from "../../models/Message";

const MAX_MESSAGES = 25;

export const ChatRoom = () => {
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(MAX_MESSAGES);

	const [messages] = useCollectionData<Message & { id: string }>(query, {
		idField: "id",
	});

	return (
		<div>
			{messages &&
				messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
		</div>
	);
};
