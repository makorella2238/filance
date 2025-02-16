'use client'

import { useRef, KeyboardEvent } from "react"

export const CodeInput = ({digits, setDigits}: {
  digits: string[], 
  setDigits: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { // Разрешаем пустую строку
      const newDigits = [...digits]
      newDigits[index] = value
      setDigits(newDigits)
      
      // Автофокус на следующее поле только если введена цифра
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      // Если поле пустое - очищаем предыдущее
      if (!digits[index] && index > 0) {
        const newDigits = [...digits]
        newDigits[index - 1] = ''
        setDigits(newDigits)
        inputRefs.current[index - 1]?.focus()
      }
      // Если есть значение - очищаем текущее
      else if (digits[index]) {
        const newDigits = [...digits]
        newDigits[index] = ''
        setDigits(newDigits)
      }
    }
  }

  return (
    <div className="flex justify-center gap-3 mb-6">
      {digits.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-[92px] h-[91px] text-3xl text-center text-[#181E2E] font-semibold border-2  border-gray-300 rounded-xl 
                     focus:border-[#7239EA] focus:outline-none focus:ring-2 focus:ring-[#7239EA]"
        />
      ))}
    </div>
  )
}