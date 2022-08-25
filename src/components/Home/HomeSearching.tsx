import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';

import HomeSearchingResults from './HomeSearchingResults';

interface HomeSearchingProps {
  stopSearching: any;
}

interface HomeSearchingState {
  games: any[];
  error: boolean;
  search: string;
  tools: any[];
}

export default function HomeSearching(props: HomeSearchingProps) {
  const [state, setState] = useState<HomeSearchingState>({
    games: [],
    error: false,
    search: '',
    tools: [],
  });

  function searchChanged(e: any) {
    const newSearchValue = e.currentTarget.value;

    setState({
      ...state,
      search: newSearchValue,
    });

    if (!newSearchValue) {
      setState({
        ...state,
        search: '',
        error: false,
        games: [],
        tools: [],
      });
    } else {
      axios
        .get(`/api/search?search=${newSearchValue}`)
        .then((res) => {
          setState({
            ...state,
            search: newSearchValue,
            error: false,
            games: res.data.games,
            tools: res.data.tools,
          });
        })
        .catch((errorTmp) => {
          // eslint-disable-next-line no-console
          console.error(errorTmp);
          setState({ ...state, error: true });
        });
    }
  }

  return (
    <div className="absolute inset-0 bg-white p-4" id="home_searching">
      <div className="flex h-10 items-center">
        <div className="flex h-full flex-1 items-center border border-black px-2">
          <FontAwesomeIcon className="w-5" icon={faSearch} />
          <input
            className="h-full w-40 flex-1 px-2 text-sm font-light focus:outline-none"
            name="search"
            type="text"
            autoFocus={true}
            value={state.search}
            onChange={searchChanged}
          />
        </div>
        <FontAwesomeIcon
          className="h-10 w-10 p-2"
          icon={faTimes}
          onClick={props.stopSearching}
        />
      </div>
      <HomeSearchingResults games={state.games} tools={state.tools} />
      {state.error && <p>Error during the search</p>}
    </div>
  );
}
