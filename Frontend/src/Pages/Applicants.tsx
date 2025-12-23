import { useEffect, useState } from "react";
import ReusableTable from "@/Components/ReusableTable";
import {
  TableRow,
  TableHead,
  TableCell,
} from "@/Components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/ui/dialog"

import { Badge } from "@/Components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import { fetchApplicants } from "@/Services/ApplicantService";
import ApplicantProfileView from "@/Components/ViewProfileCard";

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
  const [selectedApplicants , setSelectedApplicants] = useState<Applicant | null> (null);
  

  useEffect(() => {
    fetchApplicants().then(setData);
  }, []);

  return (
    <div className="p-6 space-y-6">
    
      <div>
        <h1 className="text-2xl font-semibold">Applicants</h1>
        <p className="text-sm text-muted-foreground">
          Manage your applicant database
        </p>
      </div>

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
            {data.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                  {app.name}
                </TableCell>
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
                      <DropdownMenuItem onClick={() =>setSelectedApplicants(app)}>

                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
            {
              selectedApplicants && (
                <Dialog open = {!!selectedApplicants} onOpenChange = {()=> setSelectedApplicants(null)}>

                  <DialogContent className = "sm:max-w-3xl w-full">
                    <DialogHeader>
                      <DialogTitle>Applicant profile</DialogTitle>
                      <DialogClose asChild>
                       
                      </DialogClose>
                    </DialogHeader>
                    <ApplicantProfileView applicant={selectedApplicants}/>
                  </DialogContent>
                </Dialog>
              )
            }
          </>
        }
      />
    </div>
  );
};

export default ApplicantsPage;
