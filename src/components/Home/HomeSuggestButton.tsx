import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function HomeSuggestButton() {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    setMobile(isMobile);
  });

  return (
    <Link href="/add_tool">
      <a className="flex w-40 items-center rounded-full border-2 border-neutral-600 bg-none p-1 font-light">
        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-600">
          <FontAwesomeIcon className="w-4" icon={faPlus} />
        </div>
        {mobile ? 'Suggest' : 'Suggest a tool'}
      </a>
    </Link>
  );
}
