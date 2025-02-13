'use client';

import React, { Suspense } from 'react';

import LoginPage from './LoginPage';

const Login = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
