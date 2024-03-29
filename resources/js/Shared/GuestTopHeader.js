import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import GuestMainMenu from '@/Shared/GuestMainMenu';

export default () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:w-56 md:justify-center">
      <InertiaLink className="mt-1" href="/?page=1">
        <Logo className="text-white fill-current" width="120" />
      </InertiaLink>
      
      <div className="relative md:hidden">
        <svg
          onClick={() => setMenuOpened(true)}
          className="w-6 h-6 text-white cursor-pointer fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <div className={`${menuOpened ? '' : 'hidden'} absolute right-0 z-20`}>
        <div className="text-white">{`Proiect de colaborare IMI-IFR`}</div>
          <GuestMainMenu className="relative z-20 px-8 py-4 pb-2 mt-2 bg-indigo-800 rounded shadow-lg" />
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  );
};
