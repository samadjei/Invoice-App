export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Items {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceProps {
  id: string;
  slug: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address[];
  clientAddress: Address[];
  items: Items[];
  total: number;
}