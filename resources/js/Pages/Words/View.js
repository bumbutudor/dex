import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import GuestPagination from '@/Shared/GuestPagination';
import parse from 'html-react-parser';
import GuestLayout from '@/Shared/GuestLayout';
import $ from 'jquery';
import { searchClickedWord } from '@/utils';
import DictionaryTab from '@/Shared/DictionaryTab';
import LetterFilter from '@/Shared/LetterFilter';

const View = () => {
  const { words, wordOfTheDay, dictionaries, dictionary_count } = usePage().props;

  // search the clicked word and definition 
  // $(function () {
  //   $('.word').click(searchClickedWord);
  //   $('.definition').click(searchClickedWord);
  // });

  const {
    data,
    meta: { links }
  } = words;

  // let cuvantul_zilei = data ? data[Math.floor(Math.random() * data.length)] : '';
  let cuvant_titlu = wordOfTheDay.name;
  let definitie = wordOfTheDay.definition;
  let dictionar_name = wordOfTheDay.dictionary.name;

  // console.log(links);
  const params = new URLSearchParams(window.location.search);
  const dictionaryID = params.get('dictionar');

  return (
    <div>
      <div className="flex gap-4">
        <div className="grid grid-cols-1 max-h-60">
          {dictionaries.map(({ id, name }) => (
            <DictionaryTab
              key={id}
              text={name}
              link={`?dictionar=${id}`}
              link_id={id}
            />
          ))}
          <div className="w-56">
            {params.has('dictionar') && dictionaryID && (
              <div className="w-full">
                <LetterFilter />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-w-3xl shadow-md">
          {data.map(({ id, name, definition }) => (
            <div className="px-4 w-full bg-white w-3xl py-2 border-b border-gray-400" key={id} label="cuvant">
              <h1 className="text-lg w-full">
                <a className="font-bold word">{name ? name = name.replace(/\n/g, " ") : ''}</a>
              </h1>
              <div className="text-lg w-full w-3xl leading-6 definition">{parse(definition.split('<p>&nbsp;</p>').join(''))}</div>
            </div>
          ))}

          {data.length === 0 && (
            <tr>
              <td className="px-6 py-4 border-t" colSpan="4">
                N-am găsit nimic.
              </td>
            </tr>
          )}
          <div className="px-4 w-full bg-white w-3xl py-2 border" >
            <GuestPagination links={links} />
          </div>
        </div>

        <div className="flex-1 max-w-sm w-full">
          <div className="w-full py-4 px-6  border border-indigo-200 rounded bg-orange-100 mb-2" label="cuvant">
            <h3 className="mb-2 text-lg italic text-indigo-900">Cuvântul zilei:</h3>
            <h1 className="text-3xl pb-2 w-full">
              <a className="font-bold"> {cuvant_titlu ? cuvant_titlu = cuvant_titlu.replace(/\n/g, " ") : ''} </a>
            </h1>
            <div className="text-xl w-full pr-5 leading-6"> {definitie ? parse(definitie) : ''} </div>
            <div className="text-xs pt-2 italic text-gray-500"> {dictionar_name ? dictionar_name : ''} </div>
            <div className="w-full py-4 px-6" label="imagine">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Foods_%28cropped%29.jpg/250px-Foods_%28cropped%29.jpg" alt="random image" />
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

View.layout = page => <GuestLayout title="Cuvinte" children={page} />;
export default View;
