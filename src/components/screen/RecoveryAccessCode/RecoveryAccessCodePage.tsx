"use client";

import { CodeInput } from "@/components/Codeinput/Codeinput";
import { ResendTimer } from "@/components/ResendTimer/ResendTimer";
import Link from "next/link";
import { useState } from "react";
import { useResetPasswordMutation } from "@/hooks/auth/auth";

export const RecoveryAccessPage = () => {
  const [email, setEmail] = useState("makorell@gmail.com");
  // const email = localStorage.getItem("email");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const { resetPassword, isLoading } = useResetPasswordMutation();

  const handleResendCode = () => {
    console.log("Запрос на повторную отправку кода...");
  };

  const handleSubmitCode = () => {
    const code = digits.join("");

    // Валидация кода
    if (code.length !== 4 || !/^\d+$/.test(code)) {
      setError("Введите 4-значный код");
      return;
    }

    setError(""); // Очищаем ошибку перед отправкой запроса

    resetPassword(
      { email, code },
      {
        onSuccess: () => {
          console.log("Код подтвержден!");
        },
        onError: (err: any) => {
          setError("Ошибка подтверждения кода");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex justify-center border-2 border-[#0000001A] items-center mb-12 rounded-[40px] w-full">
      {/* Контейнер с формой с добавлением обводки */}
      <div className="bg-white rounded-3xl w-full max-w-[550px] flex flex-col justify-between border-solid">
        <h2 className="text-2xl font-semibold text-center text-[#262626] mb-6">
          Восстановление доступа
        </h2>

        <div className="mb-3">
          <p className="text-[#484848]">
            На почту <span className="font-bold">{email}</span> отправлен смс
            код подтверждения
          </p>
        </div>

        {/* Поле для ввода кода */}
        <CodeInput setDigits={setDigits} digits={digits} />

        {/* Отображение ошибок */}
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="mb-6">
          <ResendTimer onResendRequest={handleResendCode} />
        </div>

        <div className="w-full max-w-[304px] mx-auto">
          <button
            onClick={handleSubmitCode}
            disabled={isLoading}
            className={`w-full bg-[#7239EA] rounded-[100px] text-white py-[14.5px] transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7139EA]"
            }`}
          >
            {isLoading ? "Проверка..." : "Восстановить доступ"}
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/auth/login"
            className="text-[#7239EA] font-medium hover:text-[#6229DA] transition-colors"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
