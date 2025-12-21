import { Whiskey, Review, UserProfile } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Wine, Clock, Drop, MapPin, Plus } from '@phosphor-icons/react'
import { StarRating } from './StarRating'

interface WhiskeyDetailProps {
  whiskey: Whiskey | null
  reviews: Review[]
  userProfile: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddReview: () => void
}

export function WhiskeyDetail({ whiskey, reviews, userProfile, open, onOpenChange, onAddReview }: WhiskeyDetailProps) {
  if (!whiskey) return null

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const userReview = reviews.find(r => r.userId === userProfile?.userId)

  const getInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase()
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <div className="grid md:grid-cols-[300px_1fr] h-full">
          <div className="bg-secondary/10 flex items-center justify-center p-8 border-r">
            <Wine size={120} className="text-secondary/20" weight="thin" />
          </div>

          <div className="flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-3xl font-bold tracking-tight">{whiskey.name}</DialogTitle>
              <p className="text-muted-foreground text-lg">{whiskey.distillery}</p>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 pb-6">
                <div className="flex items-center gap-3">
                  <StarRating rating={averageRating} readonly size={24} />
                  <span className="text-lg font-medium">
                    {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings yet'}
                  </span>
                  {reviews.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="flex items-center gap-1">
                    <MapPin size={14} weight="fill" />
                    {whiskey.region}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Wine size={14} weight="fill" />
                    {whiskey.type}
                  </Badge>
                  {whiskey.age && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock size={14} weight="fill" />
                      {whiskey.age} years
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Drop size={14} weight="fill" />
                    {whiskey.abv}% ABV
                  </Badge>
                </div>

                {whiskey.attributes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wide mb-2 text-muted-foreground">
                      Attributes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {whiskey.attributes.map((attr) => (
                        <Badge key={attr} variant="secondary" className="text-xs">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wide mb-2 text-muted-foreground">
                    Description
                  </h4>
                  <p className="text-foreground leading-relaxed">{whiskey.description}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Reviews</h4>
                    {!userReview && (
                      <Button onClick={onAddReview} size="sm">
                        <Plus size={16} className="mr-1" />
                        Add Review
                      </Button>
                    )}
                  </div>

                  {reviews.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {getInitials(review.nickname)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.nickname}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(review.createdAt)}
                                </span>
                              </div>
                              <StarRating rating={review.rating} readonly size={16} />
                              <p className="mt-2 text-sm leading-relaxed">{review.notes}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
