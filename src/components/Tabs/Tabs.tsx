import React, { ReactElement, useState } from 'react';
import { TabProps } from './Tab';

type Props = {
	children: ReactElement<TabProps>[];
	className?: string;
	activeIndex?: number;
};

export const Tabs = ({ children, className, activeIndex = 0 }: Props) => {
	const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);

	return (
		<div className={className}>
			<ol className="flex flex-wrap border-b">
				{children.map((child, index) => (
					<li
						key={child.props.label}
						onClick={() => setActiveTabIndex(index)}
						className={`${
							activeTabIndex === index
								? '-mb-px font-semibold'
								: 'cursor-pointer'
						} mr-1 bg-gray-900 inline-block border-gray-800 border-l border-t border-r rounded-t py-1 px-1 text-gray-700`}
					>
						{child.props.label}
					</li>
				))}
			</ol>
			<div>
				{children.map((child, index) => {
					if (index !== activeTabIndex) return null;
					return child;
				})}
			</div>
		</div>
	);
};
