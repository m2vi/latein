import React, { HTMLAttributes, useRef, useState } from 'react';

import Full from './Full';
import { IoLockClosed } from 'react-icons/io5';
import { useRouter } from 'next/router';
import auth from '@utils/security/auth';
import Head from 'next/head';

const Login = () => {
  return (
    <Full className="grid place-items-center">
      <Head>
        <title>Login</title>
        <link rel="icon" type="image/svg+xml" href="/favicon/filmlist/favicon.svg" />
      </Head>
      <Input placeholder="the word" className="max-w-xs mb-8" />
    </Full>
  );
};

export default Login;

export const Input = ({ className, ...props }: HTMLAttributes<HTMLInputElement>) => {
  const [extraClass, setExtraClass] = useState('');
  const [disabled, setDisabled] = useState(false);
  const cn = `w-full py-2 rounded-0 text-primary-100 placeholder-primary-300 border-0 p-0 font-base bg-transparent`;
  const Router = useRouter();
  const ref = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (disabled) return;
    e?.preventDefault();
    setExtraClass('');
    setDisabled(true);

    const value = ref?.current?.value;
    if (value === '' || !value) return setDisabled(false);

    try {
      fetch('/api/auth/create', {
        headers: new Headers({ token: value }),
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            setExtraClass('swiggle');
            return;
          }

          if (data.token) {
            auth.createCookie(data.token);
            Router.replace('/');
          }
        });
    } catch (error) {}

    setDisabled(false);
  };

  return (
    <span className={`border mb-8 rounded-8 overflow-hidden border-input ${extraClass}`}>
      <form
        className="flex w-full items-center overflow-hidden"
        style={{
          maxWidth: '250px',
          height: '41px',
        }}
        action=""
        method="get"
        onSubmit={handleSubmit}
      >
        <div className="h-full grid place-items-center cursor-pointer" style={{ aspectRatio: '1 / 1' }} onClick={() => handleSubmit(null)}>
          <IoLockClosed className="h-3 w-3" />
        </div>
        <input type="password" className={cn} {...props} data-testid="input" autoComplete="on" ref={ref} />
        <div className="h-full grid place-items-center  pointer-events-none" style={{ aspectRatio: '1 / 1' }} onClick={() => handleSubmit(null)}>
          <IoLockClosed className="h-3 w-3 invisible" />
        </div>
      </form>
    </span>
  );
};
