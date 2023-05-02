import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import TextField from './TextField';
import Image from 'next/image';
import Delete from '../../../public/assets/icon-delete.svg';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { invoice } from '../Data';
import { InvoiceProps } from '../../interface/interface';

const Form = ({ discardForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	const [invoices, setInvocies] = useState(invoice);

	const date = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());

	const [addFormData, setAddFormData] = useState({
		senderAddress: {
			streetOne: '',
			cityOne: '',
			postCodeOne: '',
			countryOne: '',
		},
		clientsName: '',
		clientsEmail: '',
		clientAddress: {
			streetTwo: '',
			cityTwo: '',
			postCodeTwo: '',
			countryTwo: '',
		},
		paymentDue: '',
		paymentTerms: '',
		description: '',
		items: [
			{
				name: '',
				quantity: '',
				price: '',
			},
		],
	});

	console.log('Default', addFormData);

	const handleAddFormChange = (e) => {
		e.preventDefault();

		const fieldName = e.target.getAttribute('name');
		const fieldValue = e.target.value;

		// make a copy of the existing form data
		const newFormData = { ...addFormData };
		// update the object with the new data the user has typed
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	const addItemList = () => {
		// grabs the existing items
		setAddFormData([...addFormData, { name: '', quantity: '', price: '' }]);
	};

	const onSubmit = (data) => {
		console.log(data);

		const newInvoice: InvoiceProps = {
			id: nanoid().slice(0, 6),
			slug: nanoid().slice(0, 6),
			createdAt: date,
			paymentDue: addFormData.paymentDue,
			description: addFormData.description,
			paymentTerms: addFormData.paymentTerms,
			clientsName: addFormData.clientsName,
			clientsEmail: addFormData.clientsEmail,
			status: 'pending',
			senderAddress: {
				streetOne: addFormData.streetOne,
				cityOne: addFormData.cityOne,
				postCodeOne: addFormData.postCodeOne,
				countryOne: addFormData.countryOne,
			},
			clientAddress: {
				streetTwo: addFormData.streetTwo,
				cityTwo: addFormData.cityTwo,
				postCodeTwo: addFormData.postCodeTwo,
				countryTwo: addFormData.countryTwo,
			},
			items: [
				{
					name: addFormData.name,
					quantity: addFormData.quantity,
					price: addFormData.price,
				},
			],
			total: addFormData.total,
		};

		// create a new inoice array to avoid mutating the state
		const newInvoices = [...invoices, newInvoice];
		setInvocies(newInvoices);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="form background">
				<h2 className="form--title text--one">New Invoice</h2>
				<div className="form__scroll">
					<h3 className="form--title-subhead">Bill From</h3>
					<div className="flex form__flex-space">
						<TextField
							formSize="input--large"
							type="text"
							className="display--none"
							htmlFor="streetOne"
							label="Street Address"
							placeholder="19 Union Terrace"
							{...register('streetOne', {
								required: 'Street Address is required',
							})}
							name="streetOne"
						/>
						{errors.streetOne && <span className="error">{errors.streetOne.message}</span>}
						<div className="flex form__flex-gap">
							<TextField
								formSize="input--small"
								type="text"
								htmlFor="cityOne"
								placeholder="London"
								label="City"
								{...register('cityOne', {
									required: 'Required',
								})}
								name="cityOne"
							/>
							<TextField
								formSize="input--small"
								htmlFor="postCodeOne"
								label="Post Code"
								placeholder="E1 3EZ"
								{...register('postCodeOne', {
									required: 'Required',
								})}
								name="postCodeOne"
							/>
							<TextField
								formSize="input--small"
								htmlFor="countryOne"
								label="Country"
								placeholder="United Kingdom"
								{...register('countryOne', {
									required: 'Required',
								})}
								name="countryOne"
							/>
						</div>
					</div>
					<div className="form__flex-space">
						<h3 className="form--title-subhead">Bill To</h3>
						<div className="flex form__flex-gap form__flex-column">
							<TextField
								htmlFor="clientsName"
								label="Client's Name"
								formSize="input--large"
								type="text"
								placeholder="Alex Grim"
								{...register('clientsName', {
									required: 'Required',
								})}
								name="clientsName"
							/>
							<TextField
								htmlFor="clientsEmail"
								label="Client's Email"
								type="text"
								formSize="input--large"
								placeholder="alexgrim@gmail.com"
								{...register('clientsEmail', {
									required: 'Required',
								})}
								name="clientsEmail"
							/>
							<TextField
								className="input--large"
								htmlFor="streetTwo"
								label="Street Address"
								type="text"
								formSize="input--large"
								placeholder="84 Church Way"
								{...register('streetTwo', {
									required: 'Required',
								})}
								name="streetTwo"
							/>
							<div className="flex form__flex-gap">
								<TextField
									formSize="input--small"
									htmlFor="cityTwo"
									label="City"
									placeholder="Bradford"
									{...register('cityTwo', {
										required: 'Required',
									})}
									name="cityTwo"
								/>
								<TextField
									formSize="input--small"
									htmlFor="postCodeTwo"
									label="Post Code"
									placeholder="BD1 9PB"
									{...register('postCodeTwo', {
										required: 'Required',
									})}
									name="postCodeTwo"
								/>
								<TextField
									formSize="input--small"
									htmlFor="countryTwo"
									label="Country"
									placeholder="United Kingdom"
									{...register('countryTwo', {
										required: 'postCodeTwo',
									})}
									name="countryTwo"
								/>
							</div>
						</div>
					</div>
					<div>
						<div className="flex form__terms">
							<TextField
								formSize="input--medium"
								type="date"
								htmlFor="paymentDue"
								label="Invoice Date"
								{...register('paymentDue', {
									required: 'paymentDue',
								})}
								name="paymentDue"
							/>
							<div className="input__payment-terms">
								<label className="body--medium input--label-text" htmlFor="payment-terms">
									Payment Terms
								</label>
								<select
									className="select select__background input--medium"
									id="payment-terms"
									{...register('paymentTerms', {
										required: 'paymentTerms',
									})}
									name="paymentTerms"
								>
									<option value="1">Net 1 Day</option>
									<option value="7">Net 7 Day</option>
									<option value="14">Net 14 Days</option>
									<option value="30">Net 30 Days</option>
								</select>
							</div>
						</div>
						<TextField
							htmlFor="projectDescription"
							label="Project Description"
							type="text"
							placeholder="Graphic Design Service"
							{...register('projectDescription', {
								required: 'projectDescription',
							})}
							name="projectDescription"
						/>
					</div>
					<div className="item__list">
						<span className="item--list-header">Item List</span>
						<div className="flex form__flex-column">
							<div className="flex item__list-subheaders">
								<div>
									<span className="body--medium">Item Name</span>
									<TextField
										formSize="input--item"
										htmlFor="itemName"
										type="text"
										placeholder="Banner Design"
										{...register('itemName', {
											required: 'itemName',
										})}
										name="itemName"
									/>
								</div>
								<div>
									<span className="body--medium ">Qty.</span>
									<TextField
										type="number"
										formSize="input--qty"
										htmlFor="quantity"
										placeholder="1"
										{...register('quantity', {
											required: 'quantity',
										})}
										name="quantity"
									/>
								</div>
								<div>
									<span className="body--medium ">Price</span>
									<TextField
										type="number"
										formSize="input--price"
										htmlFor="price"
										placeholder="156.00"
										{...register('price', {
											required: 'price',
										})}
										name="price"
									/>
								</div>
								<div className="flex">
									<span className="body--medium">Total</span>
									<div className="flex input__total-spot">
										<span className="input--total body--medium">156.00</span>
										<Image className="total--delete" src={Delete} alt="Delete Icon" />
									</div>
								</div>
							</div>
							<Button onClick={() => addItemList()} type="submit" buttonStyle="btn--style-four" buttonSize="btn--size-five">
								+ Add New Item
							</Button>
						</div>
					</div>
				</div>
				<div className="form__bottom-buttons flex">
					<div className="form__discard-right">
						<Button onClick={discardForm} buttonStyle="btn--style-six" buttonSize="btn--size-four">
							Discard
						</Button>
					</div>
					<div className="form__draft">
						<Button buttonStyle="btn--style-three" buttonSize="btn--size-two">
							Save as Draft
						</Button>
					</div>
					<Button type="submit" buttonStyle="" buttonSize="btn--size-two">
						Save & Send
					</Button>
				</div>
			</form>
		</>
	);
};

export default Form;
