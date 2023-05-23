import { useFormContext } from 'react-hook-form';

type TextFieldProps = {
	label: string;
	type: string;
	name: string;
	value?: string;
	formSize: string;
	placeholder?: string;
	id: string;
};

const SIZES = ['input--large', 'input--medium', 'input--small', 'input--item', 'input--qty', 'input--price'];

const TextField = ({ label, type, name, placeholder, formSize, id }: TextFieldProps) => {
	// if the component has a form style, then i we want it to be whatever the button style we created and if it's not true, we set the value to the first style value in the array

	const {
		register,
		formState: { errors },
	} = useFormContext();


	const checkFormSize = SIZES.includes(formSize) ? formSize : SIZES[0];

	return (
		<div className="input__text-field">
			<label className="body--medium input--label-text" htmlFor={id}>
				{label}
			</label>
			<input
				className={`input background--two input--padding input--primary  ${checkFormSize}`}
				type={type}
				placeholder={placeholder}
				{...register(name, {
					required: {
						value: true,
						message: 'required',
					},
				})}
			/>
		</div>
	);
};

TextField.displayName = 'TextField';

export default TextField;
