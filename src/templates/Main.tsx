import Link from 'next/link';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <nav>
      <ul className="flex">
        <li className="m-2 rounded-xl border border-black p-2">
          <Link href="/">
            <a>Accueil</a>
          </Link>
        </li>
        <li className="m-2 rounded-xl border border-black p-2">
          <Link href="/add_pokemon">
            <a>Ajouter un Pokémon</a>
          </Link>
        </li>
      </ul>
    </nav>

    <div className="content py-5 text-xl">{props.children}</div>
  </div>
);

export { Main };
