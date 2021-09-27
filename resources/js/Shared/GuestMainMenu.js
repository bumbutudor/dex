import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <div className="text-white text-sm pb-4 leading-5">{`Platforma DEX (dicționar electronic) este un proiect de 
      colaborare dintre Institutul de Filologie Română „B.P.-Hasdeu” (IFR) și 
      Institutul de Matematică şi Informatică „Vladimir Andrunachievici” (IMI)`}</div>
      <div className="text-white text-sm pb-4 leading-5">{`În fereastra din partea dreaptă puteți căuta cuvinte 
      din dicționarele create de lexicografii de la IFR.`}</div>
      <div className="text-white text-sm pb-4 leading-5">{`La moment sunt peste 14 mii de cuvinte din 
      „Dicționarul de sinononime al limbii române” și „Dicționarul explicativ uzual al limbii române”`}</div>

      {/* <MainMenuItem text="Autentificare" link="login" /> */}
      {/* <MainMenuItem text="Cuvinte" link="words/view" /> */}
    </div>
  );
};
