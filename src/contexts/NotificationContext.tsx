import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

type ContextType = {
	notifications: string[];
	addNotification(notification: string): void;
};

const initialContextValue: ContextType = {
	notifications: [],
	addNotification: () => null,
};

export const NotificationContext = createContext<ContextType>(
	initialContextValue
);

export const NotificationContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [notifications, setNotifications] = useState<string[]>(
		initialContextValue.notifications
	);
	const addNotification = useCallback((notification: string) => {
		setNotifications((currentNotifications) => [
			...currentNotifications,
			notification,
		]);
	}, []);

	return (
		<NotificationContext.Provider value={{ notifications, addNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
