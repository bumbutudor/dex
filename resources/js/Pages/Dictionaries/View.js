import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import GuestLayout from '@/Shared/GuestLayout';
import Pagination from '@/Shared/Pagination';
import parse from 'html-react-parser';
import Search from '@/Shared/Search';


const View = () => {
  const { dictionary, dictionary_words } = usePage().props;

  const {
    data,
    meta: { links }
  } = dictionary_words;

  const [values, setValues] = useState({
    name: dictionary.name || '',
    description: dictionary.description || '',
    organization_id: dictionary.organization_id || '',
  });


  return (
    <div>
      <div className="overflow-hidden pb-8 bg-white rounded shadow">
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <h1 className="mb-4 text-3xl font-bold">
            {values.name}
            </h1>
            <div className="text-md leading-5">{parse(values.description)}</div>
            {/* <div className="w-full pb-8 pr-6 lg:w-1/1">
              Instituție {values.organization_id} 
              {organizations.map(({ id, name }) => (
                <option key={id} value={values.organization_id}>
                  {name}
                </option>
              ))}
            </div> */}
            <p className="text-md pt-4 font-bold">Mai jos sunt cuvintele din acest dicționar.</p>
          </div>
      </div>
      
      {/* <Search /> */}
      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
            {/* <h2 className="pt-6 text-xl text-center font-bold">Cuvintele din acest dicționar</h2> */}
            {/* @Todo display user*/}
            {data.map(
              ({ id, name, user_id, definition, deleted_at }) => {
                return (
                    <div className="pb-4 w-full p-6 rounded shadow" label="cuvant">
                        <h1 className="text-md  pb-2 w-full">
                          <a className="font-bold text-indigo-600">{name}</a>
                        </h1>
                        <div className="text-md w-full leading-5">{parse(definition)}</div>
                    </div> 
                );
              }
            )}
            {dictionary.words.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Nu există niciun cuvânt în acest dicționar.
                </td>
              </tr>
            )}
      </div>
      <Pagination links={links} />
    </div>
  );
};

View.layout = page => <GuestLayout children={page} />;

export default View;
