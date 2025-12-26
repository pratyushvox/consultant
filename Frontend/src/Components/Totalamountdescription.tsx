import type { Payment } from "@/types/payment";
import { Badge } from "@/Components/ui/badge";

interface TotalAmountDetailsProps {
  payments: Payment[];
}

const TotalAmountDetails = ({ payments }: TotalAmountDetailsProps) => {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.reduce((sum, p) => sum + p.paid, 0);
  const remainingAmount = totalAmount - paidAmount;

  // Status breakdown
  const statusCount = payments.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    { Paid: 0, Remaining: 0, Unpaid: 0 }
  );

  // Payment method breakdown
  const paymentMethodCount = payments.reduce((acc, p) => {
    const method = p.PaymentMethod || "Not specified";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Totals */}
      <div className="space-y-1">
        <p><strong>Total Amount:</strong> Rs{totalAmount}</p>
        <p><strong>Paid Amount:</strong> Rs{paidAmount}</p>
        <p><strong>Remaining Amount:</strong> Rs{remainingAmount}</p>
        <p><strong>Total Invoices:</strong> {payments.length}</p>
      </div>

      {/* Status breakdown */}
      <div>
        <h4 className="font-semibold mb-1">Status Breakdown:</h4>
        <ul className="ml-4 list-disc">
          <li>Paid: {statusCount.Paid}</li>
          <li>Remaining: {statusCount.Remaining}</li>
          <li>Unpaid: {statusCount.Unpaid}</li>
        </ul>
      </div>

      {/* Payment method breakdown */}
      <div>
        <h4 className="font-semibold mb-1">Payment Methods:</h4>
        <ul className="ml-4 list-disc">
          {Object.keys(paymentMethodCount).map((method) => (
            <li key={method}>
              {method}: {paymentMethodCount[method]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TotalAmountDetails;
