import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => (
	<div className="bg-gray-900 text-white">{children}</div>
);
