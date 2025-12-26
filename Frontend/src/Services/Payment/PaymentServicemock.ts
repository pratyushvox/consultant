import type { Payment } from "@/types/payment"

const STORAGE_KEY = "payments"

async function initMockData() {
  if (localStorage.getItem(STORAGE_KEY)) return

  const res = await fetch("/Data/paymentData.json")
  if (!res.ok) throw new Error("Failed to fetch payments")

  const data: Payment[] = await res.json()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export async function fetchPayments(): Promise<Payment[]> {
  await initMockData()
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

export async function addPayment(payment: Payment): Promise<Payment> {
  const list: Payment[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  )

  const newPayment = {
    ...payment,
    id: list.length ? list[list.length - 1].id + 1 : 1,
  }

  list.push(newPayment)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return newPayment
}

export async function updatePayment(payment: Payment): Promise<Payment> {
  const list: Payment[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  )

  const updatedList = list.map(p =>
    p.id === payment.id ? payment : p
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
  return payment
}

export async function deletePayment(id: number): Promise<void> {
  const list: Payment[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  )

  const filtered = list.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
