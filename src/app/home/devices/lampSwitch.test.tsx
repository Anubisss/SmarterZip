import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useChangeDeviceState } from '@/app/apiHooks/deviceStates';
import { Device } from '../types';
import LampSwitch from './lampSwitch';

jest.mock('../../../app/apiHooks/deviceStates');

const mockChangeDeviceState = jest.fn();

const baseDevice: Device = {
  id: 123,
  name: 'Living Room Lamp',
  type: 'lampSwitch',
  roomId: 555,
  stateUuid: 'abc-123',
  state: {
    uuid: '',
    value: {
      value: 'false',
      timestamp: '',
    },
  },
};

describe('LampSwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading spinner', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should show error message', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: new Error(),
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={false} />);
    expect(screen.getByText(/can't change the state/i)).toBeInTheDocument();
  });

  it('should show the correct lamp icon when OFF', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={false} />);
    expect(screen.getByLabelText(/lamp is off/i)).toBeInTheDocument();
  });

  it('should show the correct lamp icon when ON', () => {
    const onDevice: Device = {
      ...baseDevice,
      state: { ...baseDevice.state!, value: { ...baseDevice.state!.value, value: 'true' } },
    };

    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={onDevice} isRefreshingDeviceStates={false} />);
    expect(screen.getByLabelText(/lamp is on/i)).toBeInTheDocument();
  });

  it('should call changeDeviceState when clicked, turn ON', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={false} />);
    fireEvent.click(screen.getByText('Living Room Lamp'));

    expect(mockChangeDeviceState).toHaveBeenCalledWith({
      deviceStateUuid: 'abc-123',
      newState: 'true',
    });
  });

  it('should call changeDeviceState when clicked, turn OFF', () => {
    const onDevice: Device = {
      ...baseDevice,
      state: { ...baseDevice.state!, value: { ...baseDevice.state!.value, value: 'true' } },
    };

    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={onDevice} isRefreshingDeviceStates={false} />);
    fireEvent.click(screen.getByText('Living Room Lamp'));

    expect(mockChangeDeviceState).toHaveBeenCalledWith({
      deviceStateUuid: 'abc-123',
      newState: 'false',
    });
  });

  it('should not call changeDeviceState when isRefreshingDeviceStates is true', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: null,
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={true} />);
    fireEvent.click(screen.getByText('Living Room Lamp'));

    expect(mockChangeDeviceState).not.toHaveBeenCalled();
  });

  it('should not call changeDeviceState when isPending is true', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: true,
      error: null,
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={false} />);
    fireEvent.click(screen.getByText('Living Room Lamp'));

    expect(mockChangeDeviceState).not.toHaveBeenCalled();
  });

  it('should not call mutate when error exists', () => {
    (useChangeDeviceState as jest.Mock).mockReturnValue({
      mutate: mockChangeDeviceState,
      isPending: false,
      error: new Error('Something went wrong'),
    });

    render(<LampSwitch device={baseDevice} isRefreshingDeviceStates={false} />);
    fireEvent.click(screen.getByText('Living Room Lamp'));

    expect(mockChangeDeviceState).not.toHaveBeenCalled();
  });
});
