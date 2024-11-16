'use client';

import React, { FC } from 'react';
import Link from 'next/link';

const Navigation: FC = () => {
  return (
    <div className="text-center mt-5">
      <div className="flex flex-col md:flex-row justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2">
        <Link
          href="/"
          className="inline-block px-4 py-2 font-semibold rounded-lg border text-gray-500 bg-gray-300 border-gray-400 hover:bg-gray-400 hover:hover:border-gray-500"
        >
          Home
        </Link>
        <Link
          href="/scheduler"
          className="inline-block px-4 py-2 font-semibold rounded-lg border text-gray-500 bg-gray-300 border-gray-400 hover:bg-gray-400 hover:hover:border-gray-500"
        >
          Scheduler
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
