import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import FormCard from "@/Components/FormCard"
import FormField from "@/Components/Common/FormFiled"

import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

import type { Payment } from "@/types/payment"
import { updatePayment } from "@/Services/Payment/PaymentService"

interface EditPaymentProps {
  payment: Payment
  onSave: (data: Payment) => void
  onCancel: () => void
}

const EditPayment = ({ payment, onSave, onCancel }: EditPaymentProps) => {
  const [form, setForm] = useState<Payment>(payment)
  const [saving, setSaving] = useState(false)

  /* Auto calculate due & status */
  useEffect(() => {
    const paid = Number(form.paid) || 0
    const amount = Number(form.amount) || 0
    const due = Math.max(amount - paid, 0)

    let status: Payment["status"] = "Unpaid"
    if (paid === 0) status = "Unpaid"
    else if (due === 0) status = "Paid"
    else status = "Remaining"

    setForm((prev) => ({
      ...prev,
      due,
      status,
    }))
  }, [form.paid, form.amount])

  const updateField = (key: keyof Payment, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updatePayment(form)
      onSave(updated)
      toast.success("Payment updated successfully")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update payment")
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormCard
      title="Edit Payment"
      subtitle={`Invoice: ${payment.invoiceNumber}`}
      footer={
        <>
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            className="bg-[#45d59e] hover:bg-[#3cb58a]"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </>
      }
    >
      {/* BASIC INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Invoice Number">
          <Input value={form.invoiceNumber} disabled />
        </FormField>

        <FormField label="Applicant">
          <Input value={form.applicant} disabled />
        </FormField>

        <FormField label="Payment Type">
          <Input
            value={form.paymentType}
            onChange={(e) => updateField("paymentType", e.target.value)}
          />
        </FormField>

        <FormField label="Payment Method">
          <Select
            value={form.PaymentMethod || ""}
            onValueChange={(value) =>
              updateField("PaymentMethod", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="QR">QR</SelectItem>
              <SelectItem value="Bank">Bank</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </section>

      {/* AMOUNT INFO */}
      <section className="grid grid-cols-3 gap-4">
        <FormField label="Total Amount">
          <Input
            type="number"
            value={form.amount}
            onChange={(e) =>
              updateField("amount", Number(e.target.value))
            }
          />
        </FormField>

        <FormField label="Paid Amount">
          <Input
            type="number"
            value={form.paid}
            onChange={(e) =>
              updateField("paid", Number(e.target.value))
            }
          />
        </FormField>

        <FormField label="Due Amount">
          <Input value={form.due} disabled />
        </FormField>
      </section>

      {/* STATUS & DATE */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Status">
          <Input value={form.status} disabled />
        </FormField>

        <FormField label="Invoice Date">
          <Input
            type="date"
            value={form.invoiceDate}
            onChange={(e) =>
              updateField("invoiceDate", e.target.value)
            }
          />
        </FormField>
      </section>

      {/* DESCRIPTION */}
      <FormField label="Description">
        <Textarea
          value={form.description}
          onChange={(e) =>
            updateField("description", e.target.value)
          }
        />
      </FormField>
    </FormCard>
  )
}

export default EditPayment
