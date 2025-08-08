import { 
  generateScrambledText, 
  generateScrambledTextWithSpaces,
  scrambleCharacter,
  createRandomSpaceConfig
} from './scramble'
import type { ScrimrElementState } from './scrimr-attributes'

/**
 * Generate shimmer CSS gradient
 */
export function generateShimmerGradient(colors: string[]): string {
  // Create seamless gradient with repeated colors for smooth loop
  const seamlessColors = [...colors, colors[0]]
  return `linear-gradient(90deg, ${seamlessColors.join(', ')})`
}

/**
 * Apply shimmer styles to element
 */
export function applyShimmerStyles(element: HTMLElement, state: ScrimrElementState): void {
  const { options } = state
  
  if (!options.enableShimmer) return

  const shimmerGradient = generateShimmerGradient(options.shimmerColors!)
  
  // Add shimmer animation keyframes if not already added
  if (!document.getElementById('scrimr-shimmer-styles')) {
    const style = document.createElement('style')
    style.id = 'scrimr-shimmer-styles'
    style.textContent = `
      @keyframes scrimr-shimmer {
        0% { background-position: -100% 50%; }
        100% { background-position: 100% 50%; }
      }
      .scrimr-shimmer-active {
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
    document.head.appendChild(style)
  }

  // Apply shimmer styles
  element.style.backgroundImage = shimmerGradient
  element.style.backgroundSize = `${options.shimmerSize}% 100%`
  element.style.animation = `scrimr-shimmer ${options.shimmerSpeed}s linear infinite`
  element.classList.add('scrimr-shimmer-active')
}

/**
 * Remove shimmer styles from element
 */
export function removeShimmerStyles(element: HTMLElement): void {
  element.style.backgroundImage = ''
  element.style.backgroundSize = ''
  element.style.animation = ''
  element.classList.remove('scrimr-shimmer-active')
  element.style.backgroundClip = ''
  // @ts-ignore - WebKit specific property
  element.style.webkitBackgroundClip = ''
  // @ts-ignore - WebKit specific property
  element.style.webkitTextFillColor = ''
}

/**
 * Apply font family styles
 */
export function applyFontStyles(element: HTMLElement, fontFamily: string): void {
  const fontClasses = {
    mono: 'scrimr-font-mono',
    sans: 'scrimr-font-sans',
    serif: 'scrimr-font-serif',
    system: 'scrimr-font-system'
  }

  // Remove existing font classes
  Object.values(fontClasses).forEach(cls => element.classList.remove(cls))
  
  // Add font styles if not already added
  if (!document.getElementById('scrimr-font-styles')) {
    const style = document.createElement('style')
    style.id = 'scrimr-font-styles'
    style.textContent = `
      .scrimr-font-mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; }
      .scrimr-font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .scrimr-font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
      .scrimr-font-system { font-family: system-ui; }
    `
    document.head.appendChild(style)
  }

  // Apply font class
  const fontClass = fontClasses[fontFamily as keyof typeof fontClasses]
  if (fontClass) {
    element.classList.add(fontClass)
  }
}

/**
 * Generate scrambled text for element
 */
export function generateElementScrambledText(state: ScrimrElementState, dynamicLength?: number): string {
  const { options } = state
  
  // Calculate display length based on mode
  let displayLength: number
  if (dynamicLength !== undefined) {
    // Use provided dynamic length (from React component)
    displayLength = dynamicLength
  } else if (options.lengthMode === 'content') {
    // Content mode - use original content length or maxLength as fallback
    displayLength = state.originalContent?.length || options.maxLength!
  } else {
    // Dynamic mode - random length between min and max
    displayLength = Math.floor(Math.random() * (options.maxLength! - options.minLength! + 1)) + options.minLength!
  }
  
  if (options.randomSpaces) {
    return generateScrambledTextWithSpaces(displayLength, options.characterSet!, createRandomSpaceConfig())
  } else {
    return generateScrambledText(displayLength, options.characterSet!)
  }
}

/**
 * Start scramble animation for element
 */
export function startScrambleAnimation(state: ScrimrElementState): void {
  const { element, options } = state
  
  if (state.intervalId) {
    clearInterval(state.intervalId)
  }
  
  if (state.lengthChangeIntervalId) {
    clearInterval(state.lengthChangeIntervalId)
  }

  // Initialize current display length
  if (options.lengthMode === 'content') {
    state.currentDisplayLength = state.originalContent?.length || options.maxLength
  } else {
    state.currentDisplayLength = Math.floor(Math.random() * (options.maxLength - options.minLength + 1)) + options.minLength
  }

  // Set initial scrambled text
  element.textContent = generateElementScrambledText(state, state.currentDisplayLength)

  // Start dynamic length changing if in dynamic mode
  if (options.lengthMode === 'dynamic' && options.lengthChangeInterval > 0) {
    state.lengthChangeIntervalId = setInterval(() => {
      if (state.isActive) {
        state.currentDisplayLength = Math.floor(Math.random() * (options.maxLength - options.minLength + 1)) + options.minLength
      }
    }, options.lengthChangeInterval)
  }

  // Start scramble interval
  if (options.scrambleInterval > 0) {
    state.intervalId = setInterval(() => {
      if (state.isActive) {
        element.textContent = generateElementScrambledText(state, state.currentDisplayLength)
      }
    }, options.scrambleInterval)
  }
}

/**
 * Stop scramble animation for element
 */
export function stopScrambleAnimation(state: ScrimrElementState): void {
  if (state.intervalId) {
    clearInterval(state.intervalId)
    state.intervalId = undefined
  }
  
  if (state.lengthChangeIntervalId) {
    clearInterval(state.lengthChangeIntervalId)
    state.lengthChangeIntervalId = undefined
  }
}

/**
 * Handle transition when loading completes
 */
export function handleTransition(state: ScrimrElementState, targetText: string): void {
  const { element, options } = state

  // Stop scrambling during transition
  stopScrambleAnimation(state)

  switch (options.transitionEffect) {
    case 'instant':
      element.textContent = targetText
      break
      
    case 'fade':
      element.style.opacity = '0'
      setTimeout(() => {
        element.textContent = targetText
        element.style.opacity = '1'
        element.style.transition = 'opacity 300ms'
        setTimeout(() => {
          element.style.transition = ''
        }, 300)
      }, 100)
      break
      
    case 'typewriter':
      let charIndex = 0
      const typeInterval = options.transitionDuration! / targetText.length
      
      const typeTimer = setInterval(() => {
        if (charIndex <= targetText.length) {
          element.textContent = targetText.slice(0, charIndex)
          charIndex++
        } else {
          clearInterval(typeTimer)
        }
      }, typeInterval)
      break
      
    case 'decode':
      const steps = Math.ceil(options.transitionDuration! / 50)
      let step = 0
      
      const decodeTimer = setInterval(() => {
        if (step < steps) {
          const progress = step / steps
          const decoded = targetText.split('').map((char) => {
            if (Math.random() < progress) {
              return char
            }
            return char === ' ' ? ' ' : scrambleCharacter(char, options.characterSet!)
          }).join('')
          
          element.textContent = decoded
          step++
        } else {
          element.textContent = targetText
          clearInterval(decodeTimer)
        }
      }, 50)
      break
  }
}