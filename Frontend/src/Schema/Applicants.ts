import { z } from "zod";


export const addApplicantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  interestedCountry: z.string().min(1, "Interested Country is required"),
  interestedCourse: z.string().min(1, "Interested Course is required"),
  city: z.string().min(1, "City is required"),
  remarks: z.string().optional(),
});


export type AddApplicantInput = z.infer<typeof addApplicantSchema>;
