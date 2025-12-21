import { WhiskeyFilters, SortOption } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'

interface FilterPanelProps {
  filters: WhiskeyFilters
  sortBy: SortOption
  onFiltersChange: (filters: WhiskeyFilters) => void
  onSortChange: (sort: SortOption) => void
  availableTypes: string[]
  availableRegions: string[]
  availableAttributes: string[]
}

export function FilterPanel({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  availableTypes,
  availableRegions,
  availableAttributes
}: FilterPanelProps) {
  const toggleType = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type]
    onFiltersChange({ ...filters, types: newTypes })
  }

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region]
    onFiltersChange({ ...filters, regions: newRegions })
  }

  const toggleAttribute = (attribute: string) => {
    const newAttributes = filters.attributes.includes(attribute)
      ? filters.attributes.filter(a => a !== attribute)
      : [...filters.attributes, attribute]
    onFiltersChange({ ...filters, attributes: newAttributes })
  }

  const hasActiveFilters = 
    filters.types.length > 0 || 
    filters.regions.length > 0 || 
    filters.attributes.length > 0

  const clearFilters = () => {
    onFiltersChange({
      types: [],
      regions: [],
      attributes: []
    })
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="abv">ABV</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Type</Label>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map((type) => (
            <Badge
              key={type}
              variant={filters.types.includes(type) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleType(type)}
            >
              {type}
              {filters.types.includes(type) && (
                <X size={12} className="ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Region</Label>
        <div className="flex flex-wrap gap-2">
          {availableRegions.map((region) => (
            <Badge
              key={region}
              variant={filters.regions.includes(region) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleRegion(region)}
            >
              {region}
              {filters.regions.includes(region) && (
                <X size={12} className="ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </div>

      {availableAttributes.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <Label>Attributes</Label>
            <div className="flex flex-wrap gap-2">
              {availableAttributes.map((attribute) => (
                <Badge
                  key={attribute}
                  variant={filters.attributes.includes(attribute) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleAttribute(attribute)}
                >
                  {attribute}
                  {filters.attributes.includes(attribute) && (
                    <X size={12} className="ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
