import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { StarRating } from './StarRating'
import { Whiskey } from '@/lib/types'

interface AddReviewDialogProps {
  whiskey: Whiskey | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (rating: number, notes: string) => void
}

export function AddReviewDialog({ whiskey, open, onOpenChange, onSubmit }: AddReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    if (rating > 0 && notes.trim()) {
      onSubmit(rating, notes.trim())
      setRating(0)
      setNotes('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {whiskey ? `Review ${whiskey.name}` : 'Add Review'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating rating={rating} onChange={setRating} size={32} />
            {rating === 0 && (
              <p className="text-xs text-muted-foreground">Click to rate</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Tasting Notes</Label>
            <Textarea
              id="notes"
              placeholder="Share your thoughts on the nose, palate, finish, and overall impression..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || !notes.trim()}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
