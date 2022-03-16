import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import parse from 'html-react-parser';
import { html_substring } from '@/utils';

const Index = () => {
  const { words } = usePage().props;
  const {
    data,
    meta: { links }
  } = words;

  const animateIconOnClick = () => {
    document.querySelector('#reload-icon').classList.add('animate-spin');
  }

  return (
    <div>
      {/* <h1 className="mb-8 text-3xl font-bold">Cuvinte</h1> */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">Cuvintele din toate dicționarele</h1>
        <SearchFilter />
        <InertiaLink
          className="btn-indigo text-lg focus:outline-none"
          href={route('words.create')}
        >
          <span>Adaugă</span>
          <span className="hidden md:inline"> un cuvânt nou</span>
        </InertiaLink>
      </div>
      <div className="flex flex-wrap -mx-2">
        <InertiaLink
          className="flex items-center px-6 py-4 text-gray-600 focus:text-indigo-700 focus:outline-none"
          href={history.state.url}
          onClick={animateIconOnClick} //e.target.classList.toggle('animate-spin')

        >
          <Icon
            name="reload"
            className="h-6 w-6 scale-x-[-1]"
          />
          <span>Actualizează tabelul</span>
        </InertiaLink>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">

        <table className="w-full table-auto">
          <thead>
            <tr className="font-normal text-xl text-left">
              <th className="px-6 pt-5 pb-4">Cuvânt-titlu</th>
              <th className="px-6 pt-5 pb-4">Cuvânt de bază</th>
              <th className="px-6 pt-5 pb-4">Descriere lexicografică</th>
              {/* <th className="px-6 pt-5 pb-4">Dicționar</th> */}
              <th className="px-6 pt-5 pb-4">Acțiune</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, predefinition, definition, dictionary, deleted_at }) => (
              <tr
                key={id}
                className="text-indigo-900 hover:bg-indigo-200 focus-within:bg-indigo-200"
              >
                <td className="border-t whitespace-nowrap text-xl font-bold"
                  title={dictionary ? dictionary.name : ''}
                >

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
                <td className="border-t">
                  <InertiaLink
                    tabIndex="1"
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    href={route('words.edit', id)}
                  >
                    {predefinition}
                  </InertiaLink>
                </td>
                <td className="border-t text-xl pr-4"
                  title={dictionary ? dictionary.name : ''}
                >
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >

                    {definition ? parse(definition) : ''}
                    {/* <span>&nbsp;...</span> */}
                  </InertiaLink>

                </td>
                {/* <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {dictionary ? dictionary.name : ''}
                  </InertiaLink>
                </td> */}
                {/* chevron -> 'Editeaza' modiffied by Tudor on 27.09.2021 */}
                <td className="border-t px-4">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('words.edit', id)}
                    className="btn-edit focus:outline-none items-center px-4 focus:outline-none"
                  > <span>Editează cuvântul</span>
                    {/* <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 text-gray-400 fill-current"
                    /> */}
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
