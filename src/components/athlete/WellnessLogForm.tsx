
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface WellnessLogFormProps {
  onSuccess?: () => void;
}

const WellnessLogForm: React.FC<WellnessLogFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    soreness: 3,
    fatigue: 3,
    mood: 3,
    notes: '',
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be a Supabase insert
      console.log('Submitting wellness log:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Wellness metrics logged successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/athlex-mvp');
      }
    } catch (error) {
      console.error('Error logging wellness:', error);
      toast.error('Failed to log wellness. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for generating slider labels
  const getScoreLabels = (metric: string) => {
    switch (metric) {
      case 'soreness':
        return { low: 'None (1)', mid: 'Moderate (3)', high: 'Severe (5)' };
      case 'fatigue':
        return { low: 'Fresh (1)', mid: 'Somewhat (3)', high: 'Exhausted (5)' };
      case 'mood':
        return { low: 'Poor (1)', mid: 'Neutral (3)', high: 'Excellent (5)' };
      default:
        return { low: 'Low (1)', mid: 'Medium (3)', high: 'High (5)' };
    }
  };

  // Helper component for wellness sliders
  const WellnessSlider = ({ name, label }: { name: 'soreness' | 'fatigue' | 'mood', label: string }) => {
    const score = formData[name];
    const labels = getScoreLabels(name);
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor={name}>{label}</Label>
          <span className={`font-medium ${
            name === 'mood' 
              ? (score > 3 ? 'text-green-500' : score < 3 ? 'text-red-500' : 'text-yellow-500')
              : (score < 3 ? 'text-green-500' : score > 3 ? 'text-red-500' : 'text-yellow-500')
          }`}>
            {score}
          </span>
        </div>
        <Slider
          id={name}
          min={1}
          max={5}
          step={1}
          value={[score]}
          onValueChange={(value) => handleSliderChange(name, value)}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{labels.low}</span>
          <span>{labels.mid}</span>
          <span>{labels.high}</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Log Wellness</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <WellnessSlider name="soreness" label="Muscle Soreness" />
          <WellnessSlider name="fatigue" label="Overall Fatigue" />
          <WellnessSlider name="mood" label="Mood" />
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleTextChange}
              placeholder="Any additional comments about how you're feeling"
              className="bg-athlex-gray-800 border-athlex-gray-700 min-h-[100px]"
            />
          </div>
          
          {/* Wellness Overview */}
          <div className="bg-athlex-accent/10 border border-athlex-accent/30 rounded-lg p-4">
            <p className="text-sm font-medium">Wellness Score</p>
            <p className="text-2xl font-bold text-athlex-accent mt-1">
              {((formData.mood + (6 - formData.soreness) + (6 - formData.fatigue)) / 3).toFixed(1)} / 5
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Combined score based on your mood, soreness, and fatigue levels
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
            {isSubmitting ? 'Saving...' : 'Save Wellness Log'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WellnessLogForm;
