import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnrichedData {
  type: string;
  count: number;
  percentage: string;
  fill: string;
}

interface PieChartComponentProps {
  data: EnrichedData[];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  // Custom tooltip
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

  // Custom label for pie chart slices
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-xs text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};