"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UseFormRegister } from "react-hook-form";

interface AuthPageProps {
  register: UseFormRegister<any>;
  handleSubmit: (e: any) => void;
  isLoading: boolean;
  error: boolean;
  touchedFields: Record<string, boolean | undefined>;
  errors: any;
}

const AuthPage: FC<AuthPageProps> = ({
  register,
  handleSubmit,
  isLoading,
  error,
  touchedFields,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center border-2 border-[#0000001A] items-center mb-12 rounded-[40px] w-full">
      {/* Контейнер с формой с добавлением обводки */}
      <div className="bg-white rounded-3xl w-full max-w-[550px] flex flex-col justify-between border-solid">
        <div className="flex items-center justify-center space-x-1">
          <Image
            src="/auth/logo.png"
            alt="SpaceFreelance"
            width={32}
            height={32}
          />
          <h2 className="text-[28px] font-bold text-center">SpaceFreelance</h2>
        </div>

        <h2 className="text-2xl mt-6 text-center font-medium text-[#1f1f1f]">
          Авторизация
        </h2>

        <div className="space-y-3 w-full">
          <div className="mx-auto max-w-[304px]">
            <label className="block text-[#6F6F6F] mb-1 text-[12px] text-left mt-6">
              Логин/email
            </label>
            <input
              type="text"
              placeholder="Ваш логин или email"
              className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#7239EA] placeholder-[#484848] ${
                touchedFields.email && errors.email ? "border-red-500" : ""
              }`}
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div className="w-[304px] relative mx-auto">
            <div className="w-1/2 mb-1">
              <label className="block text-[#6F6F6F] text-[12px] text-left">
                Пароль
              </label>
            </div>
            <div className="relative flex items-center mb-6 w-full">
              <input
                {...register("password", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 6,
                    message: "Минимум 6 символов",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Введите свой пароль"
                className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#7239EA] placeholder-[#484848] ${
                  touchedFields.password && errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4"
              >
                <Image src="/auth/eye.png" alt="eye" width={18} height={18} />
              </button>
            </div>
          </div>

          <div className="container mx-auto text-center">
            {error && (
              <div className="text-red-500 mb-4">Ошибка авторизации</div>
            )}
          </div>

          <div className="mx-auto max-w-[304px]">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#7239EA] rounded-[100px] text-white py-[14.5px] hover:bg-[#7139EA] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center font-medium">
          <span className="text-[#484848]">
            Впервые тут?{" "}
            <Link
              href="/auth/register"
              className="text-[#7239EA] font-medium hover:text-[#6229DA] transition-colors"
            >
              Зарегистрироваться
            </Link>
          </span>
          <div className="mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-[#7239EA] font-medium hover:text-[#6229DA] transition-colors"
            >
              Забыл пароль?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
