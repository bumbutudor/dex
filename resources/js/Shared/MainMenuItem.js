import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

export default ({ icon, link, text }) => { //add id export default ({ icon, link, text, id }

  let isActive = route().current(link + '*');

  // if(id){
  //   isActive = route().current(link + '*');
  // }

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-white fill-current': isActive,
    'text-indigo-400 group-hover:text-white fill-current': !isActive
  });

  const textClasses = classNames({
    'text-white font-bold': isActive,
    'text-indigo-200 group-hover:text-white font-medium': !isActive
  });

  const linkClasses = classNames({
    'flex items-center group py-2 px-2 my-1 rounded-md bg-indigo-600': isActive,
    'flex items-center group py-2 px-2 my-1 rounded-md hover:font-bold hover:bg-indigo-600': !isActive
  });

  return (
    <div className="mb-1">
      {/* <InertiaLink href={route(link, id)} className={linkClasses}> */}
      <InertiaLink href={route(link)} className={linkClasses}>
        <Icon name={icon} className={iconClasses} />
        <div id={link} className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
