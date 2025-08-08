import React from 'react'
import { Scrimr, type ScrimrProps } from './Scrimr'

export interface ScrimrTextProps extends Omit<ScrimrProps, 'variant'> {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
}

export const ScrimrText: React.FC<ScrimrTextProps> = ({
  as: Component = 'p',
  ...props
}) => {
  return (
    <Component>
      <Scrimr variant="text" {...props} />
    </Component>
  )
}