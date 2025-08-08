import React from 'react'
import { Scrimr, type ScrimrProps } from './Scrimr'
import { cn } from '../lib/utils'

export interface ScrimrCardProps extends Omit<ScrimrProps, 'variant'> {
  title?: string
  description?: string
  cardClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  titleLength?: number
  descriptionLength?: number
}

export const ScrimrCard: React.FC<ScrimrCardProps> = ({
  title,
  description,
  cardClassName,
  titleClassName,
  descriptionClassName,
  titleLength = 20,
  descriptionLength = 60,
  isLoading = true,
  characterSet = 'alphanumeric',
  enableShimmer = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border p-6 shadow-sm',
        cardClassName
      )}
    >
      <h3 className={cn('text-lg font-semibold mb-2', titleClassName)}>
        <Scrimr
          variant="block"
          text={title}
          minLength={title ? title.length : Math.max(1, titleLength - 5)}
          maxLength={title ? title.length : titleLength + 5}
          isLoading={isLoading}
          characterSet={characterSet}
          enableShimmer={enableShimmer}
          {...props}
        >
          {title}
        </Scrimr>
      </h3>
      <p className={cn('text-sm text-muted-foreground', descriptionClassName)}>
        <Scrimr
          variant="block"
          text={description}
          minLength={description ? description.length : Math.max(1, descriptionLength - 10)}
          maxLength={description ? description.length : descriptionLength + 10}
          isLoading={isLoading}
          characterSet={characterSet}
          enableShimmer={enableShimmer}
          {...props}
        >
          {description}
        </Scrimr>
      </p>
    </div>
  )
}