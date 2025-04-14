
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { isDemoMode } from '@/lib/supabase';
import { mockTrainingLogFormFields } from '@/lib/mockData';
import { toast } from 'sonner';

interface FormField {
  label: string;
  type: string;
  options?: string[];
  optional?: boolean;
}

interface TrainingLogFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const TrainingLogForm: React.FC<TrainingLogFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    activity: '',
    duration_minutes: 0,
    distance_km: undefined as number | undefined,
    intensity_level: '',
    notes: ''
  });
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      if (!isDemoMode()) {
        // This would use Supabase in a real implementation
        console.log('Would log training session to Supabase if configured');
      }
      
      // Demo mode: Just log to console
      console.log('Training log submitted:', formData);
      
      // Show success message
      toast.success('Training session logged successfully');
      
      // Call the success callback
      onSuccess();
    } catch (error) {
      console.error('Error logging training:', error);
      toast.error('Failed to log training session');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
        <CardHeader>
          <CardTitle>Log Training Session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockTrainingLogFormFields.map((field) => (
            <div key={field.label} className="space-y-2">
              <label className="text-sm font-medium">
                {field.label}
                {field.optional && <span className="text-athlex-gray-500 ml-1">(Optional)</span>}
              </label>
              
              {field.type === 'text' && (
                <Input
                  value={formData[field.label.toLowerCase().replace(/\s/g, '_') as keyof typeof formData] || ''}
                  onChange={(e) => handleInputChange(field.label.toLowerCase().replace(/\s/g, '_'), e.target.value)}
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  required={!field.optional}
                />
              )}
              
              {field.type === 'number' && (
                <Input
                  type="number"
                  value={formData[field.label.toLowerCase().replace(/[()]/g, '').replace(/\s/g, '_') as keyof typeof formData] || ''}
                  onChange={(e) => handleInputChange(
                    field.label.toLowerCase().replace(/[()]/g, '').replace(/\s/g, '_'), 
                    e.target.value ? Number(e.target.value) : undefined
                  )}
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  required={!field.optional}
                  min={0}
                  step={field.label.includes('km') ? 0.1 : 1}
                />
              )}
              
              {field.type === 'select' && field.options && (
                <Select 
                  onValueChange={(value) => handleInputChange(field.label.toLowerCase().replace(/\s/g, '_'), value)}
                  required={!field.optional}
                >
                  <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {field.type === 'textarea' && (
                <Textarea
                  value={formData[field.label.toLowerCase().replace(/\s/g, '_') as keyof typeof formData] || ''}
                  onChange={(e) => handleInputChange(field.label.toLowerCase().replace(/\s/g, '_'), e.target.value)}
                  className="bg-athlex-gray-800 border-athlex-gray-700 min-h-24"
                  required={!field.optional}
                />
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            type="button"
            className="border-athlex-gray-700"
          >
            Cancel
          </Button>
          <Button type="submit">Log Training</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TrainingLogForm;
