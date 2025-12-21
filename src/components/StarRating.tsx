import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: number
}

export function StarRating({ rating, onChange, readonly = false, size = 20 }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value)
    }
  }

  return (
    <div className="flex gap-1">
      {stars.map((star) => {
        const isFilled = rating >= star
        const isHalfFilled = rating >= star - 0.5 && rating < star

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={readonly}
            className={cn(
              'transition-all duration-150',
              !readonly && 'hover:scale-110 cursor-pointer',
              readonly && 'cursor-default'
            )}
          >
            <Star
              size={size}
              weight={isFilled ? 'fill' : 'regular'}
              className={cn(
                'transition-colors',
                isFilled && 'text-accent',
                isHalfFilled && 'text-accent/50',
                !isFilled && !isHalfFilled && 'text-muted-foreground'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
