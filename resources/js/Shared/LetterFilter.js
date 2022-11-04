import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import { round } from 'lodash';

const LetterLink = ({ active, label, params }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-3 py-2',
      'border border-solid border-indigo-600 rounded',
      'text-sm',
      'text-indigo-600',
      'hover:bg-indigo-300',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-indigo-300 text-indigo-700 text-xl font-bold': active
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
        "params": "dictionar=" + dictionary_id + "&litera=Ă",
        "label": "Ă",
        "active": letter === "Ă"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Â",
        "label": "Â",
        "active": letter === "Â"
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
        "params": "dictionar=" + dictionary_id + "&litera=F",
        "label": "F",
        "active": letter === "F"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=G",
        "label": "G",
        "active": letter === "G"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=H",
        "label": "H",
        "active": letter === "H"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=I",
        "label": "I",
        "active": letter === "I"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Î",
        "label": "Î",
        "active": letter === "Î"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=J",
        "label": "J",
        "active": letter === "J"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=K",
        "label": "K",
        "active": letter === "K"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=L",
        "label": "L",
        "active": letter === "L"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=M",
        "label": "M",
        "active": letter === "M"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=N",
        "label": "N",
        "active": letter === "N"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=O",
        "label": "O",
        "active": letter === "O"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=P",
        "label": "P",
        "active": letter === "P"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Q",
        "label": "Q",
        "active": letter === "Q"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=R",
        "label": "R",
        "active": letter === "R"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=S",
        "label": "S",
        "active": letter === "S"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Ș",
        "label": "Ș",
        "active": letter === "Ș"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=T",
        "label": "T",
        "active": letter === "T"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Ț",
        "label": "Ț",
        "active": letter === "Ț"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=U",
        "label": "U",
        "active": letter === "U"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=V",
        "label": "V",
        "active": letter === "V"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=W",
        "label": "W",
        "active": letter === "W"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=X",
        "label": "X",
        "active": letter === "X"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Y",
        "label": "Y",
        "active": letter === "Y"
      },
      {
        "params": "dictionar=" + dictionary_id + "&litera=Z",
        "label": "Z",
        "active": letter === "Z"
      },


    ]


  return (
    <div className="flex flex-wrap items-center justify-between">
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
