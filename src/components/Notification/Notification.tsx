import React from 'react';

type Props = {
	notification: { text: string; type: 'success' | 'error' };
};

export const Notification = ({ notification: { text, type } }: Props) => {
	return (
		<div
			className={`w-full absolute p-4 flex justify-center items-center ${
				type === 'success' ? 'bg-green-600' : 'bg-red-700'
			}`}
		>
			<p>{text}</p>
		</div>
	);
};
