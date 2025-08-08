import { 
  parseScrimrAttributes, 
  applyDefaultOptions, 
  isScrimrElement,
  type ScrimrElementState,
  type ScrimrAttributeOptions
} from './scrimr-attributes'
import {
  applyShimmerStyles,
  removeShimmerStyles,
  applyFontStyles,
  startScrambleAnimation,
  stopScrambleAnimation,
  handleTransition
} from './scrimr-dom-effects'

/**
 * Global registry of active Scrimr elements
 */
const activeElements = new Map<HTMLElement, ScrimrElementState>()

/**
 * Initialize Scrimr effect on a single element
 */
export function initElement(element: HTMLElement, options?: ScrimrAttributeOptions): ScrimrElementState | null {
  // Skip if already initialized
  if (activeElements.has(element)) {
    return activeElements.get(element) || null
  }

  // Parse options from attributes or use provided options
  const parsedOptions = options || parseScrimrAttributes(element)
  const finalOptions = applyDefaultOptions(parsedOptions)

  // Store original content and classes
  const originalContent = element.textContent || ''
  const originalClasses = element.className

  // Create element state
  const state: ScrimrElementState = {
    element,
    originalContent,
    originalClasses,
    options: finalOptions,
    isActive: true
  }

  // Register element
  activeElements.set(element, state)

  // Apply styles and start animations
  applyFontStyles(element, finalOptions.fontFamily)
  applyShimmerStyles(element, state)
  startScrambleAnimation(state)

  // Add accessibility attributes
  element.setAttribute('aria-label', finalOptions.ariaLabel)
  element.setAttribute('aria-busy', 'true')
  element.setAttribute('aria-live', 'polite')

  return state
}

/**
 * Destroy Scrimr effect on an element
 */
export function destroyElement(element: HTMLElement): boolean {
  const state = activeElements.get(element)
  if (!state) return false

  // Stop animations
  stopScrambleAnimation(state)
  state.isActive = false

  // Restore original content and styles
  element.textContent = state.originalContent
  element.className = state.originalClasses
  removeShimmerStyles(element)

  // Remove accessibility attributes
  element.removeAttribute('aria-label')
  element.removeAttribute('aria-busy')
  element.removeAttribute('aria-live')

  // Unregister element
  activeElements.delete(element)

  return true
}

/**
 * Complete loading for an element (trigger transition)
 */
export function completeElement(element: HTMLElement, finalText?: string): boolean {
  const state = activeElements.get(element)
  if (!state) return false

  const targetText = finalText || state.originalContent
  
  // Mark as not loading
  state.isActive = false
  element.setAttribute('aria-busy', 'false')

  // Remove shimmer and handle transition
  removeShimmerStyles(element)
  handleTransition(state, targetText)

  return true
}

/**
 * Update options for an active element
 */
export function updateElement(element: HTMLElement, options: Partial<ScrimrAttributeOptions>): boolean {
  const state = activeElements.get(element)
  if (!state) return false

  // Update options
  Object.assign(state.options, applyDefaultOptions({ ...state.options, ...options }))

  // Restart with new options if still active
  if (state.isActive) {
    stopScrambleAnimation(state)
    applyFontStyles(element, state.options.fontFamily)
    applyShimmerStyles(element, state)
    startScrambleAnimation(state)
  }

  return true
}

/**
 * Scan and initialize all elements with data-scrimr attributes
 */
export function scanAndInit(container: Document | HTMLElement = document): ScrimrElementState[] {
  const elements = container.querySelectorAll('[data-scrimr]') as NodeListOf<HTMLElement>
  const initialized: ScrimrElementState[] = []

  elements.forEach(element => {
    if (isScrimrElement(element) && !activeElements.has(element)) {
      const state = initElement(element)
      if (state) {
        initialized.push(state)
      }
    }
  })

  return initialized
}

/**
 * Get state of an active element
 */
export function getElementState(element: HTMLElement): ScrimrElementState | null {
  return activeElements.get(element) || null
}

/**
 * Get all active elements
 */
export function getAllActiveElements(): ScrimrElementState[] {
  return Array.from(activeElements.values())
}

/**
 * Destroy all active Scrimr elements
 */
export function destroyAll(): void {
  const elements = Array.from(activeElements.keys())
  elements.forEach(element => destroyElement(element))
}