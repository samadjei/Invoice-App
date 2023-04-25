import { gql } from "apollo-server";

export const typeDefs = gql`
  type AddressType {
    street: String
    city: String
    postCode: String
    country: String
  }

  input AddressInput {
    street: String!
    city: String!
    postCode: String!
    country: String!
  }

  type ItemsType {
    name: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  input ItemsInput {
    name: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  type InvoiceType {
    id: ID!
    createdAt: String!
    paymentDue: String!
    description: String!
    paymentTerms: Int!
    clientName: String!
    clientEmail: String!
    status: String!
    senderAddress: AddressType!
    clientAddress: AddressType!
    items: [ItemsType!]!
    total: Float!
  }

  # Inputs - what the use is going to input from the client
  input InvoiceInput {
    id: ID!
    createdAt: String!
    paymentDue: String!
    description: String!
    paymentTerms: Int!
    clientName: String!
    clientEmail: String!
    status: String!
    senderAddress: AddressInput!
    clientAddress: AddressInput!
    items: [ItemsInput!]!
    total: Float!
  }

  # Query - getting information and reading the information
  type Query {
    "Get invoices"
    invoice(ID: ID!): InvoiceType!
    invoices: [InvoiceType!]!
  }

  type Mutation {
    # use the invoiceInput variable and make sure it's of InvoiceInput and returns InvoiceType
    addInvoice(invoiceInput: InvoiceInput): InvoiceType!
    # Delete invoice - delete based of an ID
    deleteInvoice(ID: ID!): Boolean
    # Edit invoice
    editInvoice(ID: ID!, invoiceInput: InvoiceInput): Boolean
  }
`;
