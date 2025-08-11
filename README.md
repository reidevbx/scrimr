# Scrimr

[![npm version](https://badge.fury.io/js/scrimr.svg)](https://badge.fury.io/js/scrimr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

🎲 A **simple** React shimmer component that displays animated random text while loading. Lightweight alternative to skeleton screens.

## ✨ Features

- 🎲 **Animated Random Text** - Continuously changing random characters during loading
- ⚡ **Ultra Lightweight** - Only ~84 lines of code, 1.65KB ESM bundle
- 🎯 **Simple API** - Just 5 props to control everything
- ✂️ **Text Truncation** - Built-in support for single-line text with ellipsis
- 🎨 **Tailwind Compatible** - Works seamlessly with Tailwind CSS classes
- ♿ **Accessible** - ARIA attributes and screen reader friendly
- 🎯 **TypeScript Support** - Fully typed for better developer experience
- 📦 **Zero Config** - Works out of the box with sensible defaults

## Installation

```bash
npm install scrimr
# or
yarn add scrimr
# or
pnpm add scrimr
```

## 🚀 Quick Start

```tsx
import { useState } from 'react'
import { Scrimr } from 'scrimr'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <Scrimr isLoading={isLoading}>
      Hello, World!
    </Scrimr>
  )
}
```

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | **required** | Controls loading state |
| `children` | `React.ReactNode` | **required** | Content to display when not loading |
| `length` | `number` | `20` | Length of placeholder text |
| `speed` | `number` | `100` | Update interval in milliseconds |
| `chars` | `string` | Mixed set | Custom character set for random text |
| `className` | `string` | - | Additional CSS classes |

### Default Character Set

The default character set includes:
- Letters: `a-z`, `A-Z`
- Numbers: `0-9`
- Symbols: `!@#$%^&*`
- Spaces for realistic text appearance

## Examples

### Basic Usage

```tsx
<Scrimr isLoading={isLoading}>
  Your content here
</Scrimr>
```

### Custom Length and Speed

```tsx
<Scrimr 
  isLoading={isLoading}
  length={30}
  speed={50}
>
  Longer text with faster animation
</Scrimr>
```

### Custom Character Set

```tsx
{/* Numbers only */}
<Scrimr 
  isLoading={isLoading}
  length={8}
  chars="0123456789"
>
  $1,234.56
</Scrimr>

{/* Custom text */}
<Scrimr 
  isLoading={isLoading}
  length={12}
  chars="LOADING."
>
  Please wait...
</Scrimr>
```

### Text Truncation

The component includes built-in `truncate` support. Just set a width on the parent container:

```tsx
{/* Container with width constraint */}
<div className="w-48">
  <Scrimr isLoading={isLoading} length={50}>
    This is a very long text that will be truncated with ellipsis
  </Scrimr>
</div>
```

### Styled Examples

```tsx
{/* Title */}
<h1 className="text-2xl font-bold">
  <Scrimr isLoading={isLoading} className="text-blue-600">
    Page Title
  </Scrimr>
</h1>

{/* Button */}
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  <Scrimr isLoading={isLoading} length={8}>
    Submit
  </Scrimr>
</button>

{/* Paragraph */}
<p className="text-gray-700">
  <Scrimr isLoading={isLoading} length={40} speed={80}>
    This is a paragraph of text that shows how Scrimr works in longer content.
  </Scrimr>
</p>
```

### Loading States

```tsx
function DataComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(result => {
      setData(result)
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <Scrimr isLoading={isLoading}>
        {data?.title}
      </Scrimr>
    </div>
  )
}
```

## Why Scrimr?

### vs. Skeleton Screens

- **More Engaging**: Dynamic text is more interesting than static gray boxes
- **Context Aware**: Shows text-like content instead of generic shapes  
- **Smaller Bundle**: No complex skeleton layouts needed
- **Flexible**: Works with any text content automatically

### vs. Other Libraries

- **Simpler**: Just 5 props vs. dozens of configuration options
- **Lighter**: 1.65KB vs. 10KB+ for most alternatives
- **Focused**: Does one thing well instead of trying to do everything
- **Modern**: Built with modern React patterns and TypeScript

## Tailwind CSS

Scrimr works perfectly with Tailwind CSS. The component uses `cn()` utility for class merging:

```tsx
<Scrimr 
  isLoading={isLoading}
  className="text-green-500 font-mono text-lg"
>
  System Status: Online
</Scrimr>
```

## TypeScript

Scrimr is built with TypeScript and provides full type safety:

```tsx
interface ScrimrProps {
  isLoading: boolean
  children: React.ReactNode
  length?: number
  speed?: number
  chars?: string
  className?: string
}
```

## Bundle Size

- **ESM**: 1.65KB
- **CJS**: 2.83KB  
- **Dependencies**: Only `clsx` and `tailwind-merge`

## Browser Support

Scrimr works in all modern browsers that support:
- ES2015+ 
- React 18+
- CSS animations

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v2.1.0
- Added built-in text truncation support
- Improved container width handling
- Enhanced demo examples

### v2.0.0
- Complete rewrite for simplicity
- Reduced from 1000+ lines to ~84 lines
- Simplified API to 5 essential props
- Removed complex state management
- 80% smaller bundle size