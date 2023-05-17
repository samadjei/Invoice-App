import React, { useState } from 'react';

type TextFieldProps = {
	htmlFor: string;
	// inputError: string;
	label: string;
	type: string;
	name: string;
	value?: string;
	formSize: string;
	placeholder: string;
	register: any;
	// errors: {
	// 	name?: string;
	// };
};

// 1/4 mile of the home address
// query with
// 08005875548
// alternative 01277725559

// rac

const SIZES = ['input--large', 'input--medium', 'input--small', 'input--item', 'input--qty', 'input--price'];
const inputError = 'input--error';

const TextField: React.FC<TextFieldProps> = React.forwardRef<HTMLInputElement, TextFieldProps>(({ htmlFor, label, type, name, placeholder, formSize, register }, ref) => {
	// if the component has a form style, then i we want it to be whatever the button style we created and if it's not true, we set the value to the first style value in the array

	const [value, setValue] = useState('');

	const checkFormSize = SIZES.includes(formSize) ? formSize : SIZES[0];
	const onChange = (e: React.ChangeEvent) => {
		if (e.target.value === 'hello world') setValue('softwaredev');
	};

	return (
		<div className="input__text-field">
			<label className="body--medium input--label-text" htmlFor={htmlFor}>
				{label}
			</label>
			{/* ${inputError} */}
			<input {...register(name, { onChange: onChange })} className={`input background--two input--padding input--primary  ${checkFormSize}`} ref={ref} type={type} name={name} placeholder={placeholder} />
			{/* {errors.name ? <p>Requuired</p> : ''} */}
		</div>
	);
});

TextField.displayName = 'TextField';

export default TextField;
