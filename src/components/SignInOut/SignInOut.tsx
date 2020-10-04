import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGoogle,
	faGithub,
	faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	signInWithFacebook,
	signInWithGithub,
	signInWithGoogle,
	signOut,
} from '../../helpers/auth';

const buttonClasses =
	'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-5 px-2 sm:py-0 sm:px-2 border border-blue-500 hover:border-transparent rounded';

export const SignInOut = () => {
	const [user] = useAuthState(auth);

	if (!user) {
		return (
			<div className="p-6">
				<span className="text-white text-lg">Sign in with</span>
				<button
					className={`${buttonClasses} border-none`}
					onClick={signInWithGoogle}
				>
					<FontAwesomeIcon icon={faGoogle} color="#2d3748" />
				</button>
				<button
					className={`${buttonClasses} border-none`}
					onClick={signInWithGithub}
				>
					<FontAwesomeIcon icon={faGithub} color="#2d3748" />
				</button>
				<button
					className={`${buttonClasses} border-none`}
					onClick={signInWithFacebook}
				>
					<FontAwesomeIcon icon={faFacebook} color="#2d3748" />
				</button>
			</div>
		);
	}

	return (
		<button className={buttonClasses} onClick={signOut}>
			Sign out
		</button>
	);
};
