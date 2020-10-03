import React from 'react';
import {
	faLifeRing,
	faPlusCircle,
	faSignOutAlt,
	faWalking,
} from '@fortawesome/free-solid-svg-icons';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../config/firebase';
import { Overlay } from '../Overlay/Overlay';
import { Logo } from '../../Logo/Logo';
import { signOut } from '../../../helpers/auth';
import { SideBarLink } from '../SideBarLink/SideBarLink';

type UserInfoProps = {
	user: firebase.User;
};

const UserInfo = ({ user }: UserInfoProps) => (
	<div className="flex flex-row text-gray-400 px-6 py-6 items-center">
		<img
			src={user.photoURL || ''}
			alt={user.displayName || 'user avatar'}
			className="rounded-full h-8 w-8 mr-4 block"
		/>
		<span>{user.displayName}</span>
	</div>
);

type Props = {
	opened?: boolean;
	onOutsideClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

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

						{user && <UserInfo user={user}></UserInfo>}

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
