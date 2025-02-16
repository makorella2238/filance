"use client";

import Link from "next/link";
import { useState } from "react";
import { mainService } from "@/services/main.service";
import styles from "./FogotPasswordPage.module.css";

export default function FogotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError("Пользователь с таким email не найден");
      return;
    }

    setIsLoading(true);
    try {
      await mainService.resetCode({ email });
      localStorage.setItem("email", email);
      setError(""); // Сбрасываем ошибку при успешном запросе
    } catch {
      setError("Пользователь с таким email не найден");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Восстановление доступа</h2>

        <div className={styles.formContent}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Ваш email</label>
            <input
              type="email"
              placeholder="Введите свой email"
              className={`${styles.input} ${error ? styles.errorInput : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <span className={styles.errorText}>{error}</span>}
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleSubmit}
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Отправка..." : "Восстановить доступ"}
            </button>
          </div>

          <div className={styles.linkContainer}>
            <Link href="/auth/login" className={styles.link}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
