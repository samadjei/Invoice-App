import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import TextField from './TextField';
import Image from 'next/image';
import Delete from '../../../public/assets/icon-delete.svg';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { invoice } from '../Data';
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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const date = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());

	const onSubmit = (data: FormValues) => {
		console.log('Submitted data', data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="form background">
				<h2 className="form--title text--one">New Invoice</h2>
				<div className="form__scroll">
					<h3 className="form--title-subhead">Bill From</h3>
					<div className="flex form__flex-space">
						
						<TextField formSize="input--large" type="text" htmlFor="streetOne" label="Street Address" placeholder="19 Union Terrace" name="streetOne" register={register} />
						{/* <input htmlFor="countryOne" type="text" {...register('senderAddress.countryOne')} /> */}

						<div className="flex form__flex-gap">
							{/* <TextField
								formSize="input--small"
								id="cityOne"
								type="text"
								htmlFor="cityOne"
								placeholder="London"
								label="City"
								{...register('senderAddress.cityOne', {
									required: 'City is required',
								})}
								name="cityOne"
							/> */}
							{/* <TextField
								id="postCodeOne"
								formSize="input--small"
								htmlFor="postCodeOne"
								label="Post Code"
								type="text"
								placeholder="E1 3EZ"
								{...register('senderAddress.postCodeOne', {
									required: 'Required',
								})}
								name="postCodeOne"
							/> */}
							{/* <TextField
								formSize="input--small"
								htmlFor="countryOne"
								id="countryOne"
								type="text"
								label="Country"
								placeholder="United Kingdom"
								{...register('senderAddress.countryOne', {
									required: 'Required',
								})}
								name="countryOne"
							/> */}
						</div>
					</div>
					{/* <div className="form__flex-space">
						<h3 className="form--title-subhead">Bill To</h3>
						<div className="flex form__flex-gap form__flex-column">
							<TextField
								htmlFor="clientsName"
								label="Client's Name"
								formSize="input--large"
								type="text"
								placeholder="Alex Grim"
								{...register('clientName', {
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
								{...register('clientEmail', {
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
								{...register('clientAddress.streetTwo', {
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
									{...register('clientAddress.cityTwo', {
										required: 'Required',
									})}
									name="cityTwo"
								/>
								<TextField
									formSize="input--small"
									htmlFor="postCodeTwo"
									label="Post Code"
									placeholder="BD1 9PB"
									{...register('clientAddress.postCodeTwo', {
										required: 'Required',
									})}
									name="postCodeTwo"
								/>
								<TextField
									formSize="input--small"
									htmlFor="countryTwo"
									label="Country"
									placeholder="United Kingdom"
									{...register('clientAddress.countryTwo', {
										required: 'postCodeTwo',
									})}
									name="countryTwo"
								/>
							</div>
						</div>
					</div> */}
					{/* <div>
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
					</div> */}
					{/* <div className="item__list">
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
					</div> */}
				</div>
				<div className="form__bottom-buttons flex">
					{/* <div className="form__discard-right">
						<Button onClick={discardForm} buttonStyle="btn--style-six" buttonSize="btn--size-four">
							Discard
						</Button>
					</div>
					<div className="form__draft">
						<Button buttonStyle="btn--style-three" buttonSize="btn--size-two">
							Save as Draft
						</Button>
					</div> */}
					<Button type="submit" buttonStyle="" buttonSize="btn--size-two">
						Save & Send
					</Button>
				</div>
			</form>
		</>
	);
};

export default Form;
