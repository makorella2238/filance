'use client'

import { useState, useEffect } from "react"

type ResendTimerProps = {
  onResendRequest: () => void
}

export const ResendTimer = ({ onResendRequest }: ResendTimerProps) => {
  const [seconds, setSeconds] = useState(59)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
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

    return () => clearInterval(interval)
  }, [])

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const remainingSeconds = sec % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleResend = () => {
    setSeconds(60)
    setIsActive(true)

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
    <div style={{ textAlign: "center" }}>
      {isActive && seconds > 0 ? (
        <span style={{ color: "#333", fontSize: "14px" }}>
          Повторная отправка через {formatTime(seconds)}
        </span>
      ) : (
        <button
          onClick={handleResend}
          style={{
            background: "none",
            border: "none",
            color: "#7239EA",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            textDecoration: "underline",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#6229DA")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7239EA")}
        >
          Получить код повторно
        </button>
      )}
    </div>
  )
}
