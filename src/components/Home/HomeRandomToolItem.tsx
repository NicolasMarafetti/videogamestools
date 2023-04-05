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
    <li className="mb-14 flex max-w-full flex-col font-light sm:w-[24vw] xl:w-[10vw]">
      <div className="mb-4 flex justify-between sm:mb-0 sm:flex-col-reverse sm:items-center xl:w-full xl:px-4">
        <div className="mr-2 flex-1 overflow-hidden">
          <h3 className="my-2 overflow-hidden truncate text-2xl sm:m-0 sm:text-center xl:my-1">
            {props.name}
          </h3>
          <p className="truncate break-words text-xl xl:my-1">
            {props.description}
          </p>
        </div>
        <div
          className="flex h-28 w-40 items-center justify-center border border-black bg-cover bg-center bg-no-repeat sm:h-[16.5vw] sm:w-[16.5vw] xl:h-[10vw] xl:w-[10vw]"
          style={{
            backgroundImage: `url('${props.game.imageSource}')`,
          }}
        >
          {props.game && !props.game.image && (
            <p className="text-center">{props.game.name}</p>
          )}
        </div>
      </div>
      <Link href={`/tool/${props.id}`}>
        <a className="flex h-10 w-40 items-center justify-center self-center rounded-full bg-orange font-semibold text-white">
          See tool
        </a>
      </Link>
    </li>
  );
}
