import React, { ReactNode } from 'react';

import styles from './Drawer.module.css';

type Props = { opened?: boolean; children: ReactNode };

export const Drawer = ({ opened = false, children }: Props) => (
	<div className={`${styles.drawer} ${opened ? styles.opened : ''}`}>
		{opened && children}
	</div>
);
