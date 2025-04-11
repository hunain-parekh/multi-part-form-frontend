'use client';

import { usePathname } from 'next/navigation';
import { Progress } from 'flowbite-react';

const steps = [
  { path: '/form/step-1', label: 'User Profile' },
  { path: '/form/step-2', label: 'Contact Info' },
  { path: '/form/step-3', label: 'Employment Info' },
  { path: '/form/step-4', label: 'Financial Info' },
  { path: '/form/step-5', label: 'Preferences' },
  { path: '/form/step-6', label: 'Summary' },
];

export default function ProgressBar() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((step) => pathname.includes(step.path));
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full mb-6">
      <Progress progress={progress} size="lg" color="blue" />
      <div className="flex justify-between text-xs mt-2 text-gray-600">
        {steps.map((step, index) => (
          <span key={index} className={index === currentIndex ? 'font-semibold text-black' : ''}>
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}
