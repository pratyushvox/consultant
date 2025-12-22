import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/Services/DashboardService";
import type { DashboardData } from "@/types/dashboard";


import StatsCard from "@/Components/StatsCard";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import {
  Users,
  Phone,
  GraduationCap,
  Plane,
  BookOpen,
  CheckSquare,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import VisaStatusSection from "@/Components/ViewstatusofApplicants";
import { ConversionsChart} from "@/Components/ConversionChart"

const iconMap = [
  <Users className="h-5 w-5 text-blue-600" />,
  <Clock className="h-5 w-5 text-orange-600" />,
  <Phone className="h-5 w-5 text-green-600" />,
  <GraduationCap className="h-5 w-5 text-red-600" />,
  <Plane className="h-5 w-5 text-purple-600" />,
  <BookOpen className="h-5 w-5 text-yellow-600" />,
  <CheckSquare className="h-5 w-5 text-indigo-600" />,
  <AlertCircle className="h-5 w-5 text-pink-600" />,
];

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to CloveCMS, Off & Associates
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-16" />
                </CardContent>
              </Card>
            ))
          : data?.statsCards.map((card, index) => (
              <StatsCard
                key={card.id}
                title={card.title} 
                count={card.count}
                icon={iconMap[index]}
                
              />
            ))}
      </div>
     <div className="grid gap-8 lg:grid-cols-2">
        {loading ? (
          <>
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </>
        ) : (
          <>
            <VisaStatusSection visaStatusData={data!.visaStatusData} />
            < ConversionsChart 
            conversionsData={data!.conversionsData}
            counselors={data!.counselors}  />
            
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
