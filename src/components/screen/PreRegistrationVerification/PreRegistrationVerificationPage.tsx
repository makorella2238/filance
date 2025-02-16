import { CodeInput } from "@/components/Codeinput/Codeinput";
import { ResendTimer } from "@/components/ResendTimer/ResendTimer";
import Link from "next/link";
import styles from "./PreRegistrationVerificationPage.module.css";

export const PreRegistrationVerificationPage = ({
  handleSubmitCode,
  digits,
  setDigits,
  onResendCode,
  isLoading,
  error,
  email
}: any) => {

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Подтверждение почты</h2>

        <div className={styles.emailInfo}>
          <p className={styles.emailText}>
            На почту <span className={styles.emailHighlight}>{email}</span> был отправлен смс код
            подтверждения
          </p>
        </div>

        <CodeInput setDigits={setDigits} digits={digits} />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.resendTimerContainer}>
          <ResendTimer onResendRequest={onResendCode} />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmitCode}
            disabled={isLoading}
            className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
          >
            {isLoading ? "Проверка..." : "Подтвердить"}
          </button>
        </div>

        <div className={styles.loginLinkContainer}>
          <p className={styles.loginText}>
            Уже был тут?{" "}
            <Link
              href="/auth/login"
              className={styles.loginLink}
            >
              Войдите
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};