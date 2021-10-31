import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Shared/Icon';
import Search from '@/Shared/Search';

export default () => {
  return (
    <div className="flex items-center w-full p-4 text-sm bg-indigo-200 border-b md:py-0 md:px-12 d:text-md">
      <div className="max-w-3xl w-full text-center flex">
        <div className="text-2xl whitespace-nowrap font-bold text-indigo-900 mr-4 pt-2">Caută un cuvânt</div>
        <Search />
      </div>
            
      {/* <div className="mt-1">{`Proiect de colaborare IMI-IFR`}</div> */}
      
      {/* <div className="mt-1 ml-60 text-lg font-bold">{`Dicționar de sinonime al limbii române`}</div> */}
      <div className="relative w-full">
        <div
          className="flex float-right cursor-pointer select-none group"
        >
          <div className=" text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
              <a href={"login"} className="block px-6 py-2 text-indigo-900 hover:indigo-600">Autentificare</a>
          </div>
        </div>
      </div>
    </div>
  );
};
