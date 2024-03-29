import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
// import parse from 'html-react-parser';
// import { html_substring } from '@/utils';

const Index = () => {
  const { dictionaries } = usePage().props;
  const {
    data,
    meta: { links }
  } = dictionaries;

  return (
    <div>
      {/* <h1 className="mb-8 text-3xl font-bold">Toate dicționarele</h1> */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline">
          <span className="text-3xl font-bold">Dicționare încărcate</span>
          <span> (apasă pe un dicționar pentru a edita cuvintele adăugate)</span>
        </div>
        {/* <SearchFilter /> */}
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('dictionaries.create')}
        >
          <span>Adaugă</span>
          <span className="hidden md:inline"> un dicționar nou</span>
        </InertiaLink>
        {/* <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('')}
        >
          <span>Încarcă</span>
          <span className="hidden md:inline"> un fișier cu dicționar</span>
        </InertiaLink> */}

      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          {/* <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Titlu</th>
              <th className="px-6 pt-5 pb-4">Descriere</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
              </th>
            </tr>
          </thead> */}
          <tbody>
            {data.map(({ id, name, description, deleted_at }) => {
              return (
                <tr
                  key={id}
                  className="bg-indigo-200 hover:bg-indigo-500 focus-within:bg-indigo-500"
                >
                  <td className="border-t">
                    <InertiaLink
                      href={route('dictionaries.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                      <h1 className="text-3xl font-bold text-indigo-900">{name}</h1>
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
                      tabIndex="-1"
                      href={route('dictionaries.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {description ? parse(html_substring(description, 0, 75)) : ''}
                      <span>&nbsp;...</span>
                    </InertiaLink>
                  </td> */}
                  {/* <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('dictionaries.edit', id)}
                      className="btn-edit items-center px-4 focus:outline-none"
                    > <span>Editează dicționarul</span>
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td> */}
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Nu există nici un dicționar.
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

Index.layout = page => <Layout title="Dictionaries" children={page} />;

export default Index;
