"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UseFormRegister } from "react-hook-form";
import styles from "./AuthPage.module.css";

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
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoWrapper}>
          <Image
            src="/auth/logo.png"
            alt="SpaceFreelance"
            width={32}
            height={32}
          />
          <h2 className={styles.title}>SpaceFreelance</h2>
        </div>

        <h2 className={styles.subtitle}>Авторизация</h2>

        <div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Логин/email</label>
            <input
              type="text"
              placeholder="Ваш логин или email"
              className={`${styles.input} ${
                touchedFields.login && errors.login && errors.login.message
                  ? styles.inputError
                  : ""
              }`}
              {...register("login", { required: "Email is required" })}
            />
          </div>

          <div className={styles.passwordWrapper}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.passwordField}>
              <input
                {...register("password", {
                  required: "Обязательное поле",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Введите свой пароль"
                className={`${styles.input} ${
                  touchedFields.password &&
                  errors.password &&
                  errors.password.message
                    ? styles.inputError
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.eyeButton}
              >
                <Image src="/auth/eye.png" alt="eye" width={18} height={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>Ошибка авторизации</div>
          )}

          <div className={styles.inputWrapper}>
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </div>

        <div className={styles.linkWrapper}>
          <span style={{ color: "#484848", fontWeight: 500 }}>
            Впервые тут?{" "}
            <Link href="/auth/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </span>
          <div style={{ marginTop: "16px", fontWeight: 500 }}>
            <Link href="/auth/forgot-password" className={styles.link}>
              Забыл пароль?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
