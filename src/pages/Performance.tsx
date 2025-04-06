
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
              <h1 className="text-2xl md:text-3xl font-bold mb-6">My Performance</h1>
              
              {/* Performance Timeline */}
              <div className="mt-5">
                <PerformanceTimeline />
              </div>
              
              {/* Stat Breakdown */}
              <div className="mt-5">
                <StatBreakdown />
              </div>
              
              {/* Trend Graphs - Increased space */}
              <div className="mt-8">
                <TrendGraphs />
              </div>
              
              {/* Benchmark Comparison - Increased space */}
              <div className="mt-8">
                <BenchmarkComparison />
              </div>
              
              {/* Goal Progress Snapshot */}
              <div className="mt-8">
                <GoalProgressSnapshot />
              </div>
              
              {/* Personal Bests & Highlights */}
              <div className="mt-8">
                <PersonalBests />
              </div>
              
              {/* Download Report */}
              <div className="mt-8 mb-8">
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
