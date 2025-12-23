import type { Applicant } from "@/types/applicants";

const STORAGE_KEY = "applicants";

async function initMockData() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const res = await fetch("/Data/applicantsData.json");
  if (!res.ok) throw new Error("Failed to fetch applicants");

  const data: Applicant[] = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function fetchApplicants(): Promise<Applicant[]> {
  await initMockData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export async function updateApplicant(applicant: Applicant): Promise<Applicant> {
  const list: Applicant[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updatedList = list.map(a => (a.id === applicant.id ? applicant : a));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  return applicant;
}

export async function deleteApplicant(id: number): Promise<void> {
  const list: Applicant[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const filtered = list.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
