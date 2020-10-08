import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebook,
	faGithub,
	faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Logo } from '../../components/Logo/Logo';
import {
	signInWithFacebook,
	signInWithGithub,
	signInWithGoogle,
} from '../../helpers/auth';
import { useLogin } from './useLogin';

const classes = {
	label: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
	input:
		'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
};

type ContinueWithButtonProps = {
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	icon: IconDefinition;
	name?: string;
	color: string;
	label?: string;
	className?: string;
};

const ContinueWithButton = ({
	onClick,
	icon,
	name,
	label,
	color,
	className = 'mr-12',
}: ContinueWithButtonProps) => (
	<button
		className={`bg-${color}-500 hover:bg-${color}-600 py-2 px-4 rounded flex justify-start items-center my-2`}
		onClick={onClick}
	>
		<FontAwesomeIcon icon={icon} className={className} />
		{label}
		{name && `Continue with ${name}`}
	</button>
);

export const Login = () => {
	const {
		email,
		password,
		handleEmailChange,
		handlePasswordChange,
		handleSignInWithEmail,
		handleSignUpWithEmail,
	} = useLogin();

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<Logo />
			<div className="w-full max-w-sm bg-">
				<h1 className="text-center text-2xl my-4">Sign Up</h1>
				<div className="flex flex-col justify-between h-full bg-gray-800 p-10 rounded-md">
					<ContinueWithButton
						name="Google"
						icon={faGoogle}
						color="red"
						onClick={signInWithGoogle}
					/>
					<ContinueWithButton
						name="Github"
						icon={faGithub}
						color="gray"
						onClick={signInWithGithub}
					/>
					<ContinueWithButton
						name="Facebook"
						icon={faFacebook}
						color="blue"
						onClick={signInWithFacebook}
					/>
					<span className="text-center text-gray-600 my-4">OR</span>
					<label className={classes.label} htmlFor="email">
						E-mail
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={handleEmailChange}
						placeholder="john@doe.example.com"
						className={classes.input}
					/>
					<label className={classes.label} htmlFor="password">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={handlePasswordChange}
						className={classes.input}
					/>
					<div className="flex justify-between mt-4">
						<ContinueWithButton
							label="Sign In"
							icon={faEnvelope}
							color="teal"
							className="mr-4"
							onClick={handleSignInWithEmail}
						/>
						<ContinueWithButton
							label="Sign Up"
							icon={faEnvelope}
							color="indigo"
							className="mr-4"
							onClick={handleSignUpWithEmail}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
