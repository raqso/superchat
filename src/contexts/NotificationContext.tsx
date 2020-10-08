import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

const NOTIFICATION_DISPLAY_IN_MS = 3500;

export type Notification = { text: string; type: 'success' | 'error' };

type ContextType = {
	notifications: Notification[];
	addNotification(notification: Notification): void;
	getNotification(): Notification;
};

const initialContextValue: ContextType = {
	notifications: [],
	addNotification: () => null,
	getNotification: () => ({ text: '', type: 'success' }),
};

export const NotificationContext = createContext<ContextType>(
	initialContextValue
);

export const NotificationContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [notifications, setNotifications] = useState<Notification[]>(
		initialContextValue.notifications
	);
	const addNotification = useCallback((notification: Notification) => {
		setNotifications((currentNotifications) => [
			...currentNotifications,
			notification,
		]);
	}, []);

	const getNotification = useCallback(() => {
		const newNotifications = [...notifications];
		const firstNotification = newNotifications.pop();
		setTimeout(
			() => setNotifications(newNotifications),
			NOTIFICATION_DISPLAY_IN_MS
		);

		return firstNotification || ({ text: '', type: 'success' } as Notification);
	}, [notifications]);

	return (
		<NotificationContext.Provider
			value={{ notifications, addNotification, getNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
