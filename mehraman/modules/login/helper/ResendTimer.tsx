import React, { FC } from 'react'
import { useState, useEffect } from 'react'
import { ITimerResendProps } from '../models/interfaces'

const Timer: FC<ITimerResendProps> = props => {
  const { initialMinute = 0, initialSeconds = 0, active, setActive, className } = props
  const [minutes, setMinutes] = useState(initialMinute)
  const [seconds, setSeconds] = useState(initialSeconds)
  useEffect(() => {
    if (!active) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval)
            setMinutes(initialMinute)
            setSeconds(initialSeconds)
            setActive(true)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  })

  return (
    <span className={className}>
      {minutes < 10 ? `0${minutes}` : seconds}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  )
}

export default Timer
