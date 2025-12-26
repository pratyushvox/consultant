
export const generateInvoiceNumber = (lastInvoice?: string) => {
  const prefix = "INV-";
  const lastNumber = lastInvoice
    ? parseInt(lastInvoice.replace(prefix, ""), 10)
    : 0;

  const nextNumber = lastNumber + 1;
  return `${prefix}${String(nextNumber).padStart(4, "0")}`;
};
