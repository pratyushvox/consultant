export interface Payment {
  id: number
  invoiceNumber: string
  applicant: string
  paymentType: string
  description: string
  amount: number
  paid: number
  due: number
  status: "Paid" | "Remaining" | "Unpaid"
  invoiceDate: string
  paymentMethod?: string ;
}
