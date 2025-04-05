
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Lock } from 'lucide-react';

const DownloadReport = () => {
  return (
    <Card className="border border-dashed border-gray-700 bg-gray-800/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-athlex-accent mr-3" />
            <div>
              <h3 className="font-medium">Performance Reports</h3>
              <p className="text-sm text-gray-400">Download detailed PDF reports of your performance data</p>
            </div>
          </div>
          <Button className="w-full sm:w-auto" disabled>
            <Download className="mr-2 h-4 w-4" />
            <span>Pro Feature</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadReport;
