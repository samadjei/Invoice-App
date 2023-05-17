import { useState } from 'react';
import Input from './Input';
import { FormProvider, useForm } from 'react-hook-form';

const Forms = () => {
	const methods = useForm();
	const [success, setSuccess] = useState(false);

	const onSubmit = methods.handleSubmit((data) => {
		console.log(data);
		methods.reset();
		setSuccess(true);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off">
				<Input label="name" name="name" type="text" id="name" placeholder="type your name..." />
				<Input label="password" name="password" type="password" id="password" placeholder="enter password..." />
				<button onClick={onSubmit}>Submit Form</button>
			</form>
		</FormProvider>
	);
};

export default Forms;
