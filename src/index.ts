// Core component
export { Scrimr } from './components/Scrimr'
export type { ScrimrProps, TransitionEffect, FontFamily, LengthMode } from './components/Scrimr'

// Specialized components
export { ScrimrText } from './components/ScrimrText'
export type { ScrimrTextProps } from './components/ScrimrText'

export { ScrimrButton } from './components/ScrimrButton'
export type { ScrimrButtonProps } from './components/ScrimrButton'

export { ScrimrCard } from './components/ScrimrCard'
export type { ScrimrCardProps } from './components/ScrimrCard'

// Hooks
export { useScrimr } from './hooks/useScrimr'
export type { UseScrimrOptions } from './hooks/useScrimr'

// Utilities
export { cn } from './lib/utils'
export { 
  generateScrambledText, 
  generateScrambledTextWithSpaces,
  getCharacterPool,
  scrambleCharacter,
  getTextLength,
  createRandomSpaceConfig 
} from './lib/scramble'
export type { CharacterSet, Language, RandomSpaceConfig } from './lib/scramble'

// Attribute-based API
export { Scrimr as ScrimrAPI } from './lib/scrimr-api'
export type { ScrimrAttributeOptions, ScrimrElementState } from './lib/scrimr-api'