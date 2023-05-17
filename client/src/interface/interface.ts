export interface AddressOne {
  streetOne: string;
  cityOne: string;
  postCodeOne: string;
  countryOne: string;
}
export interface AddressTwo {
  streetTwo: string;
  cityTwo: string;
  postCodeTwo: string;
  countryTwo: string;
}

export interface Items {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
}

export type InvoiceInputs = {
  id?: string;
  slug?: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: AddressOne[];
  clientAddress: AddressTwo[];
  items: Items[];
  total: number;
}