import React from 'react';
import { ProgressDashboard } from '../components/practice/ProgressDashboard';
import { PageContainer } from '../components/ui/LayoutPrimitives';

export const Progress: React.FC = () => (
  <div className="w-full">
    <PageContainer><ProgressDashboard /></PageContainer>
  </div>
);
