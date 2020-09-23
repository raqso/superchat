import React from "react";

export const ChatMessage = ({
	message: { text },
}: {
	message: { text: string };
}) => {
	return <p>{text}</p>;
};
