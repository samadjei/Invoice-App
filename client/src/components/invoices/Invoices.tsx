import React from 'react';
import { invoice } from '../Data';
import ArrowRight from '../../../public/assets/icon-arrow-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_INVOICES = gql`
	query InvoiceQuery {
		invoices {
			id
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

const Invoices = () => {
	const [statusText, setStatusText] = useState('paid');
	const [statusColour, setStatusColour] = useState('invoice--dot-draft');

	const { loading, error, data } = useQuery(GET_ALL_INVOICES);
	if (loading) return null;
	if (error) return 'Error: ' + error;

	const invoicey = data.invoices;
	console.log(data.invoices[0]);

	return (
		<div className="invoice">
			{invoice.map((item) => {
				return (
					<Link href={'/invoice/' + item.slug} className="invoices background--two" key={item.id}>
						<strong className="invoices--id text--one">
							<span className="invoices--hashtag">#</span>
							{item.id}
						</strong>
						<span className="text--two h3--small">Due {item.paymentDue}</span>
						<span className="text--two h3--small">{item.clientName}</span>
						<h3 className="text--one">£ {item.total.toLocaleString()}</h3>
						<div className="invoices__flex">
							<div className="invoices__status invoices--paid">
								<span className="invoices--dot invoices--dot-paid"></span>
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
