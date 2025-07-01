import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HeatmapData } from '../types';

interface HeatmapVisualizationProps {
  data: HeatmapData[];
}

export const HeatmapVisualization: React.FC<HeatmapVisualizationProps> = ({ data }) => {
  const chartData = data.map(item => ({
    page: item.page.replace('/', '').replace('-', ' ') || 'Home',
    clicks: item.clicks.reduce((sum, click) => sum + click.count, 0),
    scrollDepth: Math.round(item.scrollDepth * 100),
    timeOnPage: Math.round(item.timeOnPage / 1000) // Convert to seconds
  }));

  const getBarColor = (value: number, max: number) => {
    const intensity = value / max;
    if (intensity > 0.8) return '#dc2626'; // Red for high activity
    if (intensity > 0.6) return '#ea580c'; // Orange
    if (intensity > 0.4) return '#d97706'; // Amber
    if (intensity > 0.2) return '#65a30d'; // Lime
    return '#16a34a'; // Green for low activity
  };

  const maxClicks = Math.max(...chartData.map(d => d.clicks));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Page Interaction Heatmap</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>High Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Low Activity</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Click Heatmap */}
        <div>
          <h4 className="text-md font-medium text-gray-800 mb-4">Click Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="page" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, 'Total Clicks']}
                labelFormatter={(label) => `Page: ${label}`}
              />
              <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.clicks, maxClicks)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Metrics */}
        <div>
          <h4 className="text-md font-medium text-gray-800 mb-4">Engagement Metrics</h4>
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 capitalize">{item.page}</h5>
                  <span className="text-sm text-gray-600">{item.clicks} clicks</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Scroll Depth:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.scrollDepth}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{item.scrollDepth}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Time on Page:</span>
                    <div className="mt-1">
                      <span className="font-medium text-gray-900">{item.timeOnPage}s</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {chartData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Total Clicks</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(chartData.reduce((sum, item) => sum + item.scrollDepth, 0) / chartData.length)}%
          </div>
          <div className="text-sm text-green-700">Avg Scroll Depth</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(chartData.reduce((sum, item) => sum + item.timeOnPage, 0) / chartData.length)}s
          </div>
          <div className="text-sm text-purple-700">Avg Time on Page</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {chartData.length}
          </div>
          <div className="text-sm text-orange-700">Pages Tracked</div>
        </div>
      </div>
    </div>
  );
};