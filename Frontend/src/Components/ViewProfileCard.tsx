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
        <FormField label="Date of Birth">
          {applicant.dateOfBirth}
        </FormField>
        <FormField label="Passport Number">
          {applicant.passportNumber}
        </FormField>
      </section>

      {/* ACADEMIC INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Highest Qualification">
          {applicant.highestQualification}
        </FormField>
        <FormField label="Interested Course">
          {applicant.interestedCourse}
        </FormField>
        <FormField label="Interested Country">
          {applicant.interestedCountry}
        </FormField>
        <FormField label="City">{applicant.city}</FormField>
      </section>

      {/* ENGLISH TEST (OPTIONAL) */}
      {applicant.englishTest && (
        <section className="grid grid-cols-2 gap-4">
          <FormField label="English Test">
            {applicant.englishTest}
          </FormField>
          {applicant.overallScore !== undefined && (
            <FormField label="Overall Score">
              {applicant.overallScore}
            </FormField>
          )}
        </section>
      )}

      {/* META INFO */}
      <section className="grid grid-cols-2 gap-4">
        <FormField label="Applied Date">
          {applicant.appliedDate}
        </FormField>
        <FormField label="Address">
          {applicant.address}
        </FormField>
      </section>

      {/* REMARKS */}
      <FormField label="Remarks">
        {applicant.remarks}
      </FormField>

      {/* DOCUMENTS */}
      <FormField label="Documents">
        <div className="flex flex-wrap gap-2">
          {applicant.documents.map((doc) => (
            <Badge key={doc} variant="outline">
              {doc}
            </Badge>
          ))}
        </div>
      </FormField>
    </FormCard>
  );
};

export default ApplicantProfileView;
