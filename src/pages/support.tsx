import {
  faBug,
  faLightbulb,
  faQuestion,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { Fragment, useEffect, useRef, useState } from 'react';

interface SupportProps {
  userId: string;
}

interface SupportState {
  error: string;
  loading: boolean;
  orientation: string;
  success: boolean;
  type: string;
}

export default function Support(props: SupportProps) {
  const [state, setState] = useState<SupportState>({
    error: '',
    loading: false,
    orientation: 'horizontal',
    success: false,
    type: '',
  });

  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    const orientation = window.innerWidth >= 500 ? 'horizontal' : 'vertical';

    if (state.orientation !== orientation) {
      setState({
        ...state,
        orientation: window.innerWidth >= 500 ? 'horizontal' : 'vertical',
      });
    }
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.type) {
      setState({
        ...state,
        error: 'You must choose a type by clicking on an icon',
      });
      return false;
    }

    setState({
      ...state,
      error: '',
      loading: true,
    });

    axios
      .post(`/api/support/`, {
        user: props.userId,
        type: state.type,
        description: descriptionInput.current!.value,
      })
      .then(() => {
        setState({ ...state, success: true });

        window.setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((response) => {
        const errorMessage =
          typeof response.response === 'undefined'
            ? 'Unknown error'
            : response.response.data.message;

        setState({
          ...state,
          error: errorMessage,
          loading: false,
        });
      });

    return true;
  };

  const typeClicked = (type: string) => {
    setState({ ...state, type });
  };

  return (
    <div id="support">
      <h1 className="my-2 text-center">Support</h1>
      <ul className="mb-5 flex w-full justify-around p-0">
        <li onClick={() => typeClicked('bug')}>
          <button
            className={`flex h-16 w-16 flex-col items-center rounded-none border border-[#6e6e6e] px-1 py-0 text-center ${
              state.type === 'bug' ? 'bg-orange text-white' : 'text-black'
            }`}
          >
            <FontAwesomeIcon className="mb-1" icon={faBug} />
            <p className="text-sm font-normal">Bug</p>
          </button>
        </li>
        <li onClick={() => typeClicked('idea')}>
          <button
            className={`flex h-16 w-16 flex-col items-center rounded-none border border-[#6e6e6e] py-0 px-1 text-center ${
              state.type === 'idea' ? 'bg-orange text-white' : 'text-black'
            }`}
          >
            <FontAwesomeIcon className="mb-1" icon={faLightbulb} />
            <p className="text-sm font-normal">Suggest an idea</p>
          </button>
        </li>
        <li onClick={() => typeClicked('add_tool')}>
          <Link href="/add_tool">
            <a
              className={`flex h-16 w-16 flex-col items-center rounded-none border border-[#6e6e6e] py-0 px-1 text-center ${
                state.type === 'add_tool'
                  ? 'bg-orange text-white'
                  : 'text-black'
              }`}
            >
              <FontAwesomeIcon className="mb-1" icon={faTools} />
              <p className="text-sm font-normal">Suggest a tool</p>
            </a>
          </Link>
        </li>
        <li onClick={() => typeClicked('else')}>
          <button
            className={`flex h-16 w-16 flex-col items-center rounded-none border border-[#6e6e6e] py-0 px-1 text-center ${
              state.type === 'else' ? 'bg-orange text-white' : 'text-black'
            }`}
          >
            <FontAwesomeIcon className="mb-1" icon={faQuestion} />
            <p className="text-sm font-normal">Else</p>
          </button>
        </li>
      </ul>
      <form className="px-8" onSubmit={submit}>
        <textarea
          className="mb-5 h-24 w-full border border-[#6e6e6e] p-2"
          placeholder="Description"
          ref={descriptionInput}
          required
        ></textarea>
        {state.error && state.orientation === 'horizontal' && (
          <p className="text-red-500">{state.error}</p>
        )}
        {state.success && state.orientation === 'horizontal' && (
          <Fragment>
            <p className="text-green-500">
              Your message has been send, thank you !
            </p>
            <p className="text-green-500">You&apos;ll be redirected soon</p>
          </Fragment>
        )}
        <input
          className="m-auto block text-center"
          type="submit"
          value="Send"
          disabled={state.loading}
        />
        {state.error && state.orientation === 'vertical' && (
          <p className="text-red-500">{state.error}</p>
        )}
        {state.success && state.orientation === 'vertical' && (
          <Fragment>
            <p className="text-green-500">
              Your message has been send, thank you !
            </p>
            <p className="text-green-500">You&apos;ll be redirected soon</p>
          </Fragment>
        )}
      </form>
    </div>
  );
}
