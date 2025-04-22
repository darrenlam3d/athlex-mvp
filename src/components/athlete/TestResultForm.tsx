
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const testTypes = [
  { id: "vertical_jump", name: "Vertical Jump", unit: "cm" },
  { id: "sprint_40m", name: "Sprint 40m", unit: "s" },
  { id: "shuttle_run", name: "Shuttle Run", unit: "s" },
  { id: "max_pushups", name: "Max Push-ups", unit: "reps" },
  { id: "beep_test", name: "Beep Test", unit: "level" },
  { id: "box_jump", name: "Box Jump", unit: "cm" },
  { id: "broad_jump", name: "Broad Jump", unit: "cm" },
  { id: "max_pullups", name: "Max Pull-ups", unit: "reps" },
  { id: "bench_press", name: "Bench Press", unit: "kg" },
  { id: "squat", name: "Squat", unit: "kg" }
];

interface TestResultFormProps {
  onSuccess?: () => void;
}

const TestResultForm: React.FC<TestResultFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    testType: '',
    result: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [selectedUnit, setSelectedUnit] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, testType: value }));
    
    // Update the unit based on the selected test type
    const test = testTypes.find(t => t.id === value);
    if (test) {
      setSelectedUnit(test.unit);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be a Supabase insert
      console.log('Submitting test result:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Test result saved successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/athlex-mvp');
      }
    } catch (error) {
      console.error('Error saving test result:', error);
      toast.error('Failed to save test result. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Log Test Result</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testType">Test Type</Label>
            <Select
              value={formData.testType}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="result">
              Result {selectedUnit && <span className="text-gray-400">({selectedUnit})</span>}
            </Label>
            <Input
              id="result"
              name="result"
              value={formData.result}
              onChange={handleInputChange}
              placeholder={`e.g. 65 ${selectedUnit}`}
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Test Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any comments about this test (conditions, technique, etc.)"
              className="bg-athlex-gray-800 border-athlex-gray-700 min-h-[100px]"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => navigate('/athlex-mvp')}
            disabled={isSubmitting}
            className="border border-gray-700"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Result'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestResultForm;
