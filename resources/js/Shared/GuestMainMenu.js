import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';
import Count from './Count';
import ProjectInfo from './ProjectInfo';

export default ({ className }) => {
  return (
    <div className={className}>
      <ProjectInfo />
      <Count />
    </div>
  );
};
