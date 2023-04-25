import React from 'react';
import { invoice } from '../../src/components/Data';
import Link from 'next/link';
import Button from '../../src/components/ui/Button';
import Image from 'next/image';
import ArrowLeft from '../../public/assets/icon-arrow-left.svg';
import { useStateContext } from '../../src/hooks/context/StateContext';

export const getStaticProps = async ({ params }) => {
	const invoices = invoice.filter((p) => p.slug === params.id);
	return {
		props: {
			items: invoices[0],
		},
	};
};

export const getStaticPaths = async () => {
	const paths = invoice.map((items) => ({
		params: { id: items.slug },
	}));
	return { paths, fallback: false };
};

const InvoiceDetails = ({ items }) => {
	// console.log(Object.entries(items.items).map((x) => console.log(x[1])));

	const { theme } = useStateContext();

	return (
		<main className={theme}>
			<div className="invoiceDetails">
				<div className="container">
					<Link href="/">
						<Image className="invoiceDetails--back-icon" src={ArrowLeft} alt="Arrow Left Icon" />
						<span className="invoiceDetails--back-text h3--small">Go back</span>
					</Link>
					<div className="flex invoiceDetails__upper background--two">
						<div className="invoiceDetails__status">
							<span className="body--medium invoiceDetails__status--text">Status</span>
							<div className="invoices__status invoices--paid">
								<span className="invoices--dot invoices--dot-paid"></span>
								<span className="invoices__status-text">{items.status}</span>
							</div>
						</div>
						<div className="invoiceDetails__buttons-flex">
							<Button buttonStyle="btn--style-two" buttonSize="btn--size-three">
								Edit
							</Button>
							<Button buttonStyle="btn--style-five" buttonSize="btn--size-four">
								Delete
							</Button>
							<Button buttonSize="btn--size-two">Mark as Paid</Button>
						</div>
					</div>
					{/* Bottom */}
					<div className="invoiceDetails__bottom">
						<div className="invoiceDetails__bottom-header">
							<div className="invoiceDetails__id">
								<span className="form--title text--one">
									<span className="text--two">#</span>
									{items.id}
								</span>
								<span className="body--medium invoiceDetails--description">{items.description}</span>
							</div>
							<div className="invoiceDetails__address body--medium-2">
								{Object.entries(items.senderAddress).map((sender, index) => (
									<span key={index}>{sender[1]}</span>
								))}
							</div>
						</div>
						<div className="invoiceDetails__content-base">
							<div>
								<div className="invoiceDetails__content-flex">
									<span className="body--medium inoviceDetails--subhead invoiceDetails--purple">Invoice Date</span>
									<span className="invoiceDetails--bold-headers">{items.createdAt}</span>
								</div>
								<div className="invoiceDetails__content-flex invoiceDetails__payment-due">
									<span className="body--medium inoviceDetails--subhead invoiceDetails--purple">Payment Due</span>
									<span className="invoiceDetails--bold-headers">{items.paymentDue}</span>
								</div>
							</div>
							<div className="invoiceDetails__content-flex">
								<span className="body--medium inoviceDetails--subhead invoiceDetails--purple">Bill To</span>
								<span className="invoiceDetails--bold-headers">{items.clientName}</span>
								<div className="invoiceDetails__clientAddress body--medium-2">
									{Object.entries(items.clientAddress).map((sender, index) => (
										<span key={index}>{sender[1]}</span>
									))}
								</div>
							</div>
							<div>
								<span className="body--medium inoviceDetails--subhead invoiceDetails--purple">Sent to</span>
								<div className="invoiceDetails--bold-headers">{items.clientEmail}</div>
							</div>
						</div>
						<div className="inoviceDetails__items">
							<table className="invoiceDetails__table">
								<tr>
									<th className="body--medium-2 invoiceDetails--purple">Item Name</th>
									<th className="body--medium-2 invoiceDetails--purple">Qty.</th>
									<th className="body--medium-2 invoiceDetails--purple">Price</th>
									<th className="body--medium-2 invoiceDetails--purple">Total</th>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default InvoiceDetails;
