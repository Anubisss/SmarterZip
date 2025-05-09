import { act, renderHook } from '@testing-library/react';

import { useDeviceState } from '@/app/apiHooks/deviceStates';
import useStateRefreshStateUntilStable from './useStateRefreshStateUntilStable';

jest.mock('../../../apiHooks/deviceStates');

const mockUseDeviceState = useDeviceState as jest.Mock;

describe('useStateRefreshStateUntilStable', () => {
  const device = { stateUuid: 'abc-123' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts polling when startRefresh is called', () => {
    mockUseDeviceState.mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useStateRefreshStateUntilStable({ device }));

    act(() => {
      result.current.startRefresh();
    });

    expect(mockUseDeviceState).toHaveBeenCalledWith('abc-123', 3500);
  });

  it('stops polling when value is stable for 3 intervals', () => {
    let stateIndex = 0;
    const mockStates = [
      { data: { value: undefined } },
      { data: { value: '65' } },
      { data: { value: '75' } },
      { data: { value: '95' } },
      { data: { value: '100' } },
      { data: { value: '100' } },
      { data: { value: '100' } },
      { data: { value: undefined } },
    ];

    mockUseDeviceState.mockImplementation((_stateUuid, interval) => {
      if (interval === false) {
        return { data: undefined };
      }
      return mockStates[stateIndex++];
    });

    const { result } = renderHook(() => useStateRefreshStateUntilStable({ device }));

    act(() => {
      result.current.startRefresh();
    });

    expect(mockUseDeviceState.mock.calls[mockUseDeviceState.mock.calls.length - 4]).toEqual([
      'abc-123',
      3500,
    ]);
    expect(mockUseDeviceState.mock.calls[mockUseDeviceState.mock.calls.length - 3]).toEqual([
      'abc-123',
      3500,
    ]);
    expect(mockUseDeviceState.mock.calls[mockUseDeviceState.mock.calls.length - 2]).toEqual([
      'abc-123',
      3500,
    ]);
    expect(mockUseDeviceState).toHaveBeenLastCalledWith('abc-123', false);
  });
});
