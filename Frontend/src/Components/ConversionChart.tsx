import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Calendar, TrendingUp } from 'lucide-react';
import type { Conversion, Counselor } from '@/types/dashboard';
import { BarChartComponent } from '@/Components/Barchart';
import { PieChartComponent } from '@/Components/PieChart';

interface ConversionsChartProps {
  conversionsData: Conversion[];
  counselors: Counselor[];
}

export const ConversionsChart: React.FC<ConversionsChartProps> = ({ conversionsData, counselors }) => {
  const [selectedCounselor, setSelectedCounselor] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Color scheme
  const COLORS: Record<string, string> = {
    'Abroad Enrollment': '#9333EA', // Purple
    'Class Enrollment': '#10B981'   // Green/Teal
  };

  // Calculate enriched data with memoization for performance
  const enrichedData = useMemo(() => {
    const total = conversionsData.reduce((sum, item) => sum + item.count, 0);
    
    return conversionsData.map(item => ({
      ...item,
      percentage: total > 0 ? ((item.count / total) * 100).toFixed(1) : '0',
      fill: COLORS[item.type] || '#6B7280'
    }));
  }, [conversionsData]);

  const total = useMemo(() => 
    conversionsData.reduce((sum, item) => sum + item.count, 0),
    [conversionsData]
  );

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              Conversions
              <span className="text-sm font-normal text-gray-500">
                (Total: {total})
              </span>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <TrendingUp size={16} />
              <span>Active</span>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="flex  items-center gap-2">
            {/* Counselor Select */}
            <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select counselor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counselors</SelectItem>
                {counselors.map((counselor) => (
                  <SelectItem key={counselor.id} value={counselor.id}>
                    {counselor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Start Date */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-all">
              <Calendar size={16} className="text-gray-500" />
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm text-gray-700 focus:outline-none bg-transparent"
                placeholder="Start Date"
              />
            </div>
            
            {/* End Date */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-all">
              <Calendar size={16} className="text-gray-500" />
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm text-gray-700 focus:outline-none bg-transparent"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          {enrichedData.map((item) => (
            <div 
              key={item.type}
              className="relative overflow-hidden rounded-xl p-4 transition-all hover:shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${item.fill}15 0%, ${item.fill}05 100%)`,
                border: `1px solid ${item.fill}30`
              }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{item.type}</p>
                  <p className="text-3xl font-bold" style={{ color: item.fill }}>
                    {item.count}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.percentage}% of total conversions
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${item.fill}20` }}
                >
                  {item.type === 'Abroad Enrollment' ? '✈️' : '🎓'}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.fill
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <BarChartComponent data={enrichedData} />
          <PieChartComponent data={enrichedData} />
        </div>

        {/* Insights Section */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-gray-800">Key Insight</h4>
              <p className="text-xs text-gray-600">
                {enrichedData[0]?.type} leads with {enrichedData[0]?.count} enrollments 
                ({enrichedData[0]?.percentage}% conversion rate). 
                {total > 0 && ` Total of ${total} conversions recorded.`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};