import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlusCircle,
	faSignOutAlt,
	faWalking,
} from '@fortawesome/free-solid-svg-icons';
import OutsideClickHandler from 'react-outside-click-handler';

import { signOut } from '../../helpers/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

type Props = {
	opened?: boolean;
	onOutsideClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

type SideBarLinkProps = {
	active?: boolean;
	href: string | ((event: React.MouseEvent<HTMLAnchorElement>) => void);
	title: string;
	faIcon?: IconDefinition;
};

const classes = {
	active: 'bg-gray-700 text-gray-100 border-r-4 border-gray-100',
	inactive:
		' text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100',
};

const SideBarLink = ({ active, href, title, faIcon }: SideBarLinkProps) => (
	<a
		className={`flex items-center mt-5 py-2 px-8 cursor-pointer ${
			active ? classes.active : classes.inactive
		}`}
		href={typeof href === 'string' ? href : undefined}
		onClick={typeof href === 'function' ? href : undefined}
	>
		{faIcon && <FontAwesomeIcon icon={faIcon} />}

		<span className="mx-4 font-medium">{title}</span>
	</a>
);

export const SideBar = ({ opened, onOutsideClick }: Props) => {
	const [user] = useAuthState(auth);

	return (
		<OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!opened}>
			<aside
				className={`bg-gray-200 font-sans transform top-0 left-0 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
					opened ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className="w-64 h-screen bg-gray-900 py-4">
					<div className="flex items-center justify-center">
						<img
							alt="chat logo"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADdElEQVRoge2ZO24UQRCG/97FNhERC3YKmVPugci4AkggHhISGTdARlg44AakHIArICERE9niIT8CwJLl/gl6eqb63TszuyuhbWnlHVd1d1V9VTXTs8B6rMd6rMcqhypqvPh8Xym8BTADCQUCIEDzV5FGz8rYyY0uPF05F+Y6KvPmdrIf1Hj89/3dDwAwKXqosA9wpqihoM0iNBuo5jtamXaNt7LmI2XGQN3K7bquM2ZdKVfkjYnivrXvSpHAn5PrbdThRwfxqNtrwImsqwuPptSFS0gRaroJTDes7izpwJ1PJ/dAdQBg26xHu14zl8Jes3G3LxN63rWj16wT1TOLX56f4+zLV1yc/QamG10AEUsh4h2IbTbIHGPJJksINjI2su66+a5jMoQy7a8TytTmVVzb3QUuzru0TREg1Y4bdUqqXtQpoujT8uj48+akqra2AF42dZF1IIVT/D+XLhCO9UiXuJ65bhtHzoFk1KObhFHPEsmRlESSJDVM5+rMjRKowp5LlwXRAllRA3pc7HFDE/MKtNr7ULEGZNRHSImhBWznGQK65EBksrOJT6EHrdy8DC3/xpcmMA/2XBrUkpSBK9RdsY1WFekIKZG/iydIoqKNOl0ooNAjXYq0InQSVO0G8lEi0YUSC0siuXRZEMm2iIs1IDdxOoFPYdziDom7gfSfdBMOFAwobNL/Ll5BS54rUg6k0I5ZwNl5GeLuqS1JIFV84/b0WlquzJ7gOnujKbSsnp6cl6DVHUULBGpToipdakkGeiER+8mfB/SwTQI6c6RLnJbUEy8WsgSiC0UWllEfo7gdPT+QxITsJqYcKHaGgIJLa5xnqRRJ20a7UdeFZNSr0mUxtCrbaIUBiS6RJTdXusRptUVM/swSKKKdMyXGKWBzIlPQ30k8yhKITR67p/eh9evjq+BdbqSNZgzogb03yRiFyIh1oSMCO/kiHZ4S8xYwwcOYA8GrRWr1kOSRLWbzeo9tcTvfczIKmQ5lraNaXIvXlk7akYfQkwcxB8q/DyTGzYNv4pyRSBdy7/jJredQ8vFr3FF+vZ4YcdROuizceGCQA9niXorxwFgERAGD2Dt+uhzjgQEOQIcdZNnGAwMJyLapsHzjgYE10HYdYO9kBcYDFb9SpgaJy6YG3pyuyHhgAAEN9VJB8/TZ7derMv6/GP8Al3B5Hmm6ePUAAAAASUVORK5CYII="
						/>
					</div>

					<nav className="mt-12">
						<SideBarLink href="#" title="Create a room" faIcon={faPlusCircle} />
						<SideBarLink href="#" title="Join room" faIcon={faWalking} />

						{user && (
							<SideBarLink
								href={signOut}
								title="Sign out"
								faIcon={faSignOutAlt}
							/>
						)}
					</nav>
				</div>
			</aside>
		</OutsideClickHandler>
	);
};
