import Image from 'next/image';
import Link from 'next/link';
import { UseFormRegister, FieldErrors, UseFormStateReturn } from 'react-hook-form';
import { RegisterFormDataProps } from '@/app/auth/register/page';
import { useState } from 'react';

interface RegisterPageProps {
  register: UseFormRegister<RegisterFormDataProps>;
  errors: FieldErrors<RegisterFormDataProps>;
  touchedFields: Record<keyof RegisterFormDataProps, boolean>; // тип данных для touchedFields
  onSubmit: () => void;
  isLoading: boolean;
  error: boolean;
}

export default function RegisterPage({
  register,
  errors,
  touchedFields,
  onSubmit,
  isLoading,
  error,
}: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClass = (fieldName: keyof RegisterFormDataProps) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const isEmpty = !errors[fieldName] && !touchedFields[fieldName];
    const hasBeenSubmitted = isSubmitted && !isTouched;

    return `w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 ${
      (hasError && isTouched) || hasBeenSubmitted || (isEmpty && isSubmitted)
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-[#7239EA]'
    } placeholder-[#484848]`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Это предотвращает стандартную отправку формы

    setIsSubmitted(true);
    onSubmit(); // Вызываем onSubmit, если форма валидна
  };

  return (
    <div className="min-h-screen flex justify-center border-2 border-[#0000001A] items-center mb-12 rounded-[40px] w-full">
      {/* Контейнер с формой с добавлением обводки */}
      <div className="bg-white rounded-3xl w-full max-w-[550px] flex flex-col justify-between border-solid">
      <div className="flex items-center justify-center space-x-1 mb-6">
        <Image src="/auth/logo.png" alt="SpaceFreelance" width={32} height={32} />
        <h2 className="text-[28px] font-bold text-center text-black">SpaceFreelance</h2>
      </div>

      <h2 className="text-2xl font-semibold text-center text-[#262626] mb-6">Регистрация</h2>

      <form onSubmit={handleFormSubmit} className="space-y-4 max-w-[304px] mx-auto">
        <div className="w-[304px]">
          <label className="block text-sm text-[#6F6F6F] text-left">Email</label>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Некорректный email',
              },
            })}
            type="email"
            placeholder="Введите свой email"
            className={getInputClass('email')}
          />
        </div>

        <div className="w-[304px] relative">
          <div className="w-1/2 mb-1">
            <label className="block text-[#6F6F6F] text-[12px] text-left">Пароль</label>
          </div>
          <div className="relative flex items-center mb-3 w-full">
            <input
              {...register('password', {
                required: 'Обязательное поле',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Введите свой пароль"
              className={getInputClass('password')}
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-4">
              <Image src="/auth/eye.png" alt="eye" width={18} height={18} />
            </button>
          </div>
        </div>

        <div className="w-[304px]">
          <label className="block text-[12px] text-[#6F6F6F] text-left">Логин</label>
          <input
            {...register('username', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
            })}
            type="text"
            placeholder="Придумайте логин"
            className={getInputClass('username')}
          />
        </div>

        <div className="w-[304px]">
          <label className="block text-[12px] text-[#6F6F6F] text-left">Номер телефона</label>
          <input
            {...register('phone', {
              required: 'Обязательное поле',
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: 'Некорректный номер',
              },
            })}
            type="tel"
            placeholder="Введите свой номер"
            className={getInputClass('phone')}
          />
        </div>

        <div className="container mx-auto text-center">
          {error && <div className="text-red-500 mb-4">Ошибка регистрации</div>}
        </div>

        <div className="w-[304px]">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#7239EA] rounded-[100px] text-white py-[14.5px] ${
              !isLoading && 'hover:bg-[#6229DA]'
            } transition-colors disabled:opacity-50`}
          >
            {isLoading ? 'Отправка данных...' : 'Зарегистрироваться'}
          </button>
        </div>

        <p className="text-center text-[#2e2e2e] text-[16px] mt-4 w-[304px] mx-auto">
          Уже был тут?{' '}
          <Link
            href="/auth/login"
            className="text-[#7239EA] font-medium hover:text-[#6229DA] transition-colors"
          >
            Войдите
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}
