import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/Components/ui/card";

interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatsCard = ({ title, icon, count }: StatsCardProps) => {
  return (
    <Card className="h-29 hover:shadow-lg transition-shadow">
      <div className=" flex flex-col justify-between px-3">
        
        {/* Top row */}
        <div className="flex justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>

          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Count */}
        <div className="text-3xl font-bold leading-none">
          {count}
        </div>

      </div>
    </Card>
  );
};

export default StatsCard; 

