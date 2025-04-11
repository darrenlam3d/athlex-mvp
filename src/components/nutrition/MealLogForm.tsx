
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from 'lucide-react';

interface FormField {
  label: string;
  type: string;
  options?: string[];
}

interface MealLogFormProps {
  formFields: FormField[];
  onSuccess: () => void;
  onCancel: () => void;
}

const MealLogForm: React.FC<MealLogFormProps> = ({ formFields, onSuccess, onCancel }) => {
  // Create form schema based on form fields
  const formSchema = z.object({
    meal_type: z.string({
      required_error: "Please select a meal type",
    }),
    description: z.string().min(3, {
      message: "Description must be at least 3 characters",
    }),
    // Skip photo_url validation for now
    calories: z.coerce.number().min(1, {
      message: "Please enter calories",
    }),
    protein_g: z.coerce.number().min(0, {
      message: "Please enter protein grams",
    }),
    carbs_g: z.coerce.number().min(0, {
      message: "Please enter carbohydrate grams",
    }),
    fats_g: z.coerce.number().min(0, {
      message: "Please enter fat grams",
    }),
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meal_type: "",
      description: "",
      calories: 0,
      protein_g: 0,
      carbs_g: 0,
      fats_g: 0,
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Check if Supabase is configured
      const isConfigured = isSupabaseConfigured();
      
      if (!isConfigured) {
        console.log('Demo mode: Would save meal log', values);
        toast.success("Meal logged successfully!");
        onSuccess();
        return;
      }
      
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("You must be logged in to log meals");
      }
      
      // Add meal log to database
      const { error } = await supabase.from('meal_logs').insert({
        user_id: userData.user.id,
        date: new Date().toISOString().split('T')[0],
        meal_type: values.meal_type,
        description: values.description,
        calories: values.calories,
        protein_g: values.protein_g,
        carbs_g: values.carbs_g,
        fats_g: values.fats_g,
      });
      
      if (error) throw error;
      
      toast.success("Meal logged successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error logging meal:", error);
      toast.error(error instanceof Error ? error.message : "Failed to log meal");
    }
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Log a Meal</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields.map((field) => {
              if (field.type === "select") {
                return (
                  <FormField
                    key={field.label}
                    control={form.control}
                    name={field.label.toLowerCase().replace(/\s+/g, "_") as any}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <Select 
                          onValueChange={formField.onChange} 
                          defaultValue={formField.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              
              if (field.type === "file") {
                // Simple file input for now, we'll skip actual upload handling
                return (
                  <FormItem key={field.label}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input 
                      type="file" 
                      className="bg-athlex-gray-800 border-athlex-gray-700"
                      accept="image/*"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }
              
              return (
                <FormField
                  key={field.label}
                  control={form.control}
                  name={field.label.toLowerCase().replace(/\s+/g, "_").replace(/\(|\)/g, '') as any}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input 
                          type={field.type} 
                          {...formField}
                          className="bg-athlex-gray-800 border-athlex-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-athlex-gray-700"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent/90">
                Log Meal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MealLogForm;
