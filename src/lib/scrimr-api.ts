import {
  scanAndInit,
  initElement,
  destroyElement,
  completeElement,
  updateElement,
  getElementState,
  getAllActiveElements,
  destroyAll
} from './scrimr-scanner'
import type { ScrimrAttributeOptions, ScrimrElementState } from './scrimr-attributes'

/**
 * Main Scrimr API for attribute-based usage
 */
export class ScrimrAPI {
  private static instance: ScrimrAPI | null = null
  private initialized = false

  private constructor() {}

  static getInstance(): ScrimrAPI {
    if (!ScrimrAPI.instance) {
      ScrimrAPI.instance = new ScrimrAPI()
    }
    return ScrimrAPI.instance
  }

  /**
   * Initialize Scrimr by scanning for all data-scrimr elements
   */
  init(container?: Document | HTMLElement): ScrimrElementState[] {
    this.initialized = true
    return scanAndInit(container)
  }

  /**
   * Auto-initialize when DOM is ready (if not manually initialized)
   */
  autoInit(): void {
    if (this.initialized) return

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.init()
      })
    } else {
      this.init()
    }
  }

  /**
   * Initialize Scrimr effect on a specific element
   */
  initElement(element: HTMLElement | string, options?: ScrimrAttributeOptions): ScrimrElementState | null {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return null
    
    return initElement(el, options)
  }

  /**
   * Destroy Scrimr effect on an element
   */
  destroy(element: HTMLElement | string): boolean {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return false
    
    return destroyElement(el)
  }

  /**
   * Complete loading for an element (stop shimmer, show final content)
   */
  complete(element: HTMLElement | string, finalText?: string): boolean {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return false
    
    return completeElement(el, finalText)
  }

  /**
   * Update options for an active element
   */
  update(element: HTMLElement | string, options: Partial<ScrimrAttributeOptions>): boolean {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return false
    
    return updateElement(el, options)
  }

  /**
   * Get state of an active element
   */
  getState(element: HTMLElement | string): ScrimrElementState | null {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return null
    
    return getElementState(el)
  }

  /**
   * Get all active Scrimr elements
   */
  getAllActive(): ScrimrElementState[] {
    return getAllActiveElements()
  }

  /**
   * Destroy all active Scrimr elements
   */
  destroyAll(): void {
    destroyAll()
    this.initialized = false
  }

  /**
   * Check if an element is currently managed by Scrimr
   */
  isActive(element: HTMLElement | string): boolean {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element
    if (!el) return false
    
    return getElementState(el) !== null
  }

  /**
   * Batch operations on multiple elements
   */
  batch(selector: string, operation: 'init' | 'destroy' | 'complete', options?: any): number {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>
    let count = 0

    elements.forEach(element => {
      let success = false
      switch (operation) {
        case 'init':
          success = this.initElement(element, options) !== null
          break
        case 'destroy':
          success = this.destroy(element)
          break
        case 'complete':
          success = this.complete(element, options)
          break
      }
      if (success) count++
    })

    return count
  }
}

/**
 * Global Scrimr instance
 */
export const Scrimr = ScrimrAPI.getInstance()

// Auto-initialize if we're in a browser environment
if (typeof window !== 'undefined') {
  Scrimr.autoInit()
}

// Export types
export type { ScrimrAttributeOptions, ScrimrElementState }