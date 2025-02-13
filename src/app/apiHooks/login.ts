'use client';

import { useMutation } from '@tanstack/react-query';

interface LoginParams {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginParams): Promise<void> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
};

interface UseLoginParams {
  onSuccess: () => void;
}

export const useLogin = ({ onSuccess }: UseLoginParams) => {
  return useMutation<void, Error, LoginParams>({
    mutationFn: login,
    onSuccess,
  });
};
