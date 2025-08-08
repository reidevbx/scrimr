import { useState, useEffect } from 'react'

export interface UseScrimrOptions {
  defaultLoading?: boolean
  loadingDuration?: number
  onLoadingComplete?: () => void
}

export function useScrimr(options: UseScrimrOptions = {}) {
  const {
    defaultLoading = true,
    loadingDuration,
    onLoadingComplete,
  } = options

  const [isLoading, setIsLoading] = useState(defaultLoading)

  useEffect(() => {
    if (loadingDuration && loadingDuration > 0 && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        onLoadingComplete?.()
      }, loadingDuration)

      return () => clearTimeout(timer)
    }
  }, [loadingDuration, isLoading, onLoadingComplete])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => {
    setIsLoading(false)
    onLoadingComplete?.()
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading,
  }
}