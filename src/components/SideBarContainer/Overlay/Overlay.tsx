import React from 'react';

export const Overlay = () => (
	<div className="z-10 fixed inset-0 transition-opacity">
		<div tabIndex={0} className="absolute inset-0 bg-black opacity-50"></div>
	</div>
);
