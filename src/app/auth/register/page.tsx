"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import RegisterPage from "@/components/screen/Register/RegisterPage";
import { useState } from "react";
import { mainService } from "@/services/main.service";
import { useRouter } from "next/navigation";

export type RegisterFormDataProps = {
  email: string;
  password: string;
  username: string;
  phone: string;
};

export default function Home() {
  const router = useRouter();

  const methods = useForm<RegisterFormDataProps>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors, touchedFields },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormDataProps> = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await mainService.register(data);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("email", data.email);
      mainService.setAuthHeader(response.access_token);

      if (response.response.email) {
        router.push("/verify-email");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {" "}
      {/* Оборачиваем RegisterPage в FormProvider */}
      <RegisterPage
        register={methods.register}
        errors={errors}
        touchedFields={methods.formState.touchedFields} // передаем touchedFields
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
        error={!!error}
        setValue={methods.setValue}
      />
    </FormProvider>
  );
}
