"use client";

import { CodeInput } from "@/components/Codeinput/Codeinput";
import { ResendTimer } from "@/components/ResendTimer/ResendTimer";
import Link from "next/link";
import { useState } from "react";
import styles from "./RecoveryAccessPage.module.css";
import { useRouter } from "next/navigation";
import { mainService } from "@/services/main.service";

export const RecoveryAccessPage = () => {
  const [email, setEmail] = useState("makorell@gmail.com");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResendCode = () => {
    console.log("Запрос на повторную отправку кода...");
  };

  const handleSubmitCode = async () => {
    const code = digits.join("");

    if (code.length !== 4 || !/^\d+$/.test(code)) {
      setError("Введите 4-значный код");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await mainService.resetPassword({ email, code });
      console.log("Код подтвержден!");
      router.push('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      setError("Ошибка подтверждения кода");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Восстановление доступа</h2>

        <div className={styles.emailInfo}>
          <p className={styles.emailText}>
            На почту <span className={styles.emailHighlight}>{email}</span> отправлен смс
            код подтверждения
          </p>
        </div>

        <CodeInput setDigits={setDigits} digits={digits} />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.resendTimerContainer}>
          <ResendTimer onResendRequest={handleResendCode} />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmitCode}
            disabled={isLoading}
            className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
          >
            {isLoading ? "Проверка..." : "Восстановить доступ"}
          </button>
        </div>

        <div className={styles.loginLinkContainer}>
          <Link href="/auth/login" className={styles.loginLink}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};