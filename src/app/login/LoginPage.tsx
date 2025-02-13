'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '../components/footer';
import { useLogin } from '../apiHooks/login';
import { useDeviceStates } from '../apiHooks/deviceStates';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your Zipato email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {showLoadingIndicator && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
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
