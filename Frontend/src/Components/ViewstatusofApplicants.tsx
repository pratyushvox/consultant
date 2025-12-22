
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VisaStatusSectionProps {
  visaStatusData: { status: string; count: number }[];
}

const VisaStatusSection: React.FC<VisaStatusSectionProps> = ({ visaStatusData }) => {
  const hasData = visaStatusData.some((item) => item.count > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa Status of Applicants</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-6">
            {visaStatusData.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.status}</span>
                <span className="text-2xl font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No visa status data available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default VisaStatusSection;