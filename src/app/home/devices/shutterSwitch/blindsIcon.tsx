'use client';

import React, { FC } from 'react';
import { FaArrowDown, FaArrowUp, FaStop } from 'react-icons/fa';

interface Props {
  value: number;
  onClickArrowUp?: () => void;
  onClickStop?: () => void;
  onClickArrowDown?: () => void;
  showHeight?: boolean;
}

const BlindsIcon: FC<Props> = ({
  value,
  onClickArrowUp,
  onClickStop,
  onClickArrowDown,
  showHeight = true,
}) => {
  const height = 100 - value;
  return (
    <div className="flex items-center">
      {onClickArrowUp && onClickStop && onClickArrowDown && (
        <div className="mr-2">
          <FaArrowUp
            className="mb-1 cursor-pointer text-2xl text-black hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
            onClick={onClickArrowUp}
          />
          <FaStop
            className="cursor-pointer text-2xl text-black hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
            onClick={onClickStop}
          />
          <FaArrowDown
            className="mt-1 cursor-pointer text-2xl text-black hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
            onClick={onClickArrowDown}
          />
        </div>
      )}
      <div>
        <div className="relative h-14 w-10 border-2 border-black bg-gray-100 dark:border-gray-900 dark:bg-gray-600">
          <div
            className="absolute left-0 top-0 w-full bg-black dark:bg-gray-900"
            style={{ height: `${height}%` }}
          ></div>
        </div>
        {showHeight && <div className="text-center text-sm">{height}%</div>}
      </div>
    </div>
  );
};

export default BlindsIcon;
