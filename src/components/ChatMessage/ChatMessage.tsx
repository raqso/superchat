import React from "react";

type Props = {
	message: {
		text: string;
		photoURL: string | null;
	};
};

export const ChatMessage = ({ message: { text, photoURL } }: Props) => {
	return (
		<div className="flex justify-between my-8 px-4">
			{photoURL && (
				<img
					src={photoURL}
					alt="user avatar"
					className="rounded-full h-8 w-8"
				/>
			)}
			<p className="w-full mx-2 p-2 text-white bg-blue-600 rounded-md">
				{text}
			</p>
		</div>
	);
};
