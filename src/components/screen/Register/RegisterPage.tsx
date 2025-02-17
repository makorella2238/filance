import Image from "next/image";
import Link from "next/link";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { RegisterFormDataProps } from "@/app/auth/register/page";
import { useState } from "react";
import styles from "./RegisterPage.module.css";
import MaskedInput from "react-text-mask";

interface RegisterPageProps {
  register: UseFormRegister<RegisterFormDataProps>;
  errors: FieldErrors<RegisterFormDataProps>;
  touchedFields: Partial<Record<keyof RegisterFormDataProps, boolean>>; // корректная типизация
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
  const countryData = {
    ru: {
      name: "Россия",
      mask: [
        "+",
        "7",
        " ",
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ],
      flag: "/auth/flags/ru.png",
    },
    ua: {
      name: "Украина",
      mask: [
        "+",
        "3",
        "8",
        "0",
        " ",
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ],
      flag: "/auth/flags/ua.png",
    },
    by: {
      name: "Беларусь",
      mask: [
        "+",
        "3",
        "7",
        "5",
        " ",
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ],
      flag: "/auth/flags/by.png",
    },
  };

  const [selectedCountry, setSelectedCountry] = useState<"ru" | "ua" | "by">(
    "ru"
  );
  const [phone, setPhone] = useState("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value as "ru" | "ua" | "by");
    setPhone("");
    setValue("phone", "");
  };
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getInputClass = (fieldName: keyof RegisterFormDataProps) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName]; // Проверяем, было ли поле затронуто

    // Для поля телефона добавляем проверку на пустое значение только если оно было затронуто
    if (fieldName === "phone") {
      return [
        styles.input,
        hasError || (isTouched && !phone) ? styles.errorInput : "", // Показываем ошибку, если поле затронуто и пустое
      ].join(" ");
    }

    // Для остальных полей логика та же
    return [
      styles.input,
      isTouched && hasError ? styles.errorInput : "", // Показываем ошибку, если поле затронуто и есть ошибка
    ].join(" ");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение форм
  
    setIsSubmitted(true); // Отметим, что форма была отправлена
    onSubmit(); // Отправка формы
  };
  
  // Добавляем функцию преобразования маски в плейсхолдер
  const getMaskPlaceholder = (mask: (string | RegExp)[]) => {
    return mask
      .map((item) => {
        if (item instanceof RegExp) {
          return "_";
        }
        return item;
      })
      .join("");
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

        <form onSubmit={handleFormSubmit} className={styles.form}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Email</label>
            <input
              {...register("email", {
                required: "Обязательное поле",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Некорректный email",
                },
              })}
              type="email"
              placeholder="Введите свой email"
              className={getInputClass("email")}
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Пароль</label>
            <div className={styles.passwordInputWrapper}>
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
                className={getInputClass("password")}
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

          {/* Username Input */}
          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Логин</label>
            <input
              {...register("username", {
                required: "Обязательное поле",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
              })}
              type="text"
              placeholder="Придумайте логин"
              className={getInputClass("username")}
            />
          </div>

          {/* Phone Input с выбором страны */}
          <div className={styles.inputGroup}>
            <label className={styles.smallLabel}>Номер телефона</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className={styles.select}
              >
                {Object.entries(countryData).map(([code, data]) => (
                  <option
                    key={code}
                    value={code}
                    className={styles.selectOption}
                  >
                    {data.name}
                  </option>
                ))}
              </select>
              <Image
                src={countryData[selectedCountry].flag}
                alt={countryData[selectedCountry].name}
                width={30}
                height={30}
                className={styles.flagIcon}
              />
            </div>
            <MaskedInput
              mask={countryData[selectedCountry].mask}
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
                setValue("phone", e.target.value);
              }}
              onBlur={() => {
                setValue("phone", phone, { shouldValidate: true }); // Запуск валидации
              }}
              type="tel"
              placeholder={
                phone
                  ? ""
                  : getMaskPlaceholder(countryData[selectedCountry].mask)
              }
              className={getInputClass("phone")} // Используем общую функцию стилей
              guide={false}
              keepCharPositions={false}
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
