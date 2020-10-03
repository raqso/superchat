import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const SideBarLink = ({
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
