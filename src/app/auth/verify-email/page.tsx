'use client';

import { PreRegistrationVerificationPage } from "@/components/screen/PreRegistrationVerification/PreRegistrationVerificationPage";
import { mainService } from "@/services/main.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  
  const email = localStorage.getItem("email") || "test@gmail.ru";
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResendCode = () => {
    console.log("Запрос на повторную отправку кода...");
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const code = digits.join("");
      if (code.length !== 4 || !/^\d+$/.test(code)) {
        throw new Error("Введите 4-значный код");
      }

      console.log("Отправка данных на сервер:", { email, code });

      await mainService.verifyEmail({ email, code });

      router.push('/');

    } catch (err) {
      setError("Ошибка подтверждения кода");
      console.error("Ошибка подтверждения кода", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PreRegistrationVerificationPage
      digits={digits}
      setDigits={setDigits}
      handleSubmitCode={handleSubmitCode}
      onResendCode={handleResendCode}
      isLoading={isLoading}
      error={error}
      email={email}
    />
  );
}
