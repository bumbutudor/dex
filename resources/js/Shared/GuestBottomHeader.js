import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Shared/Icon';

export default () => {
  return (
    <div className="flex items-center w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
      <div className="max-w-3xl w-full text-center">
        <div className="text-2xl font-bold pr-20">Caută un cuvânt</div>
      </div>
            
      {/* <div className="mt-1">{`Proiect de colaborare IMI-IFR`}</div> */}
      
      {/* <div className="mt-1 ml-60 text-lg font-bold">{`Dicționar de sinonime al limbii române`}</div> */}
      <div className="relative w-full">
        <div
          className="flex float-right cursor-pointer select-none group"
        >
          <div className=" text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
              <a href={"login"} className="block px-6 py-2 hover:indigo-600">Autentificare</a>
          </div>
        </div>
      </div>
    </div>
  );
};
