import React from 'react';
import { useFormContext } from 'react-hook-form';
import { findInputError } from '../../utils/findInputError';
import { isFormInvalid } from '../../utils/isFormValid';

type Input = {
	label: string;
	type: string;
	id: string;
	placeholder: string;
	name: string;
};

interface InputErrorType {
	error: {
		message: string;
	};
}

export const Input = ({ label, name, type, id, placeholder }: Input) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);

	return (
		<div className="flex flex-col w-full gap-2">
			<div className="flex justify-between">
				<label htmlFor={id} className="font-semibol capitalize">
					{label}
				</label>
				{isInvalid && <InputError message={inputError.error.message} key={inputError.error.message} />}
			</div>
			<input
				type={type}
				placeholder={placeholder}
				id={id}
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

const InputError = ({ message }: InputError) => {
	return <div>{message}</div>;
};
