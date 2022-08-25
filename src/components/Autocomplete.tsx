import type { ChangeEvent, MouseEvent } from 'react';
import React, { useState } from 'react';

interface AutocompleteProps {
  className: string;
  onChange: any;
  placeholder: string;
  required: boolean;
  suggestions: string[];
  value: string;
}

interface AutocompleteState {
  filteredSuggestions: string[];
}

export default function Autocomplete(props: AutocompleteProps) {
  const [state, setState] = useState<AutocompleteState>({
    filteredSuggestions: [],
  });

  const updateFilteredSuggestions = (new_input_value: string) => {
    const filteredSuggestions = props.suggestions.filter((suggestion) => {
      const suggestionLowerCase = suggestion.toLowerCase();
      const newValueLowerCase = new_input_value.toLowerCase();

      return (
        suggestionLowerCase !== newValueLowerCase &&
        suggestionLowerCase.indexOf(newValueLowerCase) > -1
      );
    });
    setState({ ...state, filteredSuggestions });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget!.value);

    updateFilteredSuggestions(e.currentTarget.value);
  };

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    props.onChange(e.currentTarget.innerText);

    updateFilteredSuggestions(e.currentTarget.innerText);
  };

  return (
    <div className={props.className}>
      <input
        className="m-0 w-full border border-[#999] p-2"
        placeholder={props.placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        value={props.value}
        required={props.required}
      />
      {props.value && state.filteredSuggestions.length ? (
        <ul className="m-0 max-h-[143px] list-none overflow-y-auto border border-t-0 border-[#999] pl-0">
          {state.filteredSuggestions.map(
            (suggestion: string, index: number) => {
              return (
                <li
                  className={`${
                    index !== state.filteredSuggestions.length
                      ? 'border border-[#999]'
                      : ''
                  } p-1 text-lg hover:cursor-pointer hover:bg-[#008f68] hover:font-bold hover:text-[#fae042]`}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
