'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Footer from '../components/footer';
import { useSelectSystem, useSystems } from '../apiHooks/systems';

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Select a System</h2>
        {showLoadingIndicator && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        {!showLoadingIndicator && error && (
          <p className="text-red-500">Can&apos;t load the systems. Try reload.</p>
        )}
        {!showLoadingIndicator && !error && (
          <div className="flex flex-wrap justify-center gap-6">
            {systems.map((system) => (
              <div key={system.uuid} className="bg-gray-200 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">{system.name}</h3>
                <p className="text-sm">{system.owner}</p>
                <p className="text-sm">{system.uuid}</p>
                <div className="mt-4 text-right">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
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
