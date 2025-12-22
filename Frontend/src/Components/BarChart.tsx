import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EnrichedData {
  type: string;
  count: number;
  percentage: string;
  fill: string;
}

interface BarChartComponentProps {
  data: EnrichedData[];
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  // customizing the tooltip '(custom Tool tip)
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{data.type}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-bold text-gray-900">{data.count}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-bold text-gray-900">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">Enrollment Breakdown</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 11, fill: '#6B7280' }}
            tickFormatter={(value) => value.split(' ')[0]}
          />
          <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};