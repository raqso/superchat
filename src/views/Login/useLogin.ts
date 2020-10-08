import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useNotification } from './../../contexts/NotificationContext';
import {
	signInWithEmail,
	signInWithFacebook,
	signInWithGoogle,
	signInWithGithub,
	signUpWithEmail,
} from '../../helpers/auth';

export const useLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addNotification } = useNotification();
	const history = useHistory();

	const goHome = useCallback(() => history.push('/'), [history]);

	const handleEmailChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) =>
			setEmail(event.target.value),
		[]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) =>
			setPassword(event.target.value),
		[]
	);

	const handleSignInWithEmail = () => signInWithEmail(email, password);
	const handleSignUpWithEmail = () => signUpWithEmail(email, password);

	const getSignInHandler = useCallback(
		(signInFn: () => Promise<firebase.auth.UserCredential>) => async () => {
			const displaySuccess = () =>
				addNotification({ text: 'Successfully logged in', type: 'success' });
			const displayError = (error: Error) =>
				addNotification({ text: error.message, type: 'error' });

			try {
				await signInFn();
				displaySuccess();
				goHome();
			} catch (error) {
				console.error(error);
				displayError(error);
			}
		},
		[addNotification, goHome]
	);

	const loginWithGoogle = getSignInHandler(signInWithGoogle);
	const loginWithGithub = getSignInHandler(signInWithGithub);
	const loginWithFacebook = getSignInHandler(signInWithFacebook);
	const loginWithEmail = getSignInHandler(handleSignInWithEmail);
	const registerWithEmail = getSignInHandler(handleSignUpWithEmail);

	return {
		email,
		password,
		handleEmailChange,
		handlePasswordChange,
		loginWithGoogle,
		loginWithGithub,
		loginWithFacebook,
		loginWithEmail,
		registerWithEmail,
	};
};
