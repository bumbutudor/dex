import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import { round } from 'lodash';

const LetterLink = ({ active, label, params }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-4 py-3',
      'border border-solid border-gray-300 rounded',
      'text-sm',
      'hover:bg-indigo-300',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-indigo-300 text-indigo-700 font-bold': active
    }
  );
  return (
    <InertiaLink className={className} href={window.location.origin + "/cuvinte?" + params}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </InertiaLink>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  const className = classNames(
    'mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray'
  );
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: label }} />
  );
};

export default () => {
  // dont render, if there's only 1 page (previous, 1, next)
  const params = new URLSearchParams(window.location.search);
  const letter = params.get('litera');
  const dictionary_id = params.get('dictionar');
  const links =
    [

      {
        "params": "dictionar=" + dictionary_id + "&litera=A",
        "label": "A",
        "active": letter === "A"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=B",
        "label": "B",
        "active": letter === "B"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=C",
        "label": "C",
        "active": letter === "C"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=D",
        "label": "D",
        "active": letter === "D"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=E",
        "label": "E",
        "active": letter === "E"
      },
      {
        "params": "http://127.0.0.1:8000/cuvinte?dictionar=2&page=6",
        "label": 6,
        "active": false
      },
      {
        "params": "http://127.0.0.1:8000/cuvinte?dictionar=2&page=7",
        "label": 7,
        "active": false
      },
      {
        "params": "http://127.0.0.1:8000/cuvinte?dictionar=2&page=8",
        "label": 8,
        "active": false
      },
      {
        "params": "http://127.0.0.1:8000/cuvinte?dictionar=2&page=9",
        "label": 9,
        "active": false
      },
      {
        "params": "http://127.0.0.1:8000/cuvinte?dictionar=2&page=10",
        "label": 10,
        "active": false
      },

    ]


  return (
    <div className="flex flex-wrap">
      {/* <span>Litere: </span> */}
      {links.map(({ active, label, params }) => {
        return params === null ? (
          <PageInactive key={label} label={label} />
        ) : (
          <LetterLink key={label} label={label} active={active} params={params} />
        );
      })}
    </div>
  );
};
