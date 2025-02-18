import Image from "next/image";
import Link from "next/link";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { RegisterFormDataProps } from "@/app/auth/register/page";
import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface RegisterPageProps {
  register: UseFormRegister<RegisterFormDataProps>;
  errors: FieldErrors<RegisterFormDataProps>;
  touchedFields: Partial<Record<keyof RegisterFormDataProps, boolean>>;
  onSubmit: () => void;
  isLoading: boolean;
  error: boolean;
  setValue: UseFormSetValue<RegisterFormDataProps>;
}

export default function RegisterPage({
  register,
  errors,
  touchedFields,
  onSubmit,
  isLoading,
  error,
  setValue,
}: RegisterPageProps) {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (phone: string) => {
    setPhone(phone);
    setValue("phone", phone, { shouldValidate: true });
  };

  const getInputClass = (fieldName: keyof RegisterFormDataProps) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    return [styles.input, isTouched && hasError ? styles.errorInput : ""].join(
      " "
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/auth/logo.png"
            alt="SpaceFreelance"
            width={32}
            height={32}
          />
          <h2 className={styles.logoText}>SpaceFreelance</h2>
        </div>

        <h2 className={styles.title}>Регистрация</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className={styles.form}
        >
          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Email</label>
            <input
              {...register("email", {
                required: "Обязательное поле",
                pattern: { value: /^\S+@\S+$/i, message: "Некорректный email" },
              })}
              type="email"
              placeholder="Введите свой email"
              className={getInputClass("email")}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Логин</label>
            <input
              {...register("username", {
                required: "Обязательное поле",
                minLength: { value: 3, message: "Минимум 3 символа" },
              })}
              type="text"
              placeholder="Придумайте логин"
              className={getInputClass("username")}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Пароль</label>
            <div className={styles.passwordInputWrapper}>
              <input
                {...register("password", {
                  required: "Обязательное поле",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Введите свой пароль"
                className={getInputClass("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                <Image src="/auth/eye.png" alt="eye" width={18} height={18} />
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Номер телефона</label>
            <PhoneInput
              defaultCountry="ru"
              value={phone}
              onChange={handlePhoneChange}
              inputClassName={styles.inputPhone}
            />
          </div>

          {error && (
            <div className={styles.errorMessage}>Ошибка регистрации</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${
              isLoading ? styles.loading : ""
            }`}
          >
            {isLoading ? "Отправка данных..." : "Зарегистрироваться"}
          </button>

          <p className={styles.loginText}>
            Уже был тут?{" "}
            <Link href="/auth/login" className={styles.loginLink}>
              Войдите
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
