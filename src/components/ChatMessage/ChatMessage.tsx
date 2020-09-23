import React from "react";

type Props = {
	message: {
		text: string;
		photoURL: string | null;
	};
};

export const ChatMessage = ({ message: { text, photoURL } }: Props) => {
	return (
		<div>
			{photoURL && <img src={photoURL} alt="user avatar" />}
			<p>{text}</p>
		</div>
	);
};
