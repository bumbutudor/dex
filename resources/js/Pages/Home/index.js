import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';

import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import Search from '@/Shared/Search';
import parse from 'html-react-parser';
import { html_substring } from '@/utils';

const Index = () => {
  const { words } = usePage().props;
  const {
    data,
    meta: { links }
  } = words;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Cuvinte</h1>
      <div className="flex items-center justify-between mb-6">
        {/* <SearchFilter /> */}
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Cuvânt</th>
              {/* <th className="px-6 pt-5 pb-4">Pre-definiție</th> */}
              <th className="px-6 pt-5 pb-4">Definiție</th>
              <th className="px-6 pt-5 pb-4">Dicționar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, predefinition, definition,  dictionary, deleted_at }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('words.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {name}
                    {deleted_at && (
                      <Icon
                        name="trash"
                        className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                      />
                    )}
                  </InertiaLink>
                </td>
                {/* <td className="border-t">
                  <InertiaLink
                    tabIndex="1"
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    href={route('words.edit', id)}
                  >
                    {predefinition ? parse(predefinition.substring(0, 20)) : ''}
                    <span>&nbsp;...</span>
                  </InertiaLink>
                </td> */}
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                     
                    {definition ? parse(html_substring(definition, 0, 75)) : ''}
                    <span>&nbsp;...</span>
                  </InertiaLink>
                 
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {dictionary ? dictionary.name : ''}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                    <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 text-gray-400 fill-current"
                    />
                  </InertiaLink>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Dragă lexicograf, nu aveți niciun cuvânt adăugat. Vă rugăm să le adăugați.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </div>
  );
};

Index.layout = page => <Layout title="Cuvinte" children={page} />;

export default Index;