
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Save, FileText, Copy, Share2 } from 'lucide-react';

const ScoutReportTemplates = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-medium">Report Templates</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/20 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <Label htmlFor="auto-save" className="block font-medium mb-1">Auto-save Templates</Label>
                <p className="text-xs text-gray-400">
                  Automatically save report drafts as templates
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="auto-save" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/20 p-2 rounded-full">
                <Copy className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <Label htmlFor="template-sync" className="block font-medium mb-1">Template Sync</Label>
                <p className="text-xs text-gray-400">
                  Sync templates across your devices
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="template-sync" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/20 p-2 rounded-full">
                <Share2 className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <Label htmlFor="team-templates" className="block font-medium mb-1">Team Templates</Label>
                <p className="text-xs text-gray-400">
                  Share templates with your scouting team
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="team-templates" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoutReportTemplates;
