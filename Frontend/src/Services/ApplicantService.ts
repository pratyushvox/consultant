 export interface Applicant {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Pending" | "Accepted" | "Rejected";
  interestedCountry: string;
  interestedCourse: string;
  city: string;

  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  highestQualification: string;

  englishTest?: string;
  overallScore?: number;

  appliedDate: string;
  remarks: string;
  address: string;
  documents: string[];
}


export async function fetchApplicants(): Promise<Applicant[]> {
  const res = await fetch("/Data/applicantsData.json"); 

  if (!res.ok) {
    throw new Error("Failed to fetch applicants");
  }

  return res.json();
}


