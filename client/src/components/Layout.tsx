import React from 'react';
import Head from 'next/head';
import SideBar from './SideBar';
import { useStateContext } from '../../src/hooks/context/StateContext';
import { ReactNode } from 'react';

interface LayoutInterface {
	children: ReactNode;
}

const Layout = ({ children }: LayoutInterface) => {
	const { toggleTheme, sideBarIcon } = useStateContext();

	return (
		<>
			<Head>
				<title>Invoice App</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			</Head>
			<div>
				<SideBar toggleTheme={toggleTheme} sideBarIcon={sideBarIcon} />
				{children}
			</div>
		</>
	);
};

export default Layout;
