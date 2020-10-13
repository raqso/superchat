import React, { ReactNode } from 'react';

export type TabProps = {
	children: ReactNode | ReactNode[];
	label: string;
	className?: string;
};

export const Tab = ({ children, label, className = '' }: TabProps) => {
	return (
		<div
			className={`tab-list-item tab-list-active ${className}`}
			aria-label={`${label}`}
		>
			{children}
		</div>
	);
};
