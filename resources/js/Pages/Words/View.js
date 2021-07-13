import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import Search from '@/Shared/Search';
import parse from 'html-react-parser';
import { html_substring } from '@/utils';
import GuestLayout from '@/Shared/GuestLayout';

const View = () => {
  const { words, wordOfTheDay } = usePage().props;

  const {
    data,
    meta: { links }
  } = words;

  // let cuvantul_zilei = data ? data[Math.floor(Math.random() * data.length)] : '';
  let cuvant_titlu = wordOfTheDay.name;
  let definitie = wordOfTheDay.definition;
  let dictionar_name =  wordOfTheDay.dictionary.name;
  return (
    <div>

      <div className="mb-6 align-center max-w-3xl">
        <Search />
      </div>
      <div className="flex">
        <div className="flex-1 overflow-x-auto max-w-3xl bg-white rounded shadow">
              {data.map(({ id, name, definition,  dictionary, deleted_at }) => (
                <div className="pb-4 w-full  w-3xl p-6 rounded shadow" label="cuvant">
                    <h1 className="text-lg  pb-2 w-full">
                      <a className="font-bold text-indigo-600">{name=name.replace(/\n/g, " ")}</a>
                    </h1>
                    <div className="text-lg w-full w-3xl pr-5 leading-6">{parse(definition)}</div>
                    <div className="text-xs pt-2 italic text-gray-500">
                        {dictionary ? dictionary.name : ''}
                    </div>

                </div> 

              ))}

              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    Nu există acest cuvânt :(
                  </td>
                </tr>
              )}
        </div>
        
        <div className="flex-1 overflow-x-auto ml-20 max-w-md w-full ">
          <h3 className="mb-8 text-lg font-bold text-center">Cuvântul zilei</h3>
          <div className="w-full p-4 border border-indigo-600" label="cuvant">
                    <h1 className="text-3xl  pb-2 w-full">
                      <a className="font-bold text-indigo-600"> {cuvant_titlu ? cuvant_titlu=cuvant_titlu.replace(/\n/g, " ") : ''} </a>
                    </h1>
                    <div className="text-xl w-full pr-5 leading-6"> {definitie ? parse(definitie) : ''} </div>
                    <div className="text-xs pt-2 italic text-gray-500"> {dictionar_name ? dictionar_name : ''} </div>
          </div> 
        </div>

      </div>
      <Pagination links={links} />
    
    </div>
  );
};

View.layout = page => <GuestLayout title="Cuvinte" children={page} />;
export default View;
