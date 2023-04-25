import React from 'react';
import { createContext, useState, useContext } from 'react';

interface StateContextProps {
	theme: string;
	invoiceOpen?: boolean;
	sideBarIcon?: boolean;
	toggleTheme?: () => void;
}
const Context = createContext<StateContextProps>({
	theme: 'light',
	invoiceOpen: false,
	sideBarIcon: false,
	toggleTheme: () => {},
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const StateContext = ({ children }: ContextProviderProps) => {
	const [theme, setTheme] = useState('light');
	const [invoiceOpen, setInvoiceOpen] = useState(false);
	const [sideBarIcon, setSideBarIcon] = useState(false);

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
		setSideBarIcon(!sideBarIcon);
	};

	return (
		<Context.Provider
			value={{
				theme,
				invoiceOpen,
				sideBarIcon,
				toggleTheme,
			}}
		>
			{children}
		</Context.Provider>
	);
};

// allows us to use our state like a hook
export const useStateContext = () => useContext(Context);
