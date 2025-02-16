import { CodeInput } from "@/components/Codeinput/Codeinput";
import { ResendTimer } from "@/components/ResendTimer/ResendTimer";
import Link from "next/link";

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
    <div className="min-h-screen flex justify-center border-2 border-[#0000001A] items-center mb-12 rounded-[40px] w-full">
      {/* Контейнер с формой с добавлением обводки */}
      <div className="bg-white rounded-3xl w-full max-w-[550px] flex flex-col justify-between border-solid">
        <h2 className="text-2xl font-semibold text-center text-[#262626] mb-6">
          Подтверждение почты
        </h2>

        <div className="mb-3">
          <p className="text-[#484848]">
            На почту <span className="font-bold">{email}</span> был отправлен смс код
            подтверждения
          </p>
        </div>

        {/* Поле для ввода кода */}
        <CodeInput setDigits={setDigits} digits={digits} />

        {/* Отображение ошибок */}
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="mb-6">
          <ResendTimer onResendRequest={onResendCode} />
        </div>

        <div className="w-full max-w-[304px] mx-auto">
          <button
            onClick={handleSubmitCode}  // просто вызываем handleSubmitCode
            disabled={isLoading}
            className={`w-full bg-[#7239EA] rounded-[100px] text-white py-[14.5px] transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7139EA]"
            }`}
          >
            {isLoading ? "Проверка..." : "Подтвердить"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-center text-[#484848] font-medium text-[16px] mt-4 w-[304px] mx-auto">
            Уже был тут?{" "}
            <Link
              href="/auth/login"
              className="text-[#7239EA] font-medium hover:text-[#6229DA] transition-colors"
            >
              Войдите
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
