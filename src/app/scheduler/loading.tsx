import React, { FC } from 'react';

const LoadingScreen: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-center text-3xl font-bold">Scheduler</h1>
      <div className="mt-8 flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
