import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import TextField from './TextField';
import Image from 'next/image';
import Delete from '../../../public/assets/icon-delete.svg';
import { FormProvider, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { invoice } from '../Data';
import SelectField from './SelectField';
// import { InvoiceInterface } from '../../interface/interface';

type FormValues = {
	senderAddress: {
		streetOne: string;
		cityOne: string;
		postCodeOne: string;
		countryOne: string;
	};
};

const Form = () => {
	const methods = useForm();
	const [success, setSuccess] = useState(false);

	const date = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());

	const onSubmit = methods.handleSubmit((data) => {
		console.log('Submitted data', data);
		methods.reset();
		setSuccess(true);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off" className="form background">
				<h2 className="form--title text--one">New Invoice</h2>
				<div className="form__scroll">
					<h3 className="form--title-subhead">Bill From</h3>
					<div className="flex form__flex-space">
						<TextField formSize="input--large" type="text" label="Street Address" placeholder="19 Union Terrace" id="streetOne" name="streetOne" />

						<div className="flex form__flex-gap">
							<TextField formSize="input--small" id="cityOne" type="text" placeholder="London" label="City" name="cityOne" />
							<TextField id="postCodeOne" formSize="input--small" label="Post Code" type="text" placeholder="E1 3EZ" name="postCodeOne" />
							<TextField formSize="input--small" id="countryOne" type="text" label="Country" placeholder="United Kingdom" name="countryOne" />
						</div>
					</div>
					<div className="form__flex-space">
						<h3 className="form--title-subhead">Bill To</h3>
						<div className="flex form__flex-gap form__flex-column">
							<TextField id="clientsName" label="Client's Name" formSize="input--large" type="text" placeholder="Alex Grim" name="clientsName" />
							<TextField id="clientsEmail" label="Client's Email" type="text" formSize="input--large" placeholder="alexgrim@gmail.com" name="clientsEmail" />
							<TextField id="streetTwo" label="Street Address" type="text" formSize="input--large" placeholder="84 Church Way" name="streetTwo" />
							<div className="flex form__flex-gap">
								<TextField formSize="input--small" id="cityTwo" label="City" placeholder="Bradford" name="cityTwo" type="text" />
								<TextField formSize="input--small" id="postCodeTwo" label="Post Code" placeholder="BD1 9PB" name="postCodeTwo" type="text" />
								<TextField formSize="input--small" id="countryTwo" label="Country" placeholder="United Kingdom" type="text" name="countryTwo" />
							</div>
						</div>
					</div>
					<div>
						<div className="flex form__terms">
							<TextField formSize="input--medium" type="date" id="paymentDue" label="Invoice Date" name="paymentDue" />
							<SelectField />
						</div>
						<TextField id="projectDescription" label="Project Description" type="text" placeholder="Graphic Design Service" name="projectDescription" formSize="input--large" />
					</div>
					<div className="item__list">
						<span className="item--list-header">Item List</span>
						<div className="flex form__flex-column">
							<div className="flex item__list-subheaders">
								<div>
									<span className="body--medium">Item Name</span>
									<TextField formSize="input--item" id="itemName" label="itemName" type="text" placeholder="Banner Design" name="itemName" />
								</div>
								<div>
									<span className="body--medium ">Qty.</span>
									<TextField type="number" formSize="input--qty" label="quantity" id="quantity" placeholder="1" name="quantity" />
								</div>
								<div>
									<span className="body--medium ">Price</span>
									<TextField type="number" formSize="input--price" label="price" id="price" placeholder="156.00" name="price" />
								</div>
								<div className="flex">
									<span className="body--medium">Total</span>
									<div className="flex input__total-spot">
										<span className="input--total body--medium">156.00</span>
										<Image className="total--delete" src={Delete} alt="Delete Icon" />
									</div>
								</div>
							</div>
							<Button type="submit" buttonStyle="btn--style-four" buttonSize="btn--size-five">
								+ Add New Item
							</Button>
						</div>
					</div>
				</div>
				<div className="form__bottom-buttons flex">
					<div className="form__discard-right">
						<Button buttonStyle="btn--style-six" buttonSize="btn--size-four">
							Discard
						</Button>
					</div>
					<div className="form__draft">
						<Button buttonStyle="btn--style-three" buttonSize="btn--size-two">
							Save as Draft
						</Button>
					</div>
					<Button onClick={onSubmit} type="submit" buttonStyle="" buttonSize="btn--size-two">
						Save & Send
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default Form;
