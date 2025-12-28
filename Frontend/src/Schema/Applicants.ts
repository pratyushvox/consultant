import { z } from "zod";


const academicRecordSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  qualification: z.string().min(1, "Qualification is required"),
  major: z.string().min(1, "Field / Major is required"),
  yearCompleted: z.number().min(1900, "Enter a valid year"),
  grade: z.string().min(1, "Grade / CGPA is required"),
});

const guardianSchema = z.object({
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianPhone: z.string().regex(/^[0-9]{10,15}$/, "Invalid guardian phone number"),
  guardianRelation: z.string().min(1, "Guardian relation is required"),
});

export const addApplicantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  interestedCountry: z.string().min(1, "Interested Country is required"),
  interestedCourse: z.string().min(1, "Interested Course is required"),
  city: z.string().min(1, "City is required"),
  highestQualification: z.string().min(1, "Highest Qualification is required"),
  academicHistory: z.array(academicRecordSchema).min(1, "At least one academic record is required"),
   passportNumber: z.string().min(1, "Passport number is required"),

citizenship: z.string().min(1, "Citizenship is required"),
   documents: z.array(z.string()).min(1, "At least one document is required"),
  guardian: guardianSchema,
  budgetRequired: z.string().optional(),
  financialCapacity: z.string().optional(),
  preferredIntake: z.string().optional(),
  remarks: z.string().optional(), 
});

export type AddApplicantInput = z.infer<typeof addApplicantSchema>;
