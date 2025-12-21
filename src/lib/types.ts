export interface Whiskey {
  id: string
  name: string
  distillery: string
  type: string
  region: string
  age?: number
  abv: number
  description: string
  attributes: string[]
  imageUrl?: string
  createdAt: number
}

export interface Review {
  id: string
  whiskeyId: string
  userId: string
  nickname: string
  rating: number
  notes: string
  createdAt: number
}

export interface UserProfile {
  nickname: string
  userId: string
  tried: string[]
  wishlist: string[]
}

export interface WhiskeyFilters {
  types: string[]
  regions: string[]
  minAge?: number
  maxAge?: number
  minAbv?: number
  maxAbv?: number
  attributes: string[]
}

export type SortOption = 'rating' | 'name' | 'age' | 'abv' | 'newest'
