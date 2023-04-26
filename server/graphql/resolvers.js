// Holds the functionality behind any code defined in the typeDefs
// The resolver is how do you create the invoice and return the invoice

import Invoice from "../models/Invoice.js";

export const resolvers = {
  // Return by id
  Query: {
    // expecting an id for its first parameter - wait for mongoose to give us a response to us attempting to retrieve an invoice based of the id in our data and return the invoice
    async invoice(_, { ID }) {
      return await Invoice.findById(ID);
    },
  },
  // Return all invoices
  Query: {
    async invoices() {
      const invoices = await Invoice.find();
      if (!invoices) {
        throw new Error("Failed to retrieve invoices");
      }
      return invoices;
    },
  },
  Mutation: {
    async addInvoice(
      _,
      {
        invoiceInput: {
          id,
          slug,
          createdAt,
          paymentDue,
          description,
          paymentTerms,
          clientName,
          clientEmail,
          status,
          senderAddress,
          clientAddress,
          items,
          total,
        },
      }
    ) {
      // create the invoices based off the mongoose model
      const createdInvoice = new Invoice({
        id: id,
        slug: slug,
        createdAt: createdAt,
        paymentDue: paymentDue,
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        status: status,
        senderAddress,
        clientAddress,
        items: items,
        total: total,
      });

      // Save the newly created schema to our mongodb database
      const res = await createdInvoice.save(); // MongoDB Saving

      // Return the invoice to our apollo server resolver
      return {
        id: res.id,
        ...res._doc,
      };
    },
    // Delete based of an ID
    async deleteInvoice(_, { ID }) {
      // using a mongoose function to delete the invoice
      const wasDeleted = (await Invoice.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; //1 if somethign was deleted, 0 if nothing was deleted
    },
    async editInvoice(
      _,
      {
        ID,
        invoiceInput: {
          id,
          slug,
          createdAt,
          paymentDue,
          description,
          paymentTerms,
          clientName,
          clientEmail,
          status,
          senderAddress,
          clientAddress,
          items,
        },
      }
    ) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          {
            id: id,
            slug: slug,
            createdAt: createdAt,
            paymentDue: paymentDue,
            description: description,
            paymentTerms: paymentTerms,
            clientName: clientName,
            clientEmail: clientEmail,
            status: status,
            senderAddress,
            clientAddress,
            items: items,
          }
        )
      ).modifiedCount;
      return wasEdited; //1 if somethign was edited, 0 if nothing was edited
    },
  },
};
