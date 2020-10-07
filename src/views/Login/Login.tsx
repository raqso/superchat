import {
	faFacebook,
	faGithub,
	faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Logo } from '../../components/Logo/Logo';
import {
	signInWithFacebook,
	signInWithGithub,
	signInWithGoogle,
} from '../../helpers/auth';

export const Login = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
			<Logo />
			<form className="w-full max-w-sm">
				<h1 className="text-center text-2xl my-4">Sign Up</h1>
				<div className="flex flex-col justify-between h-full bg-gray-800 p-8 rounded-md">
					<button
						className="bg-red-500 hover:bg-red-600  py-2 px-4 rounded flex justify-start items-center"
						onClick={signInWithGoogle}
					>
						<FontAwesomeIcon icon={faGoogle} className="mr-12" />
						Continue with Google
					</button>
					<button
						className="bg-gray-900 hover:bg-gray-700 py-2 px-4 rounded flex justify-start items-center"
						onClick={signInWithGithub}
					>
						<FontAwesomeIcon icon={faGithub} className="mr-12" />
						Continue with Github
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded flex justify-start items-center"
						onClick={signInWithFacebook}
					>
						<FontAwesomeIcon icon={faFacebook} className="mr-12" />
						Continue with Facebook
					</button>
				</div>
			</form>
		</div>
	);
};
