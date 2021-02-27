import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { dictionaries } = usePage().props;
  const {
    data,
    meta: { links }
  } = dictionaries;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dicționare</h1>
      <div className="flex items-center justify-between mb-6">
        {/* <SearchFilter /> */}
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('dictionaries.create')}
        >
          <span className="hidden md:inline">Dicționar nou</span>
        </InertiaLink>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Titlu</th>
              <th className="px-6 pt-5 pb-4">Descriere</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, description, deleted_at }) => {
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t">
                    <InertiaLink
                      href={route('dictionaries.edit', id)}
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
                      tabIndex="-1"
                      href={route('dictionaries.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {`${description.substring(0, 75)}...`}
                    </InertiaLink>
                  </td>
                  <td className="w-px border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('dictionaries.edit', id)}
                      className="flex items-center px-4 focus:outline-none"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td>
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
