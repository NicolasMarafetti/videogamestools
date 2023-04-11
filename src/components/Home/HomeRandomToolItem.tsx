import Link from 'next/link';
import React from 'react';

interface HomeRandomToolItemProps {
  id: string;
  game: any;
  name: string;
  description: string;
}

export default function HomeRandomToolItem(props: HomeRandomToolItemProps) {
  return (
    <li className="mb-14 max-w-full font-light">
      <Link href={`/tool/${props.id}`}>
        <a className="flex flex-col items-start duration-1000 hover:scale-105 hover:border-0 hover:no-underline hover:brightness-150">
          <div
            className="flex h-40 w-40 items-center justify-center border border-black bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${props.game.imageSource}')`,
            }}
          >
            {props.game && !props.game.imageSource && <p>{props.game.name}</p>}
          </div>
          <div className="mb-4 flex justify-between text-[#5b6870] sm:mb-0 sm:flex-col-reverse sm:items-center xl:w-full xl:px-4">
            <div className="mr-2 flex-1 overflow-hidden">
              <h3 className="my-2 max-w-[10rem] overflow-hidden truncate text-sm sm:m-0 xl:my-1">
                {props.name}
              </h3>
              <p className="max-w-[10rem] truncate break-words text-xs xl:my-1">
                {props.description}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
