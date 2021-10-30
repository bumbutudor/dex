import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { usePrevious } from 'react-use';
import SelectInput from '@/Shared/SelectInput';
import pickBy from 'lodash/pickBy';

export default () => {
  const { filters } = usePage().props;
  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    search: filters.search || '',
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      search: '',
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length
        ? pickBy(values)
        : { remember: 'forget' };
      Inertia.get(route(route().current()), query, {
        replace: true,
        preserveState: true
      });
    }
  }, [values]);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));

    if (opened) setOpened(false);
  }

  return (
    <div className="flex items-center w-full mx-auto max-w-md">
      <div className="relative flex w-full bg-white rounded">
        <input
          className="relative w-full px-6 py-4 bg-orange-100 placeholder-indigo-700 rounded ring-1 ring-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          autoComplete="off"
          type="text"
          name="search"
          name="search"
          value={values.search}
          onChange={handleChange}
          placeholder="scrie aici..."
        />
      </div>
      <button
        onClick={reset}
        className="ml-3 text-xs text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
        type="button"
      >
        Resetează căutarea
      </button>
    </div>
  );
};
