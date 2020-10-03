import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../config/firebase';
import { create, isExists } from '../../models/Room';

export const useRoom = () => {
	const [user] = useAuthState(auth);

	const createRoom = useCallback(async () => {
		try {
			const { id } = await create({
				public: false,
				adminUid: user?.uid,
			});

			goToRoom(id);
		} catch (error) {
			console.error(error);
		}
	}, [user]);

	return { createRoom, goToRoom, promptForRoom };
};

function goToRoom(id: string) {
	window.location.href = `/${id}`;
}

async function promptForRoom() {
	const roomId = prompt('Enter room ID');

	if (!roomId || !(await isExists(roomId))) {
		return;
	}

	goToRoom(roomId);
}
