import React, { useEffect, useState, useRef } from 'react'
import { cn } from './lib/utils'

interface ScrimrProps {
  /** Whether to show loading shimmer effect */
  isLoading: boolean
  /** Content to display when not loading */
  children: React.ReactNode
  /** Length of placeholder text (default: 20) */
  length?: number
  /** Update interval in milliseconds (default: 100) */
  speed?: number
  /** Custom character set for random text (default: mixed letters, numbers, symbols) */
  chars?: string
  /** Additional CSS classes */
  className?: string
}

// Default character set: mixed letters, numbers, symbols
const DEFAULT_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*    '

const generateRandomText = (length: number, chars: string): string => {
  return Array.from({ length }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

/**
 * Simple shimmer text component
 * Shows animated random text while loading
 */
export const Scrimr: React.FC<ScrimrProps> = ({
  isLoading,
  children,
  length = 20,
  speed = 100,
  chars = DEFAULT_CHARS,
  className
}) => {
  const [shimmerText, setShimmerText] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (isLoading) {
      // Generate initial text
      setShimmerText(generateRandomText(length, chars))
      
      // Start shimmer animation
      intervalRef.current = setInterval(() => {
        setShimmerText(generateRandomText(length, chars))
      }, speed)
    } else {
      // Clear interval when not loading
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    // Cleanup on unmount or when isLoading changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isLoading, length, speed, chars])

  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <span
      className={cn(
        'inline-block animate-pulse text-gray-400 select-none w-full truncate',
        className
      )}
      aria-label="Loading content"
      aria-busy="true"
    >
      {shimmerText}
    </span>
  )
}

export default Scrimr