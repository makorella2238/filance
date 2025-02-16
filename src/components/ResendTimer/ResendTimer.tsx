'use client'

import { useState, useEffect } from "react"

type ResendTimerProps = {
  onResendRequest: () => void
}

export const ResendTimer = ({ onResendRequest }: ResendTimerProps) => {
  const [seconds, setSeconds] = useState(59)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    // Запускаем интервал сразу при монтировании
    interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, []) // Пустой массив зависимостей = запуск только при монтировании

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const remainingSeconds = sec % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleResend = () => {
    setSeconds(60)
    setIsActive(true)
    
    // Перезапускаем таймер
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    onResendRequest()
  }

  return (
    <div className="text-center">
      {isActive && seconds > 0 ? (
        <span>Повторная отправка через {formatTime(seconds)}</span>
      ) : (
        <button
          onClick={handleResend}
          className="text-[#7239EA] hover:text-[#6229DA] font-medium transition-colors"
        >
          Получить код повторно
        </button>
      )}
    </div>
  )
}