import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Cuvinte" link="words" icon="dashboard" />
      <MainMenuItem text="Dicționare" link="dictionaries" icon="book" />
      <MainMenuItem text="Organizații" link="organizations" icon="office" />
      {/* <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" /> */}
    </div>
  );
};
