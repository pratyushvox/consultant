import ProfileCard from "@/Components/ProfileCard";
import ProfileField from "@/Components/Common/ProfileFiled";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/getInititals";
import type {Applicant} from "@/Services/ApplicantService"

interface ApplicantProfileViewProps {
  applicant: Applicant;
}

const ApplicantProfileView = ({ applicant }: ApplicantProfileViewProps) => {
  return (
    <ProfileCard
      title={applicant.name}
      subtitle={applicant.email}
      headerRight={
        <div className="flex items-center gap-3 ">
          <Avatar className="w-20 h-20  text-white">
            <AvatarFallback className=" bg-green-400 font-bold text-2xl flex items-center justify-center">
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
      <section className="  grid grid-cols-2 gap-4">
        <ProfileField label="Phone">{applicant.phone}</ProfileField>
        <ProfileField label="Gender">{applicant.gender}</ProfileField>
        <ProfileField label="Date of Birth">
          {applicant.dateOfBirth}
        </ProfileField>
        <ProfileField label="Passport Number">
          {applicant.passportNumber}
        </ProfileField>
      </section>

      {/* ACADEMIC INFO */}
      <section className="grid grid-cols-2 gap-4">
        <ProfileField label="Highest Qualification">
          {applicant.highestQualification}
        </ProfileField>
        <ProfileField label="Interested Course">
          {applicant.interestedCourse}
        </ProfileField>
        <ProfileField label="Interested Country">
          {applicant.interestedCountry}
        </ProfileField>
        <ProfileField label="City">{applicant.city}</ProfileField>
      </section>

      {/* ENGLISH TEST (OPTIONAL) */}
      {applicant.englishTest && (
        <section className="grid grid-cols-2 gap-4">
          <ProfileField label="English Test">
            {applicant.englishTest}
          </ProfileField>
          {applicant.overallScore !== undefined && (
            <ProfileField label="Overall Score">
              {applicant.overallScore}
            </ProfileField>
          )}
        </section>
      )}

      {/* META INFO */}
      <section className="grid grid-cols-2 gap-4">
        <ProfileField label="Applied Date">
          {applicant.appliedDate}
        </ProfileField>
        <ProfileField label="Address">
          {applicant.address}
        </ProfileField>
      </section>

      {/* REMARKS */}
      <ProfileField label="Remarks">
        {applicant.remarks}
      </ProfileField>

      {/* DOCUMENTS */}
      <ProfileField label="Documents">
        <div className="flex flex-wrap gap-2">
          {applicant.documents.map((doc) => (
            <Badge key={doc} variant="outline">
              {doc}
            </Badge>
          ))}
        </div>
      </ProfileField>
    </ProfileCard>
  );
};

export default ApplicantProfileView;
