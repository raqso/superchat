import React, { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SideBarLinkProps = {
	active?: boolean;
	link: string | ((event: React.MouseEvent<HTMLButtonElement>) => void);
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

export const SideBarLink = ({
	active,
	link,
	title,
	faIcon,
	newWindow,
	variant = 'primary',
}: SideBarLinkProps) => (
	<WithLink
		className={`flex items-center my-3 py-2 px-8 cursor-pointer w-full ${
			variant === 'secondary'
				? classes.secondary
				: active
				? classes.active
				: classes.inactive
		}`}
		link={link}
		newWindow={newWindow}
	>
		{faIcon && <FontAwesomeIcon icon={faIcon} />}

		<span className="mx-4 font-medium">{title}</span>
	</WithLink>
);

type WithLinkProps = Pick<SideBarLinkProps, 'newWindow' | 'link'> & {
	className?: string;
	children: ReactNode;
};

function WithLink({ className, link, children, newWindow }: WithLinkProps) {
	if (typeof link === 'string') {
		return (
			<a className={className} href={link} target={newWindow ? '_blank' : ''}>
				{children}
			</a>
		);
	}

	if (typeof link === 'function') {
		return (
			<button className={className} onClick={link}>
				{children}
			</button>
		);
	}

	return null;
}
