import React, { useEffect, useState, useRef, useMemo } from 'react'
import { cn } from '../lib/utils'
import { 
  generateScrambledText, 
  generateScrambledTextWithSpaces,
  scrambleCharacter,
  createRandomSpaceConfig,
  type CharacterSet
} from '../lib/scramble'
import { generateShimmerGradient } from '../lib/scrimr-dom-effects'

export type TransitionEffect = 'instant' | 'fade' | 'typewriter' | 'decode'

export type FontFamily = 'mono' | 'sans' | 'serif' | 'system'

export type LengthMode = 'fixed' | 'dynamic'

export interface ScrimrProps {
  className?: string
  children?: React.ReactNode
  isLoading?: boolean
  text?: string
  // Core shimmer control - only these 3 settings needed
  minLength?: number
  maxLength?: number
  randomSpaces?: boolean
  // Length control mode
  lengthMode?: LengthMode
  lengthChangeInterval?: number
  // Keep essential existing props
  characterSet?: CharacterSet | CharacterSet[]
  scrambleInterval?: number
  transitionEffect?: TransitionEffect
  transitionDuration?: number
  enableShimmer?: boolean
  shimmerColors?: string[]
  shimmerSpeed?: number
  shimmerSize?: number
  variant?: 'text' | 'inline' | 'block'
  fontFamily?: FontFamily
  ariaLabel?: string
}

export const Scrimr: React.FC<ScrimrProps> = ({
  className,
  children,
  isLoading = true,
  text,
  // Core shimmer control
  minLength = 10,
  maxLength = 30,
  randomSpaces = false,
  // Length control mode
  lengthMode = 'fixed',
  lengthChangeInterval = 150,
  // Essential props
  characterSet = 'alphanumeric',
  scrambleInterval = 50,
  transitionEffect = 'decode',
  transitionDuration = 1000,
  enableShimmer = true,
  shimmerColors = ['#9333ea', '#ec4899', '#3b82f6'],
  shimmerSpeed = 3,
  shimmerSize = 200,
  variant = 'inline',
  fontFamily = 'mono',
  ariaLabel = 'Loading...'
}) => {
  const finalText = text || (typeof children === 'string' ? children : '')
  
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [displayLength, setDisplayLength] = useState(() => {
    if (lengthMode === 'fixed') {
      return maxLength // Use maxLength as the fixed length (default: 30)
    } else {
      // Dynamic mode - start with random length
      return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
    }
  })
  
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval>>()
  const transitionIntervalRef = useRef<ReturnType<typeof setInterval>>()
  const lengthChangeIntervalRef = useRef<ReturnType<typeof setInterval>>()
  
  // Handle length changes for dynamic mode
  useEffect(() => {
    if (lengthMode === 'fixed') {
      // Fixed mode - use maxLength as the fixed length
      setDisplayLength(maxLength)
    } else if (lengthMode === 'dynamic' && isLoading && lengthChangeInterval > 0) {
      // Dynamic mode - continuously change length during loading
      lengthChangeIntervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          const newLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
          setDisplayLength(newLength)
        }
      }, lengthChangeInterval)
      
      return () => {
        if (lengthChangeIntervalRef.current) {
          clearInterval(lengthChangeIntervalRef.current)
        }
      }
    }
  }, [lengthMode, finalText.length, maxLength, minLength, lengthChangeInterval, isLoading, isTransitioning])
  
  // Generate initial scrambled text
  useEffect(() => {
    if (isLoading) {
      const initialText = randomSpaces
        ? generateScrambledTextWithSpaces(displayLength, characterSet, createRandomSpaceConfig())
        : generateScrambledText(displayLength, characterSet)
      setDisplayText(initialText)
    }
  }, [isLoading, displayLength, characterSet, randomSpaces])
  
  // Scramble animation
  useEffect(() => {
    if (isLoading && scrambleInterval > 0) {
      scrambleIntervalRef.current = setInterval(() => {
        let newText: string
        
        if (randomSpaces) {
          // Generate new text with random spaces using minLength/maxLength range
          newText = generateScrambledTextWithSpaces(displayLength, characterSet, createRandomSpaceConfig())
        } else {
          // Generate text without spaces using minLength/maxLength range  
          newText = generateScrambledText(displayLength, characterSet)
        }
        
        if (!isTransitioning) {
          setDisplayText(newText)
        }
      }, scrambleInterval)
      
      return () => {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current)
        }
      }
    }
  }, [isLoading, scrambleInterval, displayLength, characterSet, isTransitioning, randomSpaces])
  
  // Handle transition when loading completes
  useEffect(() => {
    if (!isLoading && finalText) {
      setIsTransitioning(true)
      
      switch (transitionEffect) {
        case 'instant':
          setDisplayText(finalText)
          setIsTransitioning(false)
          break
          
        case 'fade':
          setTimeout(() => {
            setDisplayText(finalText)
            setIsTransitioning(false)
          }, 100)
          break
          
        case 'typewriter':
          let charIndex = 0
          const typeInterval = transitionDuration / finalText.length
          
          transitionIntervalRef.current = setInterval(() => {
            if (charIndex <= finalText.length) {
              setDisplayText(finalText.slice(0, charIndex))
              charIndex++
            } else {
              if (transitionIntervalRef.current) {
                clearInterval(transitionIntervalRef.current)
              }
              setIsTransitioning(false)
            }
          }, typeInterval)
          break
          
        case 'decode':
          const steps = Math.ceil(transitionDuration / 50)
          let step = 0
          
          transitionIntervalRef.current = setInterval(() => {
            if (step < steps) {
              const progress = step / steps
              const decoded = finalText.split('').map((char) => {
                if (Math.random() < progress) {
                  return char
                }
                return char === ' ' ? ' ' : scrambleCharacter(char, characterSet)
              }).join('')
              
              setDisplayText(decoded)
              step++
            } else {
              setDisplayText(finalText)
              if (transitionIntervalRef.current) {
                clearInterval(transitionIntervalRef.current)
              }
              setIsTransitioning(false)
            }
          }, 50)
          break
      }
      
      return () => {
        if (transitionIntervalRef.current) {
          clearInterval(transitionIntervalRef.current)
        }
      }
    }
  }, [isLoading, finalText, transitionEffect, transitionDuration, characterSet])
  
  // Cleanup all intervals on unmount
  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
      }
      if (transitionIntervalRef.current) {
        clearInterval(transitionIntervalRef.current)
      }
      if (lengthChangeIntervalRef.current) {
        clearInterval(lengthChangeIntervalRef.current)
      }
    }
  }, [])
  
  // Shimmer gradient with smooth transitions
  const shimmerGradient = useMemo(() => {
    if (!enableShimmer) return undefined
    return generateShimmerGradient(shimmerColors)
  }, [enableShimmer, shimmerColors])
  
  const shimmerStyle: React.CSSProperties = enableShimmer ? {
    backgroundImage: shimmerGradient,
    backgroundSize: `${shimmerSize}% 100%`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `shimmer ${shimmerSpeed}s linear infinite`,
  } : {}
  
  const baseClasses = {
    text: '',
    inline: 'inline-block',
    block: 'block w-full',
  }
  
  const fontClasses = {
    mono: 'font-mono',
    sans: 'font-sans',
    serif: 'font-serif',
    system: '',
  }
  
  const transitionClasses = {
    fade: isTransitioning ? 'transition-opacity duration-300' : '',
    instant: '',
    typewriter: '',
    decode: '',
  }
  
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>
      <span
        className={cn(
          baseClasses[variant],
          transitionClasses[transitionEffect],
          isLoading && 'select-none',
          className,
          fontClasses[fontFamily] // Put font family last to ensure it overrides external styles
        )}
        style={isLoading ? shimmerStyle : undefined}
        aria-label={isLoading ? ariaLabel : undefined}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {displayText || children}
      </span>
    </>
  )
}