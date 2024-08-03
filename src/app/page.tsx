'use client';

import React, { useEffect, useState } from 'react';

interface Room {
  id: number;
  name: string;
  connected: boolean;
}

const Home = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch('/api/rooms');
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">SmarterZip</h1>
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        {!loading && error && (
          <p className="text-xl text-red-500 text-center">
            Can&apos;t load the systems. Try reload.
          </p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 rounded-lg shadow-md ${
                  room.connected ? 'bg-white' : 'bg-gray-300'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                <p className="text-xs text-gray-600">#{room.id}</p>
                {!room.connected && (
                  <p className="text-sm text-red-500">
                    This room is offline or not properly configured. Cannot find in Zipato by ID.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
