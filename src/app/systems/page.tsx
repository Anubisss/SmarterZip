'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useSelectSystem, useSystems } from '../apiHooks/systems';
import Footer from '../components/footer';

const Systems = () => {
  const router = useRouter();

  const { data: systems, error, isFetching } = useSystems();
  const { mutate: selectSystem, isPending: isSelectingSystem } = useSelectSystem();

  const handleSystemSelect = async (systemUuid: string) => {
    selectSystem(systemUuid, {
      onSuccess: () => router.replace('/'),
    });
  };

  const showLoadingIndicator = isFetching || isSelectingSystem || !systems;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700 dark:text-gray-400">
          Select a System
        </h2>
        {showLoadingIndicator && (
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
          </div>
        )}
        {!showLoadingIndicator && error && (
          <p className="text-red-500">Can&apos;t load the systems. Try reload.</p>
        )}
        {!showLoadingIndicator && !error && (
          <div className="flex flex-wrap justify-center gap-6">
            {systems.map((system) => (
              <div
                key={system.uuid}
                className="rounded-lg bg-gray-200 p-4 shadow-md dark:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                  {system.name}
                </h3>
                <p className="text-sm dark:text-gray-500">{system.owner}</p>
                <p className="text-sm dark:text-gray-500">{system.uuid}</p>
                <div className="mt-4 text-right">
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-800 dark:text-gray-300 dark:hover:bg-blue-600"
                    onClick={() => handleSystemSelect(system.uuid)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Systems;
