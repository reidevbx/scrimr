import React from 'react'
import { Scrimr, type ScrimrProps } from './Scrimr'
import { cn } from '../lib/utils'

export interface ScrimrButtonProps extends Omit<ScrimrProps, 'variant'> {
  onClick?: () => void
  disabled?: boolean
  buttonClassName?: string
}

export const ScrimrButton: React.FC<ScrimrButtonProps> = ({
  onClick,
  disabled,
  buttonClassName,
  className,
  isLoading = true,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonClassName
      )}
    >
      <Scrimr
        variant="inline"
        className={className}
        isLoading={isLoading}
        {...props}
      />
    </button>
  )
}