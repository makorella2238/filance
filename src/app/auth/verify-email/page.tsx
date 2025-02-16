"use client";

import { PreRegistrationVerificationPage } from "@/components/screen/PreRegistrationVerification/PreRegistrationVerificationPage";
import { useVerifyEmailMutation } from "@/hooks/auth/auth";
import { useState } from "react";

export default function VerifyEmail() {
  const [email, setEmail] = useState("makorell@gmail.com");
  // const email = localStorage.getItem('email')
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);

  const { verifyEmail, isLoading, error } = useVerifyEmailMutation();

  const handleResendCode = () => {
    console.log("Запрос на повторную отправку кода...");
  };

  const handleSubmitCode = async () => {
    try {
      const code = digits.join("");
      if (code.length !== 4 || !/^\d+$/.test(code)) {
        throw new Error("Введите 4-значный код");
      }

      console.log("Отправка данных на сервер:", { email, code });

      verifyEmail({ email, code });

    } catch (err) {
      console.error("Ошибка подтверждения кода", err);
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
