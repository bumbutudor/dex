import React from 'react';
import Helmet from 'react-helmet';
import GuestMainMenu from '@/Shared/GuestMainMenu';
import FlashMessages from '@/Shared/FlashMessages';
import GuestTopHeader from '@/Shared/GuestTopHeader';
import GuestBottomHeader from '@/Shared/GuestBottomHeader';

export default function GuestLayout({ title, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | DEX" title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <GuestTopHeader />
            <GuestBottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <GuestMainMenu className="flex-shrink-0 hidden w-56 p-4 overflow-y-auto bg-indigo-800 md:block" />

            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-2 py-4 overflow-hidden overflow-y-auto md:px-4">
              {/* <FlashMessages /> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
