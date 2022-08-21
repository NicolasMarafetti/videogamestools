import Link from 'next/link';
import React from 'react';

interface HomeRandomToolItemProps {
  id: number;
  game: any;
  name: string;
  description: string;
}

export default function HomeRandomToolItem(props: HomeRandomToolItemProps) {
  const backgroundImageSrc =
    props.game && props.game.image ? `url('/assets/image/games/lol.jpg')` : '';

  return (
    <li>
      <div>
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
        <div
          style={{
            backgroundImage: backgroundImageSrc,
          }}
        >
          {props.game && !props.game.image && <p>{props.game.name}</p>}
        </div>
      </div>
      <Link href={`/tool/${props.id}`}>See tool</Link>
    </li>
  );
}
