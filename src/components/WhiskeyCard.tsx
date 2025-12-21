import { Whiskey, Review } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Wine } from '@phosphor-icons/react'
import { StarRating } from './StarRating'
import { cn } from '@/lib/utils'

interface WhiskeyCardProps {
  whiskey: Whiskey
  reviews: Review[]
  isWishlisted: boolean
  onToggleWishlist: () => void
  onClick: () => void
}

export function WhiskeyCard({ whiskey, reviews, isWishlisted, onToggleWishlist, onClick }: WhiskeyCardProps) {
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-200 overflow-hidden',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/30',
        'bg-card'
      )}
      onClick={onClick}
    >
      <div className="aspect-[3/4] bg-secondary/10 flex items-center justify-center relative overflow-hidden">
        <Wine size={64} className="text-secondary/20" weight="thin" />
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'absolute top-2 right-2 bg-card/80 backdrop-blur-sm',
            'hover:bg-card hover:scale-110 transition-all'
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist()
          }}
        >
          <Heart
            size={20}
            weight={isWishlisted ? 'fill' : 'regular'}
            className={isWishlisted ? 'text-accent' : ''}
          />
        </Button>
      </div>
      
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-1">{whiskey.name}</h3>
          <p className="text-sm text-muted-foreground">{whiskey.distillery}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} readonly size={16} />
          {reviews.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({reviews.length})
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {whiskey.region}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {whiskey.type}
          </Badge>
          {whiskey.age && (
            <Badge variant="outline" className="text-xs">
              {whiskey.age}yr
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
