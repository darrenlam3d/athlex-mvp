import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface TestResultFormProps {
  onSuccess?: () => void;
}

const TestResultForm: React.FC<TestResultFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    testType: '',
    score: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.testType || !formData.score) {
        throw new Error('Please fill in all required fields');
      }
      
      // Get existing test results or use default empty array
      const storedResults = localStorage.getItem('athlex_test_results');
      const testResults = storedResults ? JSON.parse(storedResults) : [];
      
      // Create new test result
      const newResult = {
        id: `test_${Date.now()}`,
        test_type: formData.testType,
        score: formData.score,
        timestamp: new Date(formData.date).toISOString(),
        notes: formData.notes
      };
      
      // Add to beginning of array
      testResults.unshift(newResult);
      
      // Keep only most recent 10 results
      const updatedResults = testResults.slice(0, 10);
      
      // Save to localStorage
      localStorage.setItem('athlex_test_results', JSON.stringify(updatedResults));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Test result logged successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/athlex-mvp');
      }
    } catch (error) {
      console.error('Error logging test result:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to log test result');
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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="testType">Test Type *</Label>
            <select
              id="testType"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="w-full bg-athlex-gray-800 border-athlex-gray-700 rounded-md p-2"
              required
            >
              <option value="" disabled>Select test type</option>
              <option value="Vertical Jump">Vertical Jump</option>
              <option value="Sprint 40m">Sprint 40m</option>
              <option value="Shuttle Run">Shuttle Run</option>
              <option value="1RM Squat">1RM Squat</option>
              <option value="Beep Test">Beep Test</option>
              <option value="Agility T-Test">Agility T-Test</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="score">Score (with units) *</Label>
            <Input
              id="score"
              name="score"
              placeholder="e.g., 65 cm, 4.5 s, Level 12"
              value={formData.score}
              onChange={handleChange}
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Test Date *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional details about the test"
              value={formData.notes}
              onChange={handleChange}
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
            {isSubmitting ? 'Saving...' : 'Save Test Result'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestResultForm;
