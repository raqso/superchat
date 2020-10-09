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
	label?: string;
	className?: string;
};

const ContinueWithButton = ({
	onClick,
	icon,
	name,
	label,
	className = '',
}: ContinueWithButtonProps) => (
	<button
		className={`${className} py-2 px-4 rounded flex justify-start items-center my-2`}
		onClick={onClick}
		type="submit"
	>
		<FontAwesomeIcon icon={icon} className="mr-4" />
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
		loginWithGoogle,
		loginWithGithub,
		loginWithFacebook,
		loginWithEmail,
		registerWithEmail,
	} = useLogin();

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<Logo />
			<div className="w-full max-w-sm mt-6">
				<h1 className="text-center text-2xl my-4">Sign Up</h1>
				<form
					className="flex flex-col justify-between h-full bg-gray-800 p-10 rounded-md"
					onSubmit={(event) => event.preventDefault()}
				>
					<ContinueWithButton
						name="Google"
						icon={faGoogle}
						className="bg-red-500 hover:bg-red-600"
						onClick={loginWithGoogle}
					/>
					<ContinueWithButton
						name="Github"
						icon={faGithub}
						className="bg-gray-500 hover:bg-gray-600"
						onClick={loginWithGithub}
					/>
					<ContinueWithButton
						name="Facebook"
						icon={faFacebook}
						className="bg-blue-500 hover:bg-blue-600"
						onClick={loginWithFacebook}
					/>
					<span className="text-center text-gray-600 my-4">OR</span>
					<label className={classes.label} htmlFor="email">
						E-mail
					</label>
					<input
						id="email"
						type="email"
						required
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
						placeholder="XXXXXX"
						required
						minLength={6}
						value={password}
						onChange={handlePasswordChange}
						className={classes.input}
					/>
					<div className="flex justify-between mt-4">
						<ContinueWithButton
							label="Sign In"
							icon={faEnvelope}
							className="bg-teal-500 hover:bg-teal-600"
							onClick={loginWithEmail}
						/>
						<ContinueWithButton
							label="Sign Up"
							icon={faEnvelope}
							className="bg-indigo-500 hover:bg-indigo-600"
							onClick={registerWithEmail}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
