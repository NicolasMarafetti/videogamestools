import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import type { ToolWithGame } from 'utils/tools';

import HomeSearchingResults from './HomeSearchingResults';

interface HomeSearchingProps {
  stopSearching: any;
}

export default function HomeSearching(props: HomeSearchingProps) {
  const [games, setGames] = useState<
    {
      id: string;
      imageSource: string;
      name: string;
    }[]
  >([]);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [tools, setTools] = useState<ToolWithGame[]>([]);

  function searchChanged(e: any) {
    setSearch(e.currentTarget.value);
  }

  useEffect(() => {
    if (!search) {
      setSearch('');
      setError(false);
      setGames([]);
      setTools([]);
    } else {
      axios
        .get(`/api/search?search=${search}`)
        .then((res) => {
          setError(false);
          setGames(res.data.games);
          setTools(res.data.tools);
        })
        .catch((errorTmp) => {
          // eslint-disable-next-line no-console
          console.error(errorTmp);
          setError(true);
        });
    }
  }, [search]);

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-scroll bg-[#080c12]"
      id="home_searching"
    >
      <div className="h-[25vh] shrink-0 bg-search-game-background bg-cover bg-center p-7">
        <div className="flex items-center">
          <div className="flex h-7 flex-1 items-center border border-black bg-[#372224] px-2">
            <MdOutlineKeyboardArrowLeft
              className="h-full scale-150 font-black text-white"
              onClick={props.stopSearching}
            />
            <input
              className="mx-5 h-full w-40 flex-1 bg-transparent px-2 text-center text-sm font-light uppercase text-[#dd8954] focus:outline-none"
              name="search"
              type="text"
              autoFocus={true}
              value={search}
              onChange={searchChanged}
            />
            <FontAwesomeIcon className="w-5 text-[#dd8954]" icon={faSearch} />
          </div>
        </div>
      </div>
      <HomeSearchingResults games={games} tools={tools} />
      {error && <p>Error during the search</p>}
    </div>
  );
}
