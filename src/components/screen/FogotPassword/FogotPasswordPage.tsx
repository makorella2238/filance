"use client";

import Link from "next/link";
import { useState } from "react";
import { useResetCodeMutation } from "@/hooks/auth/auth";

export default function FogotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { resetCode, isLoading } = useResetCodeMutation();

  const handleSubmit = () => {
    if (!email) {
      setError("Введите email");
      return;
    }

    resetCode(
      { email },
      {
        onSuccess: () => {
          localStorage.setItem("email", email);
          setError("");
        },
        onError: () => {
          setError("Пользователь с таким email не найден");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex justify-center border-2 border-[#0000001A] items-center mb-12 rounded-[40px] w-full">
      {/* Контейнер с формой с добавлением обводки */}
      <div className="bg-white rounded-3xl w-full max-w-[550px] flex flex-col justify-between border-solid">
        <h2 className="text-2xl font-semibold text-center text-[#262626] mb-8">
          Восстановление доступа
        </h2>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-[304px]">
            <label className="block text-[12px] text-[#6F6F6F] text-left mb-1">
              Ваш email
            </label>
            <input
              type="email"
              placeholder="Введите свой email"
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none placeholder-[#484848] ${
                error ? "border-red-500" : "focus:ring-2 focus:ring-[#7239EA]"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <span className="text-red-500 text-xs mt-1 block text-right">
                {error}
              </span>
            )}
          </div>

          <div className="w-full max-w-[304px]">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#7239EA] rounded-[100px] text-white py-[14.5px] hover:bg-[#6229DA] transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Отправка..." : "Восстановить доступ"}
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
    </div>
  );
}
