'use client';

import React, { FC } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { PiSquareHalfBottomFill } from 'react-icons/pi';

interface Props {
  value: number;
  onClickArrowUp: () => void;
  onClickHalf: () => void;
  onClickArrowDown: () => void;
}

const BlindsIcon: FC<Props> = ({ value, onClickArrowUp, onClickHalf, onClickArrowDown }) => {
  const height = 100 - value;
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <FaArrowUp
          className="cursor-pointer text-2xl text-black hover:text-gray-500 mb-1"
          onClick={onClickArrowUp}
        />
        <PiSquareHalfBottomFill
          className="cursor-pointer text-2xl text-black hover:text-gray-500 rotate-180"
          onClick={onClickHalf}
        />
        <FaArrowDown
          className="cursor-pointer text-2xl text-black hover:text-gray-500 mt-1"
          onClick={onClickArrowDown}
        />
      </div>
      <div>
        <div className="relative w-10 h-14 bg-gray-100 border-2 border-black">
          <div
            className="absolute top-0 left-0 w-full bg-black"
            style={{ height: `${height}%` }}
          ></div>
        </div>
        <div className="text-center text-sm">{height}%</div>
      </div>
    </div>
  );
};

export default BlindsIcon;
