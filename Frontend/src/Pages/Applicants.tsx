import { useEffect, useState } from "react";
import ReusableTable from "@/Components/ReusableTable";
import { TableRow, TableHead, TableCell } from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/Components/ui/dialog";

import { Badge } from "@/Components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash, Plus } from "lucide-react";
import { fetchApplicants } from "@/Services/ApplicantService";
import ApplicantProfileView from "@/Components/ViewProfileCard";
import ApplicantProfileEdit from "@/Components/EditProfileCard";
import AddApplicantDialog from "@/Components/AddApplicants";
import type { AddApplicantInput } from "@/Schema/Applicants";
import { Input } from "@/Components/ui/input";

interface Applicant {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Pending" | "Accepted" | "Rejected";
  interestedCountry: string;
  interestedCourse: string;
  city: string;
}

const ApplicantsPage = () => {
  const [data, setData] = useState<Applicant[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<Applicant | null>(null);
  const [editApplicant, setEditApplicant] = useState<Applicant | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // Filter applicants by search text
  const filteredData = data.filter((app) =>
    app.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const rowsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleUpdateApplicant = (updated: Applicant) => {
    setData((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditApplicant(null);
  };

  const handleAddApplicant = (newApplicant: AddApplicantInput) => {
    setData((prev) => [
      ...prev,
      {
        id: prev.length + 1, // simple incremental id
        status: "Pending",
        ...newApplicant,
      },
    ]);
  };

  useEffect(() => {
    fetchApplicants().then(setData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header with search + add button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Applicants</h1>
          <p className="text-sm text-muted-foreground">
            Manage your applicant database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search applicants by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />
          <Button
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add Applicant
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-14">
        <ReusableTable
          header={
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interested Country</TableHead>
              <TableHead>Interested Course</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          }
          body={
            <>
              {paginatedData.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === "Accepted"
                          ? "success"
                          : app.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.interestedCountry}</TableCell>
                  <TableCell>{app.interestedCourse}</TableCell>
                  <TableCell>{app.city}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedApplicants(app)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditApplicant(app)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          }
        />
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center items-center gap-3 mt-4">
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md px-4 py-1"
        >
          Next
        </Button>
      </div>

      {/* View Dialog */}
      {selectedApplicants && (
        <Dialog
          open={!!selectedApplicants}
          onOpenChange={() => setSelectedApplicants(null)}
        >
          <DialogContent className="sm:max-w-3xl w-full">
            <DialogHeader>
              <DialogTitle>Applicant profile</DialogTitle>
              <DialogClose asChild></DialogClose>
            </DialogHeader>
            <ApplicantProfileView applicant={selectedApplicants} />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editApplicant && (
        <Dialog open={!!editApplicant} onOpenChange={() => setEditApplicant(null)}>
          <DialogContent className="sm:max-w-3xl w-full">
            <DialogHeader>
              <DialogTitle>Edit Applicant Profile</DialogTitle>
            </DialogHeader>
            <ApplicantProfileEdit
              applicant={editApplicant}
              onSave={handleUpdateApplicant}
              onCancel={() => setEditApplicant(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Add Dialog */}
      <AddApplicantDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddApplicant}
      />
    </div>
  );
};

export default ApplicantsPage;
