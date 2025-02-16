'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { mainService } from '@/services/main.service';

export const useRegisterMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: mainService.register,
    onSuccess: (data) => {
      console.log(data);
      debugger
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('email', data.response.email);
      mainService.setAuthHeader(data.access_token);
      if (data.response.email) {
        debugger
        router.push('/verify-email');
      }
    },
    onError: (error: Error) => {
      console.error('Registration error: ', error.message);
    }
  });

  return {
    registeration: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export const useLoginMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: { email: string; password: string }) => mainService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      mainService.setAuthHeader(data.access_token);
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export const useVerifyEmailMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: (data: { email: string; code: string }) => mainService.verifyEmail(data),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Email verification failed:', error);
    },
  });

  return {
    verifyEmail: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export const useResetCodeMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ['resetCode'],
    mutationFn: (data: { email: string }) => mainService.resetCode(data),
    onSuccess: () => {
      if (localStorage.getItem('email')) {
        router.push('/recover-access-code');
      }
    },
    onError: (error: any) => {
      console.error('Reset code request failed:', error);
    },
  });

  return {
    resetCode: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export const useResetPasswordMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (data: { email: string | null; code: string }) => {
      if (!data.email) throw new Error('Email не найден в localStorage');

      return mainService.resetPassword({ email: data.email, code: data.code });
    },
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: any) => {
      console.error('Password reset failed:', error);
    },
  });

  return {
    resetPassword: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
