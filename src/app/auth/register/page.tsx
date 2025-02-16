"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import RegisterPage from "@/components/screen/Register/RegisterPage";
import { useRegisterMutation } from "@/hooks/auth/auth";

export type RegisterFormDataProps = {
  email: string;
  password: string;
  username: string;
  phone: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormDataProps>();

  const {
    registeration: submitRegister,
    error,
    isLoading,
  } = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormDataProps> = (data) => {
    if (
      data.email !== "" &&
      data.password !== "" &&
      data.username !== "" &&
      data.phone !== ""
    ) {
      console.log("Submitting data:", data);
      submitRegister(data)
    }
  };

  return (
    <RegisterPage
      register={register}
      errors={errors}
      touchedFields={
        touchedFields as Record<keyof RegisterFormDataProps, boolean>
      }
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      error={!!error}
    />
  );
}
