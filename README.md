# Scrimr

A React loading effect component that replaces traditional skeleton screens with scrambled text animations, designed to work seamlessly with shadcn/ui.

## Features

- 🎲 **Dynamic Scrambled Text** - Continuously changing random characters during loading
- ✨ **Shimmer Effect** - Text-based gradient shimmer animation
- 🎭 **Multiple Transition Effects** - Instant, fade, typewriter, and decode animations
- 🎨 **shadcn/ui Compatible** - Designed to work with Tailwind CSS and shadcn components
- ♿ **Accessible** - ARIA attributes and screen reader friendly
- 🎯 **TypeScript Support** - Fully typed for better developer experience

## Installation

```bash
npm install scrimr
# or
yarn add scrimr
# or
pnpm add scrimr
```

## Basic Usage

```tsx
import { Scrimr } from 'scrimr'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState('')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData('Hello, World!')
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <Scrimr isLoading={isLoading}>
      {data}
    </Scrimr>
  )
}
```

## Components

### Scrimr (Base Component)

The core component that handles all scramble animations.

```tsx
<Scrimr
  isLoading={true}
  text="Final text to display"
  characterSet="alphanumeric"
  transitionEffect="decode"
  enableShimmer={true}
>
  {children}
</Scrimr>
```

### ScrimrText

Pre-configured for text content with semantic HTML elements.

```tsx
<ScrimrText
  as="h1"
  isLoading={isLoading}
  className="text-2xl font-bold"
>
  {title}
</ScrimrText>
```

### ScrimrButton

Button component with loading state.

```tsx
<ScrimrButton
  isLoading={isLoading}
  onClick={handleClick}
  buttonClassName="bg-primary text-primary-foreground"
>
  Submit
</ScrimrButton>
```

### ScrimrCard

Card component for loading states.

```tsx
<ScrimrCard
  isLoading={isLoading}
  title={cardTitle}
  description={cardDescription}
  titleLength={25}
  descriptionLength={80}
/>
```

## Props

### ScrimrProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `true` | Controls loading state |
| `text` | `string` | - | Final text to display |
| `length` | `number` | - | Length of scrambled text (or max length in dynamic mode) |
| `lengthMode` | `LengthMode` | `'content'` | Length control mode |
| `minLength` | `number` | `1` | Minimum length for dynamic mode |
| `lengthChangeInterval` | `number` | `150` | Length change interval in ms (dynamic mode) |
| `characterSet` | `CharacterSet` | `'alphanumeric'` | Character pool for scrambling |
| `scrambleInterval` | `number` | `50` | Update interval in ms |
| `transitionEffect` | `TransitionEffect` | `'decode'` | Transition animation type |
| `transitionDuration` | `number` | `1000` | Transition duration in ms |
| `enableShimmer` | `boolean` | `true` | Enable shimmer effect |
| `shimmerColors` | `string[]` | `['#9333ea', '#ec4899', '#3b82f6']` | Gradient colors (2-3 colors) |
| `shimmerSpeed` | `number` | `3` | Shimmer animation speed (seconds) |
| `shimmerSize` | `number` | `200` | Gradient size percentage (100-500%) |
| `variant` | `'text' \| 'inline' \| 'block'` | `'inline'` | Display variant |
| `preserveSpaces` | `boolean` | `true` | Preserve space positions |
| `fontFamily` | `FontFamily` | `'mono'` | Font family style |
| `ariaLabel` | `string` | `'Loading...'` | Screen reader text |

### Character Sets

- `'letters'` - Uppercase and lowercase letters
- `'numbers'` - Digits 0-9
- `'symbols'` - Special characters
- `'alphanumeric'` - Letters and numbers
- `'all'` - All character types

### Font Families

- `'mono'` - Monospace font (default) - Best for code/technical content
- `'sans'` - Sans-serif font - Clean and modern
- `'serif'` - Serif font - Traditional and elegant
- `'system'` - System default font

### Length Modes

- `'content'` - Fixed length based on content (default)
- `'dynamic'` - Length randomly jumps between `minLength` and final length

### Display Variants

- `'text'` - Plain text with no additional styling
- `'inline'` - Inline element that flows with text (default)
- `'block'` - Block element that takes full width and stands alone

### Transition Effects

- `'instant'` - Immediate transition
- `'fade'` - Fade in/out effect
- `'typewriter'` - Character by character reveal
- `'decode'` - Gradual decode from scrambled to real text

## Hooks

### useScrimr

Hook for managing loading states.

```tsx
const { isLoading, startLoading, stopLoading } = useScrimr({
  defaultLoading: true,
  loadingDuration: 3000,
  onLoadingComplete: () => console.log('Done!')
})
```

## Examples

### With API Data

```tsx
function UserProfile() {
  const [user, setUser] = useState(null)
  const { isLoading, stopLoading } = useScrimr()

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data)
        stopLoading()
      })
  }, [])

  return (
    <div>
      <ScrimrText as="h2" isLoading={isLoading}>
        {user?.name}
      </ScrimrText>
      <ScrimrText as="p" isLoading={isLoading}>
        {user?.email}
      </ScrimrText>
    </div>
  )
}
```

### Custom Styling with Tailwind

```tsx
<Scrimr
  isLoading={isLoading}
  className="text-lg text-green-500"
  fontFamily="mono"
  enableShimmer={true}
  shimmerColors={['#10b981', '#34d399', '#6ee7b7']}
  shimmerSpeed={2} // Faster shimmer for hacker effect
>
  {hackerText}
</Scrimr>
```

### Shimmer Customization Examples

```tsx
{/* Fast emergency alert - tight gradient */}
<Scrimr 
  shimmerSpeed={1}
  shimmerSize={120}
  shimmerColors={['#dc2626', '#ef4444']}
  isLoading={isLoading}
>
  SYSTEM ERROR!
</Scrimr>

{/* Elegant effect - wide gradient */}
<Scrimr 
  shimmerSpeed={6}
  shimmerSize={300}
  shimmerColors={['#d4af37', '#ffd700', '#ffed4e']}
  isLoading={isLoading}
>
  Premium Content
</Scrimr>

{/* Professional data loading */}
<Scrimr 
  shimmerSpeed={4}
  shimmerSize={150}
  shimmerColors={['#6b7280', '#9ca3af']}
  isLoading={isLoading}
>
  Loading data...
</Scrimr>
```

### Length Mode Examples

```tsx
{/* Content mode - fixed length */}
<Scrimr 
  lengthMode="content"
  isLoading={isLoading}
>
  Fixed Length Text
</Scrimr>

{/* Dynamic mode - jumping length */}
<Scrimr 
  lengthMode="dynamic"
  minLength={3}
  lengthChangeInterval={120}
  isLoading={isLoading}
>
  Dynamic Length Text
</Scrimr>

{/* Dynamic counter with fast changes */}
<Scrimr 
  lengthMode="dynamic"
  minLength={1}
  lengthChangeInterval={80}
  characterSet="numbers"
  isLoading={isLoading}
>
  12345
</Scrimr>
```

### Display Variant Examples

```tsx
{/* Text variant - pure text, no styling */}
<p>
  This is a sentence with <Scrimr variant="text" isLoading={isLoading}>loading text</Scrimr> inline.
</p>

{/* Inline variant - flows with text (default) */}
<p>
  This is a sentence with <Scrimr variant="inline" isLoading={isLoading}>loading content</Scrimr> inline.
</p>

{/* Block variant - full width, standalone */}
<div>
  <Scrimr variant="block" isLoading={isLoading}>
    This takes the full width
  </Scrimr>
</div>
```

### Different Font Styles

```tsx
{/* Technical/Code style */}
<Scrimr fontFamily="mono" isLoading={isLoading}>
  API_KEY_12345
</Scrimr>

{/* Modern UI style */}
<Scrimr fontFamily="sans" isLoading={isLoading}>
  Welcome to Dashboard
</Scrimr>

{/* Elegant content */}
<Scrimr fontFamily="serif" isLoading={isLoading}>
  Article Title Here
</Scrimr>
```

### Dashboard Metrics

```tsx
function MetricCard({ metric, value, isLoading }) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-gray-500">{metric}</p>
      <p className="text-2xl font-bold">
        <Scrimr
          isLoading={isLoading}
          characterSet="numbers"
          length={value?.toString().length || 5}
        >
          {value}
        </Scrimr>
      </p>
    </div>
  )
}
```

## Tailwind CSS Configuration

For the shimmer effect to work properly, ensure your Tailwind config includes the necessary animation:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
      },
    },
  },
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.