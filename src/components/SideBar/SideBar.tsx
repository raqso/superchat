import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLifeRing,
	faPlusCircle,
	faSignOutAlt,
	faWalking,
} from '@fortawesome/free-solid-svg-icons';
import OutsideClickHandler from 'react-outside-click-handler';

import { signOut } from '../../helpers/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Overlay } from './Overlay/Overlay';
import { Logo } from '../Logo/Logo';

type Props = {
	opened?: boolean;
	onOutsideClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

type SideBarLinkProps = {
	active?: boolean;
	href: string | ((event: React.MouseEvent<HTMLAnchorElement>) => void);
	title: string;
	faIcon?: IconDefinition;
	newWindow?: boolean;
	variant?: 'primary' | 'secondary';
};

const classes = {
	secondary: 'text-gray-600 hover:text-gray-500',
	active: 'bg-gray-700 text-gray-100 border-r-4 border-gray-100',
	inactive:
		' text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100',
};

const SideBarLink = ({
	active,
	href,
	title,
	faIcon,
	newWindow,
	variant = 'primary',
}: SideBarLinkProps) => (
	<a
		className={`flex items-center my-3 py-2 px-8 cursor-pointer ${
			variant === 'secondary'
				? classes.secondary
				: active
				? classes.active
				: classes.inactive
		}`}
		href={typeof href === 'string' ? href : undefined}
		onClick={typeof href === 'function' ? href : undefined}
		target={newWindow ? '_blank' : ''}
	>
		{faIcon && <FontAwesomeIcon icon={faIcon} />}

		<span className="mx-4 font-medium">{title}</span>
	</a>
);

export const SideBar = ({ opened, onOutsideClick }: Props) => {
	const [user] = useAuthState(auth);

	return (
		<>
			{opened && <Overlay />}
			<OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!opened}>
				<aside
					className={`bg-gray-200 font-sans transform top-0 left-0 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
						opened ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className="flex flex-col w-64 h-screen bg-gray-900 py-4 divide-y divide-gray-800">
						<div className="flex items-center justify-center mb-6">
							<Logo withoutText />
						</div>

						{user && (
							<div className="flex flex-row text-gray-400 px-6 py-6 items-center">
								<img
									src={user.photoURL || ''}
									alt={user.displayName || 'user avatar'}
									className="rounded-full h-8 w-8 mr-4 block"
								/>
								<span>{user.displayName}</span>
							</div>
						)}

						<nav>
							<SideBarLink
								href="#"
								title="Create a room"
								faIcon={faPlusCircle}
							/>
							<SideBarLink href="#" title="Join room" faIcon={faWalking} />

							{user && (
								<SideBarLink
									href={signOut}
									title="Sign out"
									faIcon={faSignOutAlt}
								/>
							)}
						</nav>
						<div className="h-full flex flex-col justify-end">
							<SideBarLink
								href="https://pl.linkedin.com/in/zdzislaw-bela"
								title="Support"
								faIcon={faLifeRing}
								newWindow
								variant="secondary"
							/>
						</div>
					</div>
				</aside>
			</OutsideClickHandler>
		</>
	);
};
