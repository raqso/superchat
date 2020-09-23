import React, { useState } from "react";
import { auth } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { addMessage, Message, messagesQuery } from "../../models/Message";

import styles from "./ChatRoom.module.css";

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
			<section className={`${styles.messagesContainer} bg-gray-800 py-4`}>
				{messages &&
					messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
			</section>
			<form
				onSubmit={sendMessage}
				className="bg-gray-700 p-4 flex justify-between"
			>
				<input
					value={formValue}
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
		</>
	);
};
