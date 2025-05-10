'use client';

import Link from 'next/link';
import React, { FC } from 'react';

const Navigation: FC = () => {
  return (
    <div className="mt-5 text-center">
      <div className="flex flex-col justify-center gap-x-0 gap-y-2 md:flex-row md:gap-x-2 md:gap-y-0">
        <Link
          href="/"
          className="inline-block rounded-lg border border-gray-400 bg-gray-300 px-4 py-2 font-semibold text-gray-500 hover:border-gray-500 hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
        >
          Home
        </Link>
        <Link
          href="/scheduler"
          className="inline-block rounded-lg border border-gray-400 bg-gray-300 px-4 py-2 font-semibold text-gray-500 hover:border-gray-500 hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
        >
          Scheduler
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
