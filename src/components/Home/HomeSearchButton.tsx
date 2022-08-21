import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { getDeviceType } from '@/utils/device';

interface HomeSearchButtonProps {
  onClick: any;
}

export default function HomeSearchButton(props: HomeSearchButtonProps) {
  const mobileType = getDeviceType();

  return (
    <button onClick={props.onClick}>
      <FontAwesomeIcon icon={faSearch} size="2x" />
      {mobileType === 'desktop' ? 'Search a game or a tool' : 'Search'}
    </button>
  );
}
