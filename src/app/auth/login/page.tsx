'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import AuthPage from '@/components/screen/Login/LoginPage';
import { mainService } from '@/services/main.service';

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<LoginFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setError(false);
    
    try {
      const response = await mainService.login(data);
      localStorage.setItem('access_token', response.access_token);
      mainService.setAuthHeader(response.access_token);
      router.push('/');
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPage
      register={register} 
      handleSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}  
      error={error}
      errors={errors}
      touchedFields={touchedFields}  
    />
  );
}
