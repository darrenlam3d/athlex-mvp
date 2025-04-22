
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
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const sessionTypes = [
  "Conditioning",
  "Skill",
  "Strength",
  "Recovery",
  "Team Training",
  "Match"
];

interface TrainingLogFormProps {
  onSuccess?: () => void;
}

const TrainingLogForm: React.FC<TrainingLogFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: '',
    activity: '',
    duration: 60,
    rpe: 5,
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Calculate sRPE (Session Rate of Perceived Exertion)
      const sRPE = formData.duration * formData.rpe;
      
      // In a real app, this would be a Supabase insert
      console.log('Submitting training log:', { ...formData, sRPE });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Session logged successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/athlex-mvp');
      }
    } catch (error) {
      console.error('Error logging training session:', error);
      toast.error('Failed to log session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Log Training Session</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionType">Session Type</Label>
            <Select
              value={formData.sessionType}
              onValueChange={(value) => handleSelectChange('sessionType', value)}
              required
            >
              <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity</Label>
            <Input
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleInputChange}
              placeholder="e.g. Sprints, Passing drills, Weight training"
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              max="300"
              value={formData.duration}
              onChange={handleInputChange}
              className="bg-athlex-gray-800 border-athlex-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="rpe">Intensity (RPE)</Label>
              <span className="text-athlex-accent font-medium">{formData.rpe}</span>
            </div>
            <Slider
              id="rpe"
              min={1}
              max={10}
              step={1}
              defaultValue={[5]}
              value={[formData.rpe]}
              onValueChange={(value) => handleSliderChange('rpe', value)}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Very Light (1)</span>
              <span>Moderate (5)</span>
              <span>Maximal (10)</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any comments about this session"
              className="bg-athlex-gray-800 border-athlex-gray-700 min-h-[100px]"
            />
          </div>
          
          {/* Display calculated sRPE */}
          <div className="bg-athlex-accent/10 border border-athlex-accent/30 rounded-lg p-4">
            <p className="text-sm font-medium">Calculated Training Load (sRPE)</p>
            <p className="text-2xl font-bold text-athlex-accent mt-1">
              {formData.duration * formData.rpe} units
            </p>
            <p className="text-xs text-gray-400 mt-1">
              sRPE = Duration (minutes) × RPE (1-10)
            </p>
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
            {isSubmitting ? 'Saving...' : 'Save Session'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TrainingLogForm;
