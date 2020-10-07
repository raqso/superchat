import { useCallback, useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '../../helpers/auth';

export const useLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	return {
		email,
		password,
		handleEmailChange,
		handlePasswordChange,
		handleSignInWithEmail,
		handleSignUpWithEmail,
	};
};
