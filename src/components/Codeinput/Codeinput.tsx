'use client'

import { useRef, KeyboardEvent } from "react"
import styles from "./CodeInput.module.css"

export const CodeInput = ({digits, setDigits}: {
  digits: string[], 
  setDigits: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // Логика обработчиков остается без изменений
  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits]
      newDigits[index] = value
      setDigits(newDigits)
      
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits]
        newDigits[index - 1] = ''
        setDigits(newDigits)
        inputRefs.current[index - 1]?.focus()
      }
      else if (digits[index]) {
        const newDigits = [...digits]
        newDigits[index] = ''
        setDigits(newDigits)
      }
    }
  }

  return (
    <div className={styles.container}>
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
          className={styles.inputField}
        />
      ))}
    </div>
  )
}