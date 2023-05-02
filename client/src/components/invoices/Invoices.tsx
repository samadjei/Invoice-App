import React from 'react';
import { invoice } from '../Data';
import ArrowRight from '../../../public/assets/icon-arrow-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';

const GET_ALL_INVOICES = gql`
	query InvoiceQuery {
		invoices {
			id
			slug
			createdAt
			paymentDue
			description
			paymentTerms
			clientName
			clientEmail
			status
			senderAddress {
				street
				city
				postCode
				country
			}
			clientAddress {
				street
				city
				postCode
				country
			}
			items {
				name
				quantity
				price
				total
			}
			total
		}
	}
`;

// interface InvoicesProps {

// }

const Invoices = () => {
	const [statusText, setStatusText] = useState('paid');
	const [statusColour, setStatusColour] = useState('invoice--dot-draft');

	const { loading, error, data } = useQuery(GET_ALL_INVOICES);
	if (loading) return null;
	if (error) return 'Error: ' + error;

	const invoicey = data.invoices;

	function convertToDate(date: string) {
		const convertedDate = new Date(parseInt(date));
		const formatDate = format(convertedDate, 'dd MMM yyyy');
		return formatDate;
	}

	interface Address {
		street: string;
		city: string;
		postCode: string;
		country: string;
	}

	interface Items {
		name: string;
		quantity: number;
		price: number;
		total: number;
	}

	interface InvoiceProps {
		id: string;
		slug: string;
		createdAt: string;
		paymentDue: string;
		description: string;
		paymentTerms: number;
		clientName: string;
		clientEmail: string;
		status: string;
		senderAddress: Address;
		clientAddress: Address;
		items: Items;
		total: number;
	}

	function getStatusColour(itemStatus: string) {
		let statusColour: string;
		let statusDot: string;
		if (itemStatus === 'pending') {
			statusColour = 'invoices--pending';
			statusDot = 'invoices--dot-pending';
		} else if (itemStatus === 'paid') {
			statusColour = 'invoices--paid';
			statusDot = 'invoices--dot-paid';
		} else {
			statusColour = 'invoices--draft';
			statusDot = 'invoices--dot-draft';
		}

		// return [statusColour, statusDot];
		return statusColour;
	}
	function getStatusDotColour(itemStatus: string) {
		let statusDot: string;
		if (itemStatus === 'pending') {
			statusDot = 'invoices--dot-pending';
		} else if (itemStatus === 'paid') {
			statusDot = 'invoices--dot-paid';
		} else {
			statusDot = 'invoices--dot-draft';
		}
		return statusDot;
	}

	return (
		<div className="invoice">
			{invoice.map((item: InvoiceProps) => {
				return (
					<Link href={'/invoice/' + item.slug} className="invoices background--two" key={item.id}>
						<strong className="invoices--id text--one">
							<span className="invoices--hashtag">#</span>
							{item.id}
						</strong>
						<span className="text--two h3--small">Due {convertToDate(item.paymentDue)}</span>
						<span className="text--two h3--small">{item.clientName}</span>
						<h3 className="text--one">£ {item.total.toLocaleString()}</h3>
						<div className="invoices__flex">
							<div className={`invoices__status ${getStatusColour(item.status)}`}>
								<span className={`invoices--dot ${getStatusDotColour(item.status)}`}></span>
								<span className="invoices__status-text">{item.status}</span>
							</div>
							<Image className="invoices__arrow-right" src={ArrowRight} alt="Invoice App Logo" />
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Invoices;
