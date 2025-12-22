import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import {
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Timer,
} from "lucide-react";

interface VisaStatus {
  status: string;
  count: number;
}

interface VisaStatusSectionProps {
  visaStatusData: VisaStatus[];
}

const VisaStatusSection: React.FC<VisaStatusSectionProps> = ({
  visaStatusData,
}) => {
  const STATUS_CONFIG = {
    Approved: {
      color: "#10B981",
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    Pending: {
      color: "#F59E0B",
      icon: Clock,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
    },
    Rejected: {
      color: "#EF4444",
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  };

  // Calculate total
  const total = visaStatusData.reduce((sum, item) => sum + item.count, 0);

  // Calculate statistics
  const approvedCount =
    visaStatusData.find((s) => s.status === "Approved")?.count || 0;
  const successRate =
    total > 0 ? ((approvedCount / total) * 100).toFixed(1) : 0;
  const pendingCount =
    visaStatusData.find((s) => s.status === "Pending")?.count || 0;

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Visa Status of Applicants
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Total: {total} applications
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <TrendingUp size={16} />
            <span>{successRate}% Success</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Success Rate
              </span>
            </div>
            <p className="text-2xl font-bold text-green-900">{successRate}%</p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                Total Apps
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{total}</p>
          </div>

          <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">
                In Progress
              </span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
          </div>
        </div>

        {/* Status List with Progress Bars */}
        <div className="space-y-3">
          {visaStatusData.map((item) => {
            const config =
              STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
            const Icon = config?.icon || Users;
            const percentage =
              total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;

            return (
              <div
                key={item.status}
                className={`${config?.bgColor} rounded-xl p-4 border ${config?.borderColor} transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${config?.color}20` }}
                    >
                      <Icon size={20} style={{ color: config?.color }} />
                    </div>
                    <div>
                      <p className={`font-semibold ${config?.textColor}`}>
                        {item.status}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.count} applications
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: config?.color }}
                    >
                      {item.count}
                    </p>
                    <p className="text-xs text-gray-500">{percentage}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: config?.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Insight */}
        <div className="bg-linear-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-gray-800">
                Processing Overview
              </h4>
              <p className="text-xs text-gray-600">
                {approvedCount} applications approved with {successRate}%
                success rate.
                {pendingCount > 0 &&
                  ` ${pendingCount} applications currently under review.`}
                {total > 0 && ` Total of ${total} visa applications processed.`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaStatusSection;
