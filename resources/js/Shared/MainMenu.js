import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

const dictionary = 1

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Toate cuvintele" link="words" />
      {/* <MainMenuItem text="Dicționare" link=""  /> */}
      <MainMenuItem text="Dicționarul explicativ" link="dictionaries.edit"  id="1"/>
      <MainMenuItem text="Dicționarul de sinonime" link="dictionaries.edit"  id="2"/>
      <MainMenuItem text="Modals Demo" link="modals" icon="apple" />
    </div>
  );
};
