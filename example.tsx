import React, { useState, useEffect } from 'react'
import { 
  Scrimr, 
  ScrimrText, 
  ScrimrButton, 
  ScrimrCard,
  useScrimr 
} from './src'

// Example 1: Basic Usage
export function BasicExample() {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setMessage('Welcome to Scrimr!')
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        <Scrimr isLoading={isLoading}>
          {message}
        </Scrimr>
      </h1>
    </div>
  )
}

// Example 2: Different Transition Effects
export function TransitionEffectsExample() {
  const [loadingStates, setLoadingStates] = useState({
    instant: true,
    fade: true,
    typewriter: true,
    decode: true,
  })

  const effects = ['instant', 'fade', 'typewriter', 'decode'] as const

  const handleLoad = (effect: string) => {
    setLoadingStates(prev => ({ ...prev, [effect]: false }))
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Transition Effects</h2>
      {effects.map(effect => (
        <div key={effect} className="flex items-center gap-4">
          <button
            onClick={() => {
              setLoadingStates(prev => ({ ...prev, [effect]: true }))
              setTimeout(() => handleLoad(effect), 1000)
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Load
          </button>
          <span className="font-mono">
            <Scrimr
              isLoading={loadingStates[effect]}
              transitionEffect={effect}
              text={`Transition: ${effect}`}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

// Example 3: Different Character Sets
export function CharacterSetsExample() {
  const { isLoading, startLoading, stopLoading } = useScrimr({
    defaultLoading: true,
  })

  const sets = [
    { type: 'letters', text: 'Letters Only' },
    { type: 'numbers', text: '1234567890' },
    { type: 'symbols', text: 'Symbols!@#' },
    { type: 'alphanumeric', text: 'Mix123ABC' },
    { type: 'all', text: 'Everything!123' },
  ] as const

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Character Sets</h2>
      <button
        onClick={() => {
          startLoading()
          setTimeout(stopLoading, 2000)
        }}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Reload All
      </button>
      {sets.map(({ type, text }) => (
        <div key={type} className="space-y-1">
          <p className="text-sm text-gray-600">{type}:</p>
          <p className="font-mono text-lg">
            <Scrimr
              isLoading={isLoading}
              characterSet={type}
              text={text}
            />
          </p>
        </div>
      ))}
    </div>
  )
}

// Example 4: Shimmer Colors
export function ShimmerExample() {
  const [isLoading, setIsLoading] = useState(true)

  const colorSets = [
    { name: 'Default', colors: ['#9333ea', '#ec4899', '#3b82f6'] },
    { name: 'Green', colors: ['#10b981', '#34d399', '#6ee7b7'] },
    { name: 'Orange', colors: ['#f97316', '#fb923c', '#fdba74'] },
    { name: 'Red', colors: ['#dc2626', '#ef4444', '#f87171'] },
  ]

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Shimmer Effects</h2>
      <button
        onClick={() => {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 3000)
        }}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Reload
      </button>
      {colorSets.map(({ name, colors }) => (
        <div key={name} className="space-y-1">
          <p className="text-sm text-gray-600">{name}:</p>
          <p className="text-2xl font-bold">
            <Scrimr
              isLoading={isLoading}
              shimmerColors={colors}
              text={`Shimmer ${name}`}
              enableShimmer={true}
            />
          </p>
        </div>
      ))}
    </div>
  )
}

// Example 5: Components Demo
export function ComponentsDemo() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Component Examples</h2>
      
      {/* Text Examples */}
      <div className="space-y-2">
        <ScrimrText as="h1" isLoading={isLoading} className="text-3xl font-bold">
          Large Heading Text
        </ScrimrText>
        <ScrimrText as="h2" isLoading={isLoading} className="text-2xl font-semibold">
          Medium Heading Text
        </ScrimrText>
        <ScrimrText as="p" isLoading={isLoading} className="text-base">
          This is a paragraph with regular text content that will be revealed after loading.
        </ScrimrText>
      </div>

      {/* Button Example */}
      <div className="flex gap-4">
        <ScrimrButton
          isLoading={isLoading}
          buttonClassName="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit Form
        </ScrimrButton>
        <ScrimrButton
          isLoading={isLoading}
          buttonClassName="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Cancel
        </ScrimrButton>
      </div>

      {/* Card Example */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrimrCard
          isLoading={isLoading}
          title="Product Feature"
          description="This is a detailed description of an amazing product feature that users will love."
          cardClassName="bg-white"
        />
        <ScrimrCard
          isLoading={isLoading}
          title="Another Feature"
          description="Another compelling feature description that highlights the value proposition."
          cardClassName="bg-gray-50"
        />
      </div>
    </div>
  )
}

// Example 6: Real World - API Data Loading
export function APIDataExample() {
  const [userData, setUserData] = useState<any>(null)
  const { isLoading, stopLoading } = useScrimr({ defaultLoading: true })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Senior Developer',
        stats: {
          projects: 42,
          commits: 1337,
          reviews: 256,
        }
      })
      stopLoading()
    }, 2500)
  }, [])

  return (
    <div className="p-4 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              <Scrimr isLoading={isLoading} maxLength={15}>
                {userData?.name}
              </Scrimr>
            </h3>
            <p className="text-gray-600">
              <Scrimr isLoading={isLoading} maxLength={25}>
                {userData?.email}
              </Scrimr>
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            <Scrimr isLoading={isLoading} maxLength={20}>
              {userData?.role}
            </Scrimr>
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                <Scrimr 
                  isLoading={isLoading} 
                  characterSet="numbers"
                  maxLength={2}
                >
                  {userData?.stats.projects}
                </Scrimr>
              </p>
              <p className="text-xs text-gray-500">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                <Scrimr 
                  isLoading={isLoading} 
                  characterSet="numbers"
                  maxLength={4}
                >
                  {userData?.stats.commits}
                </Scrimr>
              </p>
              <p className="text-xs text-gray-500">Commits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                <Scrimr 
                  isLoading={isLoading} 
                  characterSet="numbers"
                  maxLength={3}
                >
                  {userData?.stats.reviews}
                </Scrimr>
              </p>
              <p className="text-xs text-gray-500">Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Scrimr Examples
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <BasicExample />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <TransitionEffectsExample />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <CharacterSetsExample />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <ShimmerExample />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <ComponentsDemo />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <APIDataExample />
          </div>
        </div>
      </div>
    </div>
  )
}