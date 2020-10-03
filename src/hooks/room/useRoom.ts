import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../config/firebase';
import { create } from '../../models/Room';

export const useRoom = () => {
	const [user] = useAuthState(auth);

	const createRoom = useCallback(async () => {
		const { id } = await create({
			public: false,
			adminUid: user?.uid,
		});

		goToRoom(id);
	}, [user]);

	return { createRoom };
};

function goToRoom(id: string) {
	window.location.href = `/${id}`;
}
