import { type TransitionEffect, type FontFamily } from '../components/Scrimr'
import { type CharacterSet } from './scramble'

export interface ScrimrAttributeOptions {
  // Core shimmer control - 3 main parameters
  minLength?: number
  maxLength?: number
  randomSpaces?: boolean
  
  // Basic settings
  characterSet?: CharacterSet
  transitionEffect?: TransitionEffect
  transitionDuration?: number
  fontFamily?: FontFamily
  
  // Speed controls
  scrambleInterval?: number
  shimmerSpeed?: number
  
  // Shimmer settings
  enableShimmer?: boolean
  shimmerColors?: string[]
  shimmerSize?: number
  
  // Other
  variant?: 'text' | 'inline' | 'block'
  ariaLabel?: string
}

export interface ScrimrElementState {
  element: HTMLElement
  originalContent: string
  originalClasses: string
  options: ScrimrAttributeOptions
  intervalId?: ReturnType<typeof setInterval>
  isActive: boolean
}

/**
 * Parse data attributes from an element to ScrimrAttributeOptions
 */
export function parseScrimrAttributes(element: HTMLElement): ScrimrAttributeOptions {
  const dataset = element.dataset
  const options: ScrimrAttributeOptions = {}

  // Check for JSON configuration first
  if (dataset.scrimr && dataset.scrimr !== 'true') {
    try {
      const jsonConfig = JSON.parse(dataset.scrimr)
      Object.assign(options, jsonConfig)
    } catch (e) {
      console.warn('Invalid JSON in data-scrimr attribute:', dataset.scrimr)
    }
  }

  // Core parameters (override JSON if specified)
  if (dataset.scrimrMinLength) options.minLength = parseInt(dataset.scrimrMinLength, 10)
  if (dataset.scrimrMaxLength) options.maxLength = parseInt(dataset.scrimrMaxLength, 10)
  if (dataset.scrimrRandomSpaces) options.randomSpaces = dataset.scrimrRandomSpaces === 'true'

  // Basic settings
  if (dataset.scrimrCharacterSet) options.characterSet = dataset.scrimrCharacterSet as CharacterSet
  if (dataset.scrimrTransitionEffect) options.transitionEffect = dataset.scrimrTransitionEffect as TransitionEffect
  if (dataset.scrimrTransitionDuration) options.transitionDuration = parseInt(dataset.scrimrTransitionDuration, 10)
  if (dataset.scrimrFontFamily) options.fontFamily = dataset.scrimrFontFamily as FontFamily

  // Speed controls
  if (dataset.scrimrScrambleInterval) options.scrambleInterval = parseInt(dataset.scrimrScrambleInterval, 10)
  if (dataset.scrimrShimmerSpeed) options.shimmerSpeed = parseFloat(dataset.scrimrShimmerSpeed)

  // Shimmer settings
  if (dataset.scrimrEnableShimmer) options.enableShimmer = dataset.scrimrEnableShimmer === 'true'
  if (dataset.scrimrShimmerSize) options.shimmerSize = parseInt(dataset.scrimrShimmerSize, 10)
  
  // Parse shimmer colors (JSON array or single color)
  if (dataset.scrimrShimmerColors) {
    try {
      options.shimmerColors = JSON.parse(dataset.scrimrShimmerColors)
    } catch (e) {
      // If not JSON, treat as single color
      options.shimmerColors = [dataset.scrimrShimmerColors]
    }
  }

  // Other settings
  if (dataset.scrimrVariant) options.variant = dataset.scrimrVariant as 'text' | 'inline' | 'block'
  if (dataset.scrimrAriaLabel) options.ariaLabel = dataset.scrimrAriaLabel

  return options
}

/**
 * Apply default values to ScrimrAttributeOptions
 */
export function applyDefaultOptions(options: ScrimrAttributeOptions): Required<ScrimrAttributeOptions> {
  return {
    // Core defaults
    minLength: options.minLength ?? 10,
    maxLength: options.maxLength ?? 30,
    randomSpaces: options.randomSpaces ?? false,
    
    // Basic defaults
    characterSet: options.characterSet ?? 'alphanumeric',
    transitionEffect: options.transitionEffect ?? 'decode',
    transitionDuration: options.transitionDuration ?? 1000,
    fontFamily: options.fontFamily ?? 'mono',
    
    // Speed defaults
    scrambleInterval: options.scrambleInterval ?? 50,
    shimmerSpeed: options.shimmerSpeed ?? 3,
    
    // Shimmer defaults
    enableShimmer: options.enableShimmer ?? true,
    shimmerColors: options.shimmerColors ?? ['#9333ea', '#ec4899', '#3b82f6'],
    shimmerSize: options.shimmerSize ?? 200,
    
    // Other defaults
    variant: options.variant ?? 'inline',
    ariaLabel: options.ariaLabel ?? 'Loading...'
  }
}

/**
 * Check if element should be processed by Scrimr
 */
export function isScrimrElement(element: HTMLElement): boolean {
  const scrimrData = element.dataset.scrimr
  return scrimrData === 'true' || (Boolean(scrimrData) && scrimrData !== 'false' && scrimrData !== '')
}