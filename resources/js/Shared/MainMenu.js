import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Cuvinte" link="words" />
      <MainMenuItem text="Dicționare" link="dictionaries"  />
      {/* <MainMenuItem text="Organizații" link="organizations"  /> */}
    </div>
  );
};
