import React, { ReactNode, forwardRef } from 'react';

const STYLES = ['btn--style-one', 'btn--style-two', 'btn--style-three', 'btn--style-four', 'btn--style-five', 'btn--style-six'];
const SIZES = ['btn--size-one', 'btn--size-two', 'btn--size-three', 'btn--size-four', 'btn--size-five'];

interface ButtonProps {
	onClick?: () => void;
	href?: string;
	buttonStyle: string;
	buttonSize: string;
	type: 'button' | 'reset' | 'submit' | undefined;
	children: ReactNode;
}

const Button: React.FC<ButtonProps> = forwardRef(({ onClick, buttonStyle, buttonSize, type, children }) => {
	const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
	const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
	return (
		<button className={`btn ${checkButtonStyle} ${checkButtonSize}`} type={type} onClick={onClick}>
			{children}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
