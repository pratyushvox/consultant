import { z } from "zod";

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1),
  applicant: z.string().min(2, "Applicant name is required"),
  paymentType: z.string().min(1, "Payment type is required"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  paid: z.coerce.number().min(0),
  paymentMethod: z.string().min(1, "Payment method is required"),
  description: z.string().optional(),
  status: z.enum(["Paid", "Remaining", "Unpaid"]),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
