import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import error from 'next/error';
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
        error: false,
        games: [],
        tools: [],
      });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}search?search=${newSearchValue}`
        )
        .then((res) => {
          setState({
            ...state,
            error: false,
            games: res.data.games,
            tools: res.data.tools,
          });
        })
        .catch(() => {
          setState({ ...state, error: true });
        });
    }
  }

  return (
    <div id="home_searching">
      <div>
        <div>
          <FontAwesomeIcon icon={faSearch} size="2x" />
          <input
            name="search"
            type="text"
            autoFocus={true}
            value={state.search}
            onChange={searchChanged}
          />
        </div>
        <FontAwesomeIcon
          className="h-4 w-4 p-4"
          icon={faTimes}
          size="2x"
          onClick={props.stopSearching}
        />
      </div>
      <HomeSearchingResults games={state.games} tools={state.tools} />
      {error && <p>Error during the search</p>}
    </div>
  );
}
