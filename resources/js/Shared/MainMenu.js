import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';
import Count from './Count';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Încarcă o literă" link="litera" icon="" />
      <MainMenuItem text="Adaugă un articol lexicografic" link="words.create" icon="" />
      {/* <MainMenuItem text="Cuvintele din dicționarele încărcate" link="words" /> */}
      {/* <MainMenuItem class="font-bold text-orange-500" text="Dicționare încărcate" link="dictionaries" /> */}

      <Count />
    </div>
  );
};
