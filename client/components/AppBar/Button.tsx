import * as React from 'react'
import { MouseEventHandler } from 'react'

export interface ButtonProps {
  icon: string
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  side: 'right' | 'left'
}

export const Button: React.StatelessComponent<ButtonProps> = ({
  icon,
  onClick,
  disabled,
  side
}) =>
  <button
    className={`app-bar-button${disabled ? ' disabled' : ''} ${side}`}
    onClick={onClick}
    disabled={!!disabled}
  >
    {icon}
  </button>
