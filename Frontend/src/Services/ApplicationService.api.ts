import type { Applicant } from "@/types/applicants";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchApplicants(): Promise<Applicant[]> {
  const res = await fetch(`${BASE_URL}/applicants`);
  if (!res.ok) throw new Error("Failed to fetch applicants");
  return res.json();
}

export async function updateApplicant(applicant: Applicant): Promise<Applicant> {
  const res = await fetch(`${BASE_URL}/applicants/${applicant.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicant),
  });
  if (!res.ok) throw new Error("Failed to update applicant");
  return res.json();
}

export async function deleteApplicant(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/applicants/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete applicant");
}
