'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import AuthPage from '@/components/screen/Login/LoginPage';
import { useLoginMutation } from '@/hooks/auth/auth';

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<LoginFormData>();

  const { login, error, isLoading } = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {  
    login(data);
  };

  return (
    <AuthPage
      register={register} 
      handleSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}  
      error={!!error}
      errors={errors}
      touchedFields={touchedFields}  
    />
  );
}
