import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
// import route from 'vendor/tightenco/ziggy/src/js/route';

export default () => {
  const { auth } = usePage().props;
  const [menuOpened, setMenuOpened] = useState(false);

  // console.log(window.location.pathname);
  // console.log(pathname === "/cuvinte");
  const pathname = window.location.pathname;
  return (
    <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">

      {pathname !== "/cuvinte" ?
        (<div className="mt-1 mr-4">{`Proiect de colaborare ${auth.user.account.name}`}</div>) :
        (<div className="max-w-3xl w-full text-center flex">
          <div className="text-xl whitespace-nowrap text-indigo-900 mr-4 pt-2">Caută un cuvânt</div>
          <SearchFilter />
        </div>)
      }
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
            <span>{auth.user.first_name}</span>
            <span className="hidden ml-1 md:inline">{auth.user.last_name}</span>
          </div>
          <Icon
            className="w-5 h-5 text-gray-800 fill-current group-hover:text-indigo-600 focus:text-indigo-600"
            name="cheveron-down"
          />
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <InertiaLink
              href={route('users.edit', auth.user.id)}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              Profilul meu
            </InertiaLink>
            <InertiaLink
              href={route('users')}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              Listă utilizatori
            </InertiaLink>
            <InertiaLink
              as="button"
              href={route('logout')}
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
              method="post"
            >
              Ieșire
            </InertiaLink>
          </div>
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
