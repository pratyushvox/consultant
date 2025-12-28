import { useEffect, useState } from "react";
import ReusableTable from "@/Components/ReusableTable";
import { TableRow, TableHead, TableCell } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select";

import { fetchPayments, deletePayment } from "@/Services/Payment/PaymentService";
import type { Payment } from "@/types/payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import TotalAmountDetails from "@/Components/Totalamountdescription";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/Components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import CreateInvoiceDialog from "@/Components/Createinvoice"
import ConfirmDialog from "@/Components/Confirmationdialogue";
import EditPayment from "@/Components/EditPayment";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterApplicant, setFilterApplicant] = useState<string>("All");
  const [openTotalDialog, setOpenTotalDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); 
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);


  


  useEffect(() => {
    fetchPayments().then(setPayments);
  }, []);


  const handleDeletePayment = async () => {
  if (!deleteTarget) return;

  await deletePayment(deleteTarget.id);

  setPayments((prev) =>
    prev.filter((p) => p.id !== deleteTarget.id)
  );

  setDeleteTarget(null);
};


  /* Filtered Payments */
  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.invoiceNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    const matchesApplicant = filterApplicant === "All" || p.applicant === filterApplicant;
    return matchesSearch && matchesStatus && matchesApplicant;
  });

  /* Pagination */
  const rowsPerPage = 6;
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* Totals */
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.reduce((sum, p) => sum + p.paid, 0);
  const remainingAmount = totalAmount - paidAmount;

  /* Table Header */
  const tableHeader = (
    <TableRow>
      <TableHead>Invoice No</TableHead>
      <TableHead>Applicant</TableHead>
      <TableHead>Payment Type</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Paid</TableHead>
      <TableHead>Due</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  );

  /* Table Body */
  const tableBody = paginatedPayments.length ? (
    paginatedPayments.map((payment) => (
      <TableRow key={payment.id}>
        <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
        <TableCell>{payment.applicant}</TableCell>
        <TableCell>{payment.paymentType}</TableCell>
        <TableCell>{payment.description}</TableCell>
        <TableCell>Rs{payment.amount}</TableCell>
        <TableCell>Rs{payment.paid}</TableCell>
       <TableCell>
  Rs{payment.due ?? payment.amount - payment.paid}
</TableCell>

        <TableCell>
          <Badge
            variant={
              payment.status === "Paid"
                ? "success"
                : payment.status === "Remaining"
                ? "warning"
                : "destructive"
            }
          >
            {payment.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() =>setEditPayment(payment)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
           <DropdownMenuItem
  className="text-red-600"
  onClick={() => setDeleteTarget(payment)}
>
  <Trash className="mr-2 h-4 w-4" /> Delete
</DropdownMenuItem>


            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} className="text-center text-muted-foreground">
        No payments found
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Payments</h1>
          <p className="text-sm text-muted-foreground">Manage invoices and payments</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-[#059669] hover: text-white flex items-center gap-2"
            onClick={() => setOpenCreateDialog(true)} // open dialog on click
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-4">
        <Card
          className="flex-1 text-center bg-gray-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setOpenTotalDialog(true)}
        >
          <CardHeader>
            <CardTitle>Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-semibold">Rs{totalAmount}</span>
          </CardContent>
        </Card>

        <Card className="flex-1 text-center bg-green-50">
          <CardHeader>
            <CardTitle>Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-semibold">Rs{paidAmount}</span>
          </CardContent>
        </Card>

        <Card className="flex-1 text-center bg-red-50">
          <CardHeader>
            <CardTitle>Remaining Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-semibold">Rs{remainingAmount}</span>
          </CardContent>
        </Card>

        <Dialog open={openTotalDialog} onOpenChange={setOpenTotalDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Total Amount Breakdown of this Month</DialogTitle>
            </DialogHeader>
            <TotalAmountDetails payments={payments} />
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-muted-foreground mt-2">
        Disclaimer: Click Total amount card above for a detailed breakdown of the total amount for this month.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Input
          placeholder="Search invoices..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Remaining">Remaining</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ReusableTable header={tableHeader} body={tableBody} />

      {/* Pagination */}
      <div className="w-full flex justify-end gap-3 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md px-4 py-1"
        >
          Prev
        </Button>
        <span className="px-3 py-1 text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md px-4 py-1"
        >
          Next
        </Button>
      </div>

      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <CreateInvoiceDialog
      onSuccess={() => {
        fetchPayments().then(setPayments);
        setOpenCreateDialog(false);
      }}
      onClose={() => setOpenCreateDialog(false)}
    />
  </DialogContent>
</Dialog>

{editPayment && (
  <Dialog
    open={!!editPayment}
    onOpenChange={(open) => {
      if (!open) setEditPayment(null);
    }}
  >
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Payment</DialogTitle>
      </DialogHeader>

      <EditPayment
        payment={editPayment}
        onCancel={() => setEditPayment(null)}
        onSave={(updated) => {
          setPayments((prev) =>
            prev.map((p) =>
              p.id === updated.id ? updated : p
            )
          );
          setEditPayment(null);
        }}
      />
    </DialogContent>
  </Dialog>
)}



 <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        onConfirm={handleDeletePayment}
      />

    </div>
  );
};

export default Payments;
