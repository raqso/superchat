import React, { useState } from "react";
import { auth } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { addMessage, Message, messagesQuery } from "../../models/Message";

export const ChatRoom = () => {
	const [messages] = useCollectionData<Message & { id: string }>(
		messagesQuery,
		{
			idField: "id",
		}
	);

	const [formValue, setFormValue] = useState("");
	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!auth.currentUser) {
			return;
		}
		const { uid: userId, photoURL } = auth.currentUser;

		await addMessage({
			text: formValue,
			userId,
			photoURL,
		});
		setFormValue("");
	};
	const handleFormValueChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormValue(event.target.value);
	};

	return (
		<>
			<div>
				{messages &&
					messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
			</div>
			<form onSubmit={sendMessage}>
				<input value={formValue} onChange={handleFormValueChange} />
				<button type="submit">Send</button>
			</form>
		</>
	);
};
