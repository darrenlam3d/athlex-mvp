
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

type MetricProps = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

const ImpactMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Default values if API fails or isn't implemented
  const metrics: MetricProps[] = [
    { value: 200, label: "Athletes Onboarded", suffix: "+" },
    { value: 4.8, label: "Avg. Satisfaction", decimals: 1 },
    { value: 95, label: "Coach Renewal Rate", suffix: "%" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after triggering once
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section 
      ref={ref}
      className="w-full bg-white rounded-lg shadow-lg border border-athlex-gray-200 p-8"
      aria-labelledby="impact-metrics-title"
    >
      <h2 id="impact-metrics-title" className="text-2xl font-bold text-center text-athlex-gray-900 mb-12">
        Our Impact
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <AnimatedMetric 
            key={index} 
            value={metric.value} 
            label={metric.label}
            suffix={metric.suffix}
            decimals={metric.decimals}
            animate={isVisible}
          />
        ))}
      </div>
    </section>
  );
};

interface AnimatedMetricProps extends MetricProps {
  animate: boolean;
}

const AnimatedMetric = ({ 
  value, 
  label, 
  suffix = '', 
  decimals = 0,
  animate 
}: AnimatedMetricProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!animate) return;
    
    let startTime: number | null = null;
    const duration = 1500; // 1.5s duration
    
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
      const easedProgress = easeOutCubic(progress);
      
      setCount(easedProgress * value);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [animate, value]);
  
  // Format the count based on decimals
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-athlex-accent mb-2"
        aria-live="polite"
      >
        {formattedCount}{suffix}
      </div>
      <p className="text-lg text-athlex-gray-700 text-center">{label}</p>
    </div>
  );
};

export default ImpactMetrics;
