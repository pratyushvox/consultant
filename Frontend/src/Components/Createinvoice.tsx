import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createInvoiceSchema, type CreateInvoiceInput } from "@/schema/Payment";
import { addPayment } from "@/Services/Payment/PaymentService";
import { generateInvoiceNumber } from "@/lib/invoice";

import {
  Card, CardHeader, CardTitle, CardContent
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/Components/ui/select";

type Props = {
  onSuccess: () => void;
  onClose: () => void;
};

const CreateInvoiceDialog = ({ onSuccess, onClose }: Props) => {
  const [form, setForm] = useState<CreateInvoiceInput>({
    invoiceNumber: "",
    applicant: "",
    paymentType: "",
    description: "",
    paymentMethod: "",
    amount: 0,
    paid: 0,
    status: "Unpaid",
  });

  const [saving, setSaving] = useState(false);

  // Auto-generate invoice number
  useEffect(() => {
    const lastInvoice = localStorage.getItem("lastInvoiceNumber") || undefined;
    const nextInvoice = generateInvoiceNumber(lastInvoice);
    setForm(prev => ({ ...prev, invoiceNumber: nextInvoice }));
    localStorage.setItem("lastInvoiceNumber", nextInvoice);
  }, []);

  const updateField = (key: keyof CreateInvoiceInput, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Prepare payload with calculated due
      const payload: CreateInvoiceInput = {
        ...form,
        amount: Number(form.amount),
        paid: Number(form.paid),
        due: Number(form.amount) - Number(form.paid),
      };

      // Validate using zod schema
      const validatedData = createInvoiceSchema.parse(payload);

      // Call the mock API
      await addPayment(validatedData);

      toast.success("Invoice created successfully!");
      onSuccess();
      onClose();
    } catch (err: any) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="sm:max-w-3xl">
      <CardHeader>
        <CardTitle>Create Invoice</CardTitle>
      </CardHeader>

     <CardContent>
  <div className="space-y-4">
    {/* Invoice Number */}
    <div className="flex flex-col gap-2">
      <Label>Invoice No</Label>
      <Input value={form.invoiceNumber} disabled />
    </div>

    {/* Applicant */}
    <div className="flex flex-col gap-2">
      <Label>Applicant</Label>
      <Input
        value={form.applicant}
        onChange={e => updateField("applicant", e.target.value)}
      />
    </div>

    {/* Payment Type */}
    <div className="flex flex-col gap-2">
      <Label>Payment Type</Label>
      <Select
        value={form.paymentType}
        onValueChange={v => updateField("paymentType", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
          <SelectItem value="Application Fee">Application Fee</SelectItem>
          <SelectItem value="Service Charge">Service Charge</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Amount & Paid */}
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Label>Total</Label>
        <Input
          type="number"
          value={form.amount}
          onChange={e => updateField("amount", Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Paid</Label>
        <Input
          type="number"
          value={form.paid}
          onChange={e => updateField("paid", Number(e.target.value))}
        />
      </div>
    </div>

    {/* Payment Method */}
    <div className="flex flex-col gap-2">
      <Label>Payment Method</Label>
      <Select
        value={form.paymentMethod}
        onValueChange={v => updateField("paymentMethod", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Cash">Cash</SelectItem>
          <SelectItem value="Bank">Bank</SelectItem>
          <SelectItem value="Online">Online</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Description */}
    <div className="flex flex-col gap-2">
      <Label>Description</Label>
      <Textarea
        value={form.description}
        onChange={e => updateField("description", e.target.value)}
      />
    </div>

    {/* Status */}
    <div className="flex flex-col gap-2">
      <Label>Status</Label>
      <Select
        value={form.status}
        onValueChange={v => updateField("status", v)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Paid">Paid</SelectItem>
          <SelectItem value="Remaining">Remaining</SelectItem>
          <SelectItem value="Unpaid">Unpaid</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onClose} disabled={saving}>
        Cancel
      </Button>
      <Button className="bg-[#059669] text-white" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Create Invoice"}
      </Button>
    </div>
  </div>
</CardContent>

    </Card>
  );
};

export default CreateInvoiceDialog;
