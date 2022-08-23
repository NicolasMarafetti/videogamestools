import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { getDeviceType } from '@/utils/device';

interface HomeSearchButtonProps {
  onClick: any;
}

export default function HomeSearchButton(props: HomeSearchButtonProps) {
  const [mobileType, setMobileType] = useState('desktop');

  useEffect(() => {
    setMobileType(getDeviceType());
  });

  return (
    <button
      className="flex w-40 items-center border-2 border-black bg-transparent p-2 text-black sm:w-60 xl:mb-4 xl:w-80 xl:p-4"
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        className="mr-4 inline-block w-6 xl:mr-7"
        icon={faSearch}
        size="xs"
      />
      {mobileType === 'desktop' ? 'Search a game or a tool' : 'Search'}
    </button>
  );
}
