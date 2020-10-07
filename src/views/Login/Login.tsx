import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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

type ContinueWithButtonProps = {
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	icon: IconDefinition;
	name: string;
	color: string;
};

const ContinueWithButton = ({
	onClick,
	icon,
	name,
	color,
}: ContinueWithButtonProps) => (
	<button
		className={`bg-${color}-500 hover:bg-${color}-600 py-2 px-4 rounded flex justify-start items-center`}
		onClick={onClick}
	>
		<FontAwesomeIcon icon={icon} className="mr-12" />
		Continue with {name}
	</button>
);

export const Login = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
			<Logo />
			<form className="w-full max-w-sm">
				<h1 className="text-center text-2xl my-4">Sign Up</h1>
				<div className="flex flex-col justify-between h-full bg-gray-800 p-8 rounded-md">
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
				</div>
			</form>
		</div>
	);
};
