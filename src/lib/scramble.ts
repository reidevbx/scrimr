export type CharacterSet = 'alphanumeric' | 'letters' | 'numbers' | 'symbols' | 'all'
export type Language = 'en' | 'zh' | 'ja' | 'auto'

export interface RandomSpaceConfig {
  enabled: boolean
  spaceFrequency: number
  wordLengthRange: [number, number]
  language: Language
}

const CHARACTER_SETS = {
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
} as const

// Language-specific space patterns
const LANGUAGE_PRESETS: Record<Language, Omit<RandomSpaceConfig, 'enabled' | 'language'>> = {
  en: {
    spaceFrequency: 0.18,
    wordLengthRange: [3, 8],
  },
  zh: {
    spaceFrequency: 0.05,
    wordLengthRange: [1, 4],
  },
  ja: {
    spaceFrequency: 0.08,
    wordLengthRange: [2, 6],
  },
  auto: {
    spaceFrequency: 0.15,
    wordLengthRange: [3, 7],
  },
}

export function getCharacterPool(sets: CharacterSet | CharacterSet[]): string {
  const setsArray = Array.isArray(sets) ? sets : [sets]
  let pool = ''
  
  for (const set of setsArray) {
    switch (set) {
      case 'letters':
        pool += CHARACTER_SETS.letters
        break
      case 'numbers':
        pool += CHARACTER_SETS.numbers
        break
      case 'symbols':
        pool += CHARACTER_SETS.symbols
        break
      case 'alphanumeric':
        pool += CHARACTER_SETS.letters + CHARACTER_SETS.numbers
        break
      case 'all':
        pool += CHARACTER_SETS.letters + CHARACTER_SETS.numbers + CHARACTER_SETS.symbols
        break
    }
  }
  
  return pool || CHARACTER_SETS.letters
}

export function generateScrambledText(
  length: number,
  characterSet: CharacterSet | CharacterSet[] = 'alphanumeric'
): string {
  const pool = getCharacterPool(characterSet)
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)]
  }
  
  return result
}

export function generateScrambledTextWithSpaces(
  length: number,
  characterSet: CharacterSet | CharacterSet[] = 'alphanumeric',
  spaceConfig?: RandomSpaceConfig
): string {
  if (!spaceConfig?.enabled) {
    return generateScrambledText(length, characterSet)
  }

  const pool = getCharacterPool(characterSet)
  const preset = LANGUAGE_PRESETS[spaceConfig.language]
  const spaceFrequency = spaceConfig.spaceFrequency ?? preset.spaceFrequency
  const [minWordLength, maxWordLength] = spaceConfig.wordLengthRange ?? preset.wordLengthRange
  
  let result = ''
  let currentPos = 0
  let wordStart = true
  
  while (currentPos < length) {
    if (wordStart) {
      // Generate a word
      const wordLength = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength
      const remainingLength = length - currentPos
      const actualWordLength = Math.min(wordLength, remainingLength)
      
      for (let i = 0; i < actualWordLength; i++) {
        result += pool[Math.floor(Math.random() * pool.length)]
        currentPos++
      }
      
      wordStart = false
    } else {
      // Decide if we should add a space
      const remainingLength = length - currentPos
      const shouldAddSpace = Math.random() < spaceFrequency && remainingLength > 1
      
      if (shouldAddSpace) {
        result += ' '
        currentPos++
        wordStart = true
      } else {
        // Continue the current word
        result += pool[Math.floor(Math.random() * pool.length)]
        currentPos++
        
        // Randomly decide to end the word
        if (Math.random() < 0.3) {
          wordStart = true
        }
      }
    }
  }
  
  // Clean up: ensure no trailing spaces and no double spaces
  return result
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/^\s+|\s+$/g, '') // Remove leading/trailing spaces
    .padEnd(length, pool[Math.floor(Math.random() * pool.length)]) // Pad to exact length if needed
    .slice(0, length) // Ensure exact length
}

export function scrambleCharacter(
  char: string,
  characterSet: CharacterSet | CharacterSet[] = 'alphanumeric'
): string {
  if (char === ' ') return ' '
  
  const pool = getCharacterPool(characterSet)
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getTextLength(text: string | undefined, defaultLength: number = 10): number {
  if (!text) return defaultLength
  return text.length
}

export function createRandomSpaceConfig(
  language: Language = 'auto',
  customConfig?: Partial<RandomSpaceConfig>
): RandomSpaceConfig {
  const preset = LANGUAGE_PRESETS[language]
  
  return {
    enabled: true,
    language,
    spaceFrequency: customConfig?.spaceFrequency ?? preset.spaceFrequency,
    wordLengthRange: customConfig?.wordLengthRange ?? preset.wordLengthRange,
  }
}