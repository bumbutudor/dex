import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';
import Count from './Count';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Cuvintele din dicționarele încărcate" link="words" />
      <MainMenuItem text="Dicționare încărcate" link="dictionaries" />
      {/* <MainMenuItem text="Dicționarul explicativ" link="dictionaries.edit"  id="1"/>
      <MainMenuItem text="Dicționarul de sinonime" link="dictionaries.edit"  id="2"/> */}
      {/* <MainMenuItem text="Modals Demo" link="modals" icon="apple" /> */}
      <Count />
    </div>
  );
};
