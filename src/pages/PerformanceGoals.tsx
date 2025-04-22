
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import AthleteLayout from '@/layouts/AthleteLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, ArrowLeft, Activity, Trash2 } from 'lucide-react';
import { mockGoals } from '@/lib/mockData';

// Types for goals from mockData
interface Goal {
  id: string;
  title: string;
  description: string;
  metric: string;
  current: number;
  target: number;
  progress: number;
  start_date: string;
  end_date: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
}

// Mock goal metrics
const goalMetrics = [
  { id: "speed", name: "Speed (km/h)" },
  { id: "distance", name: "Distance (km)" },
  { id: "vo2max", name: "VO2 Max (ml/kg/min)" },
  { id: "vertical_jump", name: "Vertical Jump (cm)" },
  { id: "agility", name: "Agility (seconds)" },
  { id: "strength", name: "Strength (kg)" },
];

const PerformanceGoals = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    metric: '',
    target: '',
    end_date: '',
  });

  // Check if user has access
  const hasAccess = userRole === 'athlete' || userRole === 'coach' || userRole === 'scout';

  if (!hasAccess) {
    navigate('/login');
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewGoal(prev => ({ ...prev, metric: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new goal object
    const goal: Goal = {
      id: `goal_${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description,
      metric: newGoal.metric,
      current: 0,
      target: parseInt(newGoal.target) || 0,
      progress: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: newGoal.end_date,
      status: 'not_started',
    };
    
    // Add to goals list
    setGoals(prev => [goal, ...prev]);
    
    // Reset form
    setNewGoal({
      title: '',
      description: '',
      metric: '',
      target: '',
      end_date: '',
    });
    
    setShowForm(false);
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <AthleteLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold gradient-text">Performance Goals</h1>
          </div>
          <Button onClick={toggleForm} className="flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            {showForm ? 'Cancel' : 'Add Goal'}
          </Button>
        </div>

        {/* Add Goal Form */}
        {showForm && (
          <div className="bg-athlex-gray-900/60 border border-athlex-gray-800 rounded-lg p-5 mb-8 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">Create New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newGoal.title}
                  onChange={handleInputChange}
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  name="description"
                  value={newGoal.description}
                  onChange={handleInputChange}
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metric">Metric</Label>
                  <Select
                    value={newGoal.metric}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalMetrics.map(metric => (
                        <SelectItem key={metric.id} value={metric.id}>
                          {metric.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="target">Target Value</Label>
                  <Input
                    id="target"
                    name="target"
                    type="number"
                    value={newGoal.target}
                    onChange={handleInputChange}
                    className="bg-athlex-gray-800 border-athlex-gray-700"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="end_date">Target Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={newGoal.end_date}
                  onChange={handleInputChange}
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-12 bg-athlex-gray-900/60 border border-athlex-gray-800 rounded-lg">
              <Activity className="h-12 w-12 mx-auto text-gray-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-300">No Goals Yet</h3>
              <p className="text-gray-500 mt-2">Add your first performance goal to start tracking.</p>
              <Button onClick={toggleForm} className="mt-4">
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Goal
              </Button>
            </div>
          ) : (
            goals.map(goal => (
              <div key={goal.id} className="bg-athlex-gray-900/60 border border-athlex-gray-800 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{goal.title}</h3>
                    <p className="text-sm text-gray-400">{goal.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.metric}</span>
                    <span className="text-athlex-accent">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="mt-4 flex justify-between text-xs text-gray-400">
                  <span>Started: {new Date(goal.start_date).toLocaleDateString()}</span>
                  <span>Target: {new Date(goal.end_date).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    goal.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                    goal.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {goal.status.replace('_', ' ')}
                  </span>
                  
                  <Button variant="outline" size="sm" className="border-athlex-gray-700">
                    Update Progress
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AthleteLayout>
  );
};

export default PerformanceGoals;
