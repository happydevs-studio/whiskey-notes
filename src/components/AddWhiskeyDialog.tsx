import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'

interface AddWhiskeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (whiskey: {
    name: string
    distillery: string
    type: string
    region: string
    age?: number
    abv: number
    description: string
    attributes: string[]
  }) => void
}

export function AddWhiskeyDialog({ open, onOpenChange, onSubmit }: AddWhiskeyDialogProps) {
  const [name, setName] = useState('')
  const [distillery, setDistillery] = useState('')
  const [type, setType] = useState('')
  const [region, setRegion] = useState('')
  const [age, setAge] = useState('')
  const [abv, setAbv] = useState('')
  const [description, setDescription] = useState('')
  const [attributes, setAttributes] = useState<string[]>([])
  const [currentAttribute, setCurrentAttribute] = useState('')

  const handleAddAttribute = () => {
    if (currentAttribute.trim() && !attributes.includes(currentAttribute.trim())) {
      setAttributes([...attributes, currentAttribute.trim()])
      setCurrentAttribute('')
    }
  }

  const handleRemoveAttribute = (attr: string) => {
    setAttributes(attributes.filter(a => a !== attr))
  }

  const handleSubmit = () => {
    if (name && distillery && type && region && abv && description) {
      onSubmit({
        name: name.trim(),
        distillery: distillery.trim(),
        type: type.trim(),
        region: region.trim(),
        age: age ? parseInt(age) : undefined,
        abv: parseFloat(abv),
        description: description.trim(),
        attributes
      })
      setName('')
      setDistillery('')
      setType('')
      setRegion('')
      setAge('')
      setAbv('')
      setDescription('')
      setAttributes([])
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Whiskey</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lagavulin 16"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distillery">Distillery *</Label>
              <Input
                id="distillery"
                value={distillery}
                onChange={(e) => setDistillery(e.target.value)}
                placeholder="Lagavulin"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Single Malt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Islay"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="16"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abv">ABV (%) *</Label>
              <Input
                id="abv"
                type="number"
                step="0.1"
                value={abv}
                onChange={(e) => setAbv(e.target.value)}
                placeholder="43"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A rich, peaty whisky with notes of smoke, seaweed, and dried fruit..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attributes">Attributes</Label>
            <div className="flex gap-2">
              <Input
                id="attributes"
                value={currentAttribute}
                onChange={(e) => setCurrentAttribute(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAttribute())}
                placeholder="e.g., Peaty, Smoky, Complex"
              />
              <Button type="button" variant="secondary" onClick={handleAddAttribute}>
                Add
              </Button>
            </div>
            {attributes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attributes.map((attr) => (
                  <Badge key={attr} variant="secondary" className="pl-2 pr-1">
                    {attr}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttribute(attr)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!name || !distillery || !type || !region || !abv || !description}
          >
            Add Whiskey
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
