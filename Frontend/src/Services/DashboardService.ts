import type { DashboardData } from "@/types/dashboard";

export async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch("/Data/dashboardData.json");

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}
