import React, { ReactNode } from 'react';
import { Notification } from './components/Notification/Notification';
import { useNotification } from './contexts/NotificationContext';

export const Layout = ({ children }: { children: ReactNode }) => {
	const { notifications, getNotification } = useNotification();

	return (
		<div className="bg-gray-900 text-white">
			{!!notifications.length && (
				<Notification notification={getNotification()} />
			)}
			{children}
		</div>
	);
};
