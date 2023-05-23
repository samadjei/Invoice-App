import { useFormContext } from 'react-hook-form';

const options = [
	{ value: '1', label: 'Net 1 Day' },
	{ value: '7', label: 'Net 7 Days' },
	{ value: '14', label: 'Net 14 Days' },
	{ value: '30', label: 'Net 30 Days' },
];

type SelectField = {
	paymentTerm: string;
};

const SelectField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="input__payment-terms">
			<label className="body--medium input--label-text" htmlFor="payment-terms">
				Payment Terms
			</label>
			<select
				className="select select__background input--medium"
				id="payment-terms"
				{...register('paymentTerms', {
					required: {
						value: true,
						message: 'required',
					},
				})}
				name="paymentTerms"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
