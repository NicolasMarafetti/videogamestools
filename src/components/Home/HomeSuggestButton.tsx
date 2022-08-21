import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HomeSuggestButton() {
  const [buttonText, setButtonText] = useState('Suggest');

  useEffect(() => {
    if (window && window.innerWidth >= 500) setButtonText('Suggest a tool');
  });

  return (
    <Link href="/add_tool">
      <a>
        <div>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        {buttonText}
      </a>
    </Link>
  );
}
