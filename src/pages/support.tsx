import {
  faBug,
  faLightbulb,
  faQuestion,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { Fragment, useEffect, useRef, useState } from 'react';

interface SupportProps {
  userId: string;
}

export default function Support(props: SupportProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [success, setSuccess] = useState<boolean>(false);
  const [type, setType] = useState<string>('');

  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    const actualOrientation =
      window.innerWidth >= 500 ? 'horizontal' : 'vertical';

    if (orientation !== actualOrientation) {
      setOrientation(actualOrientation);
    }
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type.length === 0) {
      setError('You must choose a type by clicking on an icon');
      return false;
    }

    setError('');
    setLoading(true);

    axios
      .post(`/api/support/`, {
        user: props.userId,
        type,
        description: descriptionInput.current!.value,
      })
      .then(() => {
        setSuccess(true);

        window.setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((response) => {
        const errorMessage =
          typeof response.response === 'undefined'
            ? 'Unknown error'
            : response.response.data.message;

        setError(errorMessage);
        setLoading(false);
      });

    return true;
  };

  const typeClicked = (typeClickedValue: string) => {
    setType(typeClickedValue);
  };

  return (
    <div className="min-h-screen bg-[#0f111d]" id="support">
      <header className="h-[30vh] bg-support-header-background bg-cover bg-center pt-4">
        <Link href="/">
          <div className="absolute left-5 top-5">
            <Image
              alt="Video Games Tools Logo"
              src="/assets/images/logo/logo-transparent.png"
              height={70}
              width={70}
            />
          </div>
        </Link>
        <h1 className="text-center font-caveat text-6xl font-black text-white">
          Support
        </h1>
      </header>
      <main className="p-4 text-white">
        <ul className="mb-5 w-full p-0">
          <li
            className={`mb-4 duration-500 hover:-scale-y-125 ${
              type === 'bug' ? 'bg-gray-700' : 'bg-[#282935]'
            }`}
            onClick={() => typeClicked('bug')}
          >
            <button
              className={`flex h-12 w-full items-center rounded-lg px-1 py-0 text-center text-white`}
            >
              <FontAwesomeIcon className="inline-block w-10" icon={faBug} />
              <p className="text-base font-bold">Bug</p>
            </button>
          </li>
          <li
            className={`mb-4 duration-500 hover:-scale-y-125 ${
              type === 'idea' ? 'bg-gray-700' : 'bg-[#282935]'
            }`}
            onClick={() => typeClicked('idea')}
          >
            <button
              className={`flex h-12 w-full items-center rounded-lg py-0 px-1 text-center text-white`}
            >
              <FontAwesomeIcon
                className="inline-block w-10"
                icon={faLightbulb}
              />
              <p className="text-base font-bold">Suggest an idea</p>
            </button>
          </li>
          <li
            className={`mb-4 duration-500 hover:-scale-y-125 ${
              type === 'add_tool' ? 'bg-gray-700' : 'bg-[#282935]'
            }`}
            onClick={() => typeClicked('add_tool')}
          >
            <Link href="/add_tool">
              <a
                className={`flex h-12 w-full items-center rounded-lg py-0 px-1 text-center text-white hover:border-0`}
              >
                <FontAwesomeIcon className="inline-block w-10" icon={faTools} />
                <p className="text-base font-bold">Suggest a tool</p>
              </a>
            </Link>
          </li>
          <li
            className={`mb-4 duration-500 hover:-scale-y-125 ${
              type === 'else' ? 'bg-gray-700' : 'bg-[#282935]'
            }`}
            onClick={() => typeClicked('else')}
          >
            <button
              className={`flex h-12 w-full items-center rounded-lg py-0 px-1 text-center text-white`}
            >
              <FontAwesomeIcon
                className="inline-block w-10"
                icon={faQuestion}
              />
              <p className="text-base font-bold">Else</p>
            </button>
          </li>
        </ul>

        <form onSubmit={submit}>
          <textarea
            className="mb-5 h-[15vh] w-full border border-[#6e6e6e] bg-transparent p-2"
            placeholder="Description"
            ref={descriptionInput}
            required
          ></textarea>
          {error && orientation === 'horizontal' && (
            <p className="text-red-500">{error}</p>
          )}
          {success && orientation === 'horizontal' && (
            <Fragment>
              <p className="text-green-500">
                Your message has been send, thank you !
              </p>
              <p className="text-green-500">You&apos;ll be redirected soon</p>
            </Fragment>
          )}
          <input
            className="m-auto block bg-[#7823e6] text-center"
            type="submit"
            value="Send"
            disabled={loading}
          />
          {error && orientation === 'vertical' && (
            <p className="text-red-500">{error}</p>
          )}
          {success && orientation === 'vertical' && (
            <Fragment>
              <p className="text-green-500">
                Your message has been send, thank you !
              </p>
              <p className="text-green-500">You&apos;ll be redirected soon</p>
            </Fragment>
          )}
        </form>
      </main>
    </div>
  );
}
