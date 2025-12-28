import FormCard from "@/Components/FormCard";
import FormField from "@/Components/Common/FormFiled";

import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/getInititals";
import type { Applicant } from "@/Services/ApplicantService";

interface ApplicantProfileViewProps {
  applicant: Applicant;
}

const ApplicantProfileView = ({ applicant }: ApplicantProfileViewProps) => {
  return (
    <FormCard
      title={applicant.name}
      subtitle={applicant.email}
      headerRight={
        <div className="flex items-center gap-3">
          <Avatar className="w-20 h-20 text-white">
            <AvatarFallback className="bg-green-400 font-bold text-2xl flex items-center justify-center">
              {getInitials(applicant.name)}
            </AvatarFallback>
          </Avatar>

          <Badge
            variant={
              applicant.status === "Accepted"
                ? "success"
                : applicant.status === "Rejected"
                ? "destructive"
                : "secondary"
            }
          >
            {applicant.status}
          </Badge>
        </div>
      }
    >
      {/* PERSONAL INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Phone">{applicant.phone}</FormField>
        <FormField label="Gender">{applicant.gender}</FormField>
        <FormField label="Date of Birth">{applicant.dateOfBirth}</FormField>
        <FormField label="Passport Number">{applicant.passportNumber}</FormField>
        <FormField label="Citizenship">{applicant.citizenship}</FormField>
      </section>

      {/* ACADEMIC INFO */}
      <section className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Highest Qualification">{applicant.highestQualification}</FormField>
        <FormField label="Interested Course">{applicant.interestedCourse}</FormField>
        <FormField label="Interested Country">{applicant.interestedCountry}</FormField>
        <FormField label="City">{applicant.city}</FormField>
      </section>

      {/* GUARDIAN INFO */}
      <section className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Guardian Name">{applicant.guardian.guardianName}</FormField>
        <FormField label="Guardian Phone">{applicant.guardian.guardianPhone}</FormField>
        <FormField label="Guardian Relation">{applicant.guardian.guardianRelation}</FormField>
      </section>

      {/* FINANCIAL INFO */}
      <section className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Budget Required">{applicant.budgetRequired}</FormField>
        <FormField label="Financial Capacity">{applicant.financialCapacity}</FormField>
        <FormField label="Preferred Intake">{applicant.preferredIntake}</FormField>
      </section>

      {/* REMARKS */}
      <div className="mt-4">
        <FormField label="Evaluation Remarks" >
        {applicant.remarks || "N/A"}
      </FormField>



      </div>
      
      {/* DOCUMENTS */}
      <div className="mt-4">
        <FormField label="Documents" >
        <div className="flex flex-wrap gap-2">
          {applicant.documents.map((doc) => (
            <Badge
              key={doc}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => window.open(doc, "_blank")}
            >
              {doc.split("/").pop() || doc}
            </Badge>
          ))}
        </div>
      </FormField>

      </div>
      
    </FormCard>
  );
};

export default ApplicantProfileView;
