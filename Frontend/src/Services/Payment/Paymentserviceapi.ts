import type { Payment } from "@/types/payment"

const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchPayments(): Promise<Payment[]> {
  const res = await fetch(`${BASE_URL}/payments`)
  if (!res.ok) throw new Error("Failed to fetch payments")
  return res.json()
}

export async function addPayment(payment: Payment): Promise<Payment> {
  const res = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  })
  if (!res.ok) throw new Error("Failed to add payment")
  return res.json()
}

export async function updatePayment(payment: Payment): Promise<Payment> {
  const res = await fetch(`${BASE_URL}/payments/${payment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  })
  if (!res.ok) throw new Error("Failed to update payment")
  return res.json()
}

export async function deletePayment(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/payments/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete payment")
}
