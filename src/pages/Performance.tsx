
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PerformanceTimeline from '@/components/performance/PerformanceTimeline';
import StatBreakdown from '@/components/performance/StatBreakdown';
import TrendGraphs from '@/components/performance/TrendGraphs';
import BenchmarkComparison from '@/components/performance/BenchmarkComparison';
import GoalProgressSnapshot from '@/components/performance/GoalProgressSnapshot';
import PersonalBests from '@/components/performance/PersonalBests';
import DownloadReport from '@/components/performance/DownloadReport';

const Performance = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-8">My Performance</h1>
              
              {/* Performance Timeline */}
              <div className="mb-12">
                <PerformanceTimeline />
              </div>
              
              {/* Stat Breakdown */}
              <div className="mb-12">
                <StatBreakdown />
              </div>
              
              {/* Trend Graphs - With more spacing between sections */}
              <div className="mb-16">
                <TrendGraphs />
              </div>
              
              {/* Benchmark Comparison - With more spacing between sections */}
              <div className="mb-16">
                <BenchmarkComparison />
              </div>
              
              {/* Goal Progress Snapshot */}
              <div className="mb-12">
                <GoalProgressSnapshot />
              </div>
              
              {/* Personal Bests & Highlights */}
              <div className="mb-12">
                <PersonalBests />
              </div>
              
              {/* Download Report */}
              <div className="mb-12">
                <DownloadReport />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Performance;
