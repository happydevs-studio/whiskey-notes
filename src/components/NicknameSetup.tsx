import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface NicknameSetupProps {
  open: boolean
  onSubmit: (nickname: string) => void
}

export function NicknameSetup({ open, onSubmit }: NicknameSetupProps) {
  const [nickname, setNickname] = useState('')

  const handleSubmit = () => {
    if (nickname.trim()) {
      onSubmit(nickname.trim())
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to WhiskeyNotes</DialogTitle>
          <DialogDescription>
            Choose a nickname to get started. This will be displayed with your reviews.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Your Nickname</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="WhiskeyLover123"
              maxLength={20}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Max 20 characters. You can change this later in settings.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!nickname.trim()} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
