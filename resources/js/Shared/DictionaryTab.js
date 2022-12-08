import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';

export default ({ link_id, link, text }) => {
  // let isActive = route().current(link);
  // console.log(link, window.location.search);
  const params = new URLSearchParams(window.location.search)

  // You can access specific parameters:
  // console.log(params.get('dictionar'), link_id);

  let isActive = params.get('dictionar') === link_id.toString()

  if (params.get('all') === '0') {
    isActive = params.get('all') === link_id.toString()
  }

  const textClasses = classNames({
    'text-indigo-700 text-lg font-bold leading-5': isActive,
    'text-indigo-500 text-lg leading-5': !isActive
  });

  const linkClasses = classNames({
    'flex items-center text-center h-16 border border-solid border-indigo-600 rounded group py-2 px-4 rounded-md bg-indigo-300': isActive,
    'flex items-center text-center h-16 border border-solid border-indigo-600 rounded group py-2 px-4 rounded-md hover:font-bold  hover:bg-indigo-200': !isActive
  });

  return (
    <div className="mb-2 w-56 flex-none">
      {/* <InertiaLink href={route(link, id)} className={linkClasses}> */}
      <InertiaLink href={link} className={linkClasses}>
        <div id={link} className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
