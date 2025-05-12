'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

import { useDeviceStates } from '../apiHooks/deviceStates';
import { useLogin } from '../apiHooks/login';
import Footer from '../components/footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const isRedirected = searchParams.has('redirected');

  const { isFetching: isFetchingDeviceStates, isSuccess: isFetchingDeviceStatesSucces } =
    useDeviceStates({ enabled: !isRedirected, refetchOnWindowFocus: false });
  const {
    mutate: login,
    error: loginError,
    isPending: isLoggingIn,
  } = useLogin({
    onSuccess: () => {
      router.replace('/systems');
    },
  });

  useEffect(() => {
    if (!isRedirected && !isFetchingDeviceStates && isFetchingDeviceStatesSucces) {
      router.replace('/');
    }
  }, [isFetchingDeviceStates, isFetchingDeviceStatesSucces, isRedirected, router]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    login({ email, password });
  };

  const showLoadingIndicator = isFetchingDeviceStates || isLoggingIn;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700 dark:text-gray-400">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 dark:text-gray-500"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border bg-gray-200 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900"
              placeholder="Enter your Zipato email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 dark:text-gray-500"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border bg-gray-200 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {showLoadingIndicator && (
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
            </div>
          )}
          {!showLoadingIndicator && loginError && (
            <div className="mb-4">
              <p className="text-red-500">{loginError.message}</p>
            </div>
          )}
          {!showLoadingIndicator && (
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 dark:bg-blue-800 dark:text-gray-300 dark:hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
