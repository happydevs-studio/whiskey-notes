import { useState, useEffect, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Whiskey, Review, UserProfile, WhiskeyFilters, SortOption } from '@/lib/types'
import { whiskeyService } from '@/lib/whiskeyService'
import { generateId } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Funnel, MagnifyingGlass, User } from '@phosphor-icons/react'
import { WhiskeyCard } from '@/components/WhiskeyCard'
import { WhiskeyDetail } from '@/components/WhiskeyDetail'
import { AddReviewDialog } from '@/components/AddReviewDialog'
import { AddWhiskeyDialog } from '@/components/AddWhiskeyDialog'
import { FilterPanel } from '@/components/FilterPanel'
import { NicknameSetup } from '@/components/NicknameSetup'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { toast } from 'sonner'

function App() {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([])
  const [loading, setLoading] = useState(true)
  const [reviews = [], setReviews] = useKV<Review[]>('reviews', [])
  const [userProfile, setUserProfile] = useKV<UserProfile | null>('userProfile', null)
  const [isAdmin, setIsAdmin] = useState(false)

  const [selectedWhiskey, setSelectedWhiskey] = useState<Whiskey | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [addWhiskeyOpen, setAddWhiskeyOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState<WhiskeyFilters>({
    types: [],
    regions: [],
    attributes: []
  })
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await window.spark.user()
      if (user) {
        setIsAdmin(user.isOwner)
      }
    }
    checkAdmin()
  }, [])

  // Fetch whiskeys from Supabase on mount
  useEffect(() => {
    const loadWhiskeys = async () => {
      setLoading(true)
      const fetchedWhiskeys = await whiskeyService.fetchWhiskeys()
      setWhiskeys(fetchedWhiskeys)
      setLoading(false)
    }
    loadWhiskeys()
  }, [])

  const handleSetNickname = (nickname: string) => {
    const newProfile: UserProfile = {
      nickname,
      userId: userProfile?.userId || generateId(),
      tried: userProfile?.tried || [],
      wishlist: userProfile?.wishlist || []
    }
    setUserProfile(newProfile)
    toast.success(`Welcome, ${nickname}!`)
  }

  const handleAddWhiskey = async (whiskeyData: Omit<Whiskey, 'id' | 'createdAt'>) => {
    const newWhiskey = await whiskeyService.addWhiskey(whiskeyData)
    if (newWhiskey) {
      setWhiskeys((current) => [newWhiskey, ...current])
      toast.success(`${whiskeyData.name} added successfully!`)
    } else {
      toast.error('Failed to add whiskey. Please try again.')
    }
  }

  const handleAddReview = (rating: number, notes: string) => {
    if (!selectedWhiskey || !userProfile) return

    const existingReview = reviews.find(
      r => r.whiskeyId === selectedWhiskey.id && r.userId === userProfile.userId
    )

    if (existingReview) {
      setReviews((current = []) =>
        current.map(r =>
          r.id === existingReview.id
            ? { ...r, rating, notes, createdAt: Date.now() }
            : r
        )
      )
      toast.success('Review updated!')
    } else {
      const newReview: Review = {
        id: generateId(),
        whiskeyId: selectedWhiskey.id,
        userId: userProfile.userId,
        nickname: userProfile.nickname,
        rating,
        notes,
        createdAt: Date.now()
      }
      setReviews((current = []) => [...current, newReview])
      toast.success('Review added!')
    }

    if (!userProfile.tried.includes(selectedWhiskey.id)) {
      const updatedProfile: UserProfile = {
        ...userProfile,
        tried: [...userProfile.tried, selectedWhiskey.id]
      }
      setUserProfile(updatedProfile)
    }
  }

  const handleToggleWishlist = (whiskeyId: string) => {
    if (!userProfile) return

    const isWishlisted = userProfile.wishlist.includes(whiskeyId)
    const newWishlist = isWishlisted
      ? userProfile.wishlist.filter(id => id !== whiskeyId)
      : [...userProfile.wishlist, whiskeyId]
    
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    
    const updatedProfile: UserProfile = {
      ...userProfile,
      wishlist: newWishlist
    }
    setUserProfile(updatedProfile)
  }

  const getWhiskeyReviews = (whiskeyId: string) => {
    return reviews.filter(r => r.whiskeyId === whiskeyId)
  }

  const availableTypes = useMemo(() => {
    return Array.from(new Set(whiskeys.map(w => w.type))).sort()
  }, [whiskeys])

  const availableRegions = useMemo(() => {
    return Array.from(new Set(whiskeys.map(w => w.region))).sort()
  }, [whiskeys])

  const availableAttributes = useMemo(() => {
    return Array.from(new Set(whiskeys.flatMap(w => w.attributes))).sort()
  }, [whiskeys])

  const filteredAndSortedWhiskeys = useMemo(() => {
    let filtered = whiskeys.filter(whiskey => {
      const matchesSearch = searchQuery === '' ||
        whiskey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        whiskey.distillery.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filters.types.length === 0 || filters.types.includes(whiskey.type)
      const matchesRegion = filters.regions.length === 0 || filters.regions.includes(whiskey.region)
      const matchesAttributes = filters.attributes.length === 0 ||
        filters.attributes.some(attr => whiskey.attributes.includes(attr))

      return matchesSearch && matchesType && matchesRegion && matchesAttributes
    })

    if (activeTab === 'tried' && userProfile) {
      filtered = filtered.filter(w => userProfile.tried.includes(w.id))
    } else if (activeTab === 'wishlist' && userProfile) {
      filtered = filtered.filter(w => userProfile.wishlist.includes(w.id))
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating': {
          const aReviews = getWhiskeyReviews(a.id)
          const bReviews = getWhiskeyReviews(b.id)
          const aRating = aReviews.length > 0
            ? aReviews.reduce((sum, r) => sum + r.rating, 0) / aReviews.length
            : 0
          const bRating = bReviews.length > 0
            ? bReviews.reduce((sum, r) => sum + r.rating, 0) / bReviews.length
            : 0
          return bRating - aRating
        }
        case 'name':
          return a.name.localeCompare(b.name)
        case 'age':
          return (b.age || 0) - (a.age || 0)
        case 'abv':
          return b.abv - a.abv
        case 'newest':
          return b.createdAt - a.createdAt
        default:
          return 0
      }
    })

    return filtered
  }, [whiskeys, reviews, filters, sortBy, searchQuery, activeTab, userProfile])

  const handleWhiskeyClick = (whiskey: Whiskey) => {
    setSelectedWhiskey(whiskey)
    setDetailOpen(true)
  }

  const handleAddReviewClick = () => {
    if (!userProfile) return
    setDetailOpen(false)
    setReviewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <NicknameSetup open={!userProfile} onSubmit={handleSetNickname} />

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">WhiskeyNotes</h1>
              <p className="text-sm text-muted-foreground">.co.uk</p>
            </div>
            {userProfile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                <User size={20} weight="fill" className="text-secondary-foreground" />
                <span className="text-sm font-medium text-secondary-foreground hidden sm:inline">
                  {userProfile.nickname}
                </span>
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All Whiskeys</TabsTrigger>
              <TabsTrigger value="tried">
                Tried {userProfile && userProfile.tried.length > 0 && `(${userProfile.tried.length})`}
              </TabsTrigger>
              <TabsTrigger value="wishlist">
                Wishlist {userProfile && userProfile.wishlist.length > 0 && `(${userProfile.wishlist.length})`}
              </TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="all" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <FilterPanel
                    filters={filters}
                    sortBy={sortBy}
                    onFiltersChange={setFilters}
                    onSortChange={setSortBy}
                    availableTypes={availableTypes}
                    availableRegions={availableRegions}
                    availableAttributes={availableAttributes}
                  />
                </div>
              </aside>

              <div className="flex-1 space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MagnifyingGlass
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search whiskeys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="lg:hidden">
                        <Funnel size={20} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel
                          filters={filters}
                          sortBy={sortBy}
                          onFiltersChange={setFilters}
                          onSortChange={setSortBy}
                          availableTypes={availableTypes}
                          availableRegions={availableRegions}
                          availableAttributes={availableAttributes}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {loading ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Loading whiskeys...</p>
                  </div>
                ) : filteredAndSortedWhiskeys.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      {whiskeys.length === 0
                        ? 'No whiskeys yet. Add your first one!'
                        : 'No whiskeys match your filters.'}
                    </p>
                    {whiskeys.length > 0 && (
                      <Button variant="outline" onClick={() => setFilters({ types: [], regions: [], attributes: [] })}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedWhiskeys.map((whiskey) => (
                      <WhiskeyCard
                        key={whiskey.id}
                        whiskey={whiskey}
                        reviews={getWhiskeyReviews(whiskey.id)}
                        isWishlisted={userProfile?.wishlist.includes(whiskey.id) || false}
                        onToggleWishlist={() => handleToggleWishlist(whiskey.id)}
                        onClick={() => handleWhiskeyClick(whiskey)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tried" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <FilterPanel
                    filters={filters}
                    sortBy={sortBy}
                    onFiltersChange={setFilters}
                    onSortChange={setSortBy}
                    availableTypes={availableTypes}
                    availableRegions={availableRegions}
                    availableAttributes={availableAttributes}
                  />
                </div>
              </aside>

              <div className="flex-1 space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MagnifyingGlass
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search whiskeys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="lg:hidden">
                        <Funnel size={20} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel
                          filters={filters}
                          sortBy={sortBy}
                          onFiltersChange={setFilters}
                          onSortChange={setSortBy}
                          availableTypes={availableTypes}
                          availableRegions={availableRegions}
                          availableAttributes={availableAttributes}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {loading ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Loading whiskeys...</p>
                  </div>
                ) : filteredAndSortedWhiskeys.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      {userProfile?.tried.length === 0
                        ? 'You haven\'t tried any whiskeys yet. Add your first review!'
                        : 'No whiskeys match your filters.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedWhiskeys.map((whiskey) => (
                      <WhiskeyCard
                        key={whiskey.id}
                        whiskey={whiskey}
                        reviews={getWhiskeyReviews(whiskey.id)}
                        isWishlisted={userProfile?.wishlist.includes(whiskey.id) || false}
                        onToggleWishlist={() => handleToggleWishlist(whiskey.id)}
                        onClick={() => handleWhiskeyClick(whiskey)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <FilterPanel
                    filters={filters}
                    sortBy={sortBy}
                    onFiltersChange={setFilters}
                    onSortChange={setSortBy}
                    availableTypes={availableTypes}
                    availableRegions={availableRegions}
                    availableAttributes={availableAttributes}
                  />
                </div>
              </aside>

              <div className="flex-1 space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MagnifyingGlass
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search whiskeys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="lg:hidden">
                        <Funnel size={20} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel
                          filters={filters}
                          sortBy={sortBy}
                          onFiltersChange={setFilters}
                          onSortChange={setSortBy}
                          availableTypes={availableTypes}
                          availableRegions={availableRegions}
                          availableAttributes={availableAttributes}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {loading ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Loading whiskeys...</p>
                  </div>
                ) : filteredAndSortedWhiskeys.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      {userProfile?.wishlist.length === 0
                        ? 'Your wishlist is empty. Start adding whiskeys you want to try!'
                        : 'No whiskeys match your filters.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedWhiskeys.map((whiskey) => (
                      <WhiskeyCard
                        key={whiskey.id}
                        whiskey={whiskey}
                        reviews={getWhiskeyReviews(whiskey.id)}
                        isWishlisted={userProfile?.wishlist.includes(whiskey.id) || false}
                        onToggleWishlist={() => handleToggleWishlist(whiskey.id)}
                        onClick={() => handleWhiskeyClick(whiskey)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="mt-0">
              <div className="max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
                  <p className="text-muted-foreground">
                    Manage the whiskey inventory and curate the collection.
                  </p>
                </div>

                <Button onClick={() => setAddWhiskeyOpen(true)} size="lg">
                  <Plus size={20} className="mr-2" />
                  Add New Whiskey
                </Button>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Current Inventory</h3>
                  <p className="text-muted-foreground">
                    Total whiskeys: {whiskeys.length}
                  </p>
                  <p className="text-muted-foreground">
                    Total reviews: {reviews.length}
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <WhiskeyDetail
        whiskey={selectedWhiskey}
        reviews={selectedWhiskey ? getWhiskeyReviews(selectedWhiskey.id) : []}
        userProfile={userProfile || null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAddReview={handleAddReviewClick}
      />

      <AddReviewDialog
        whiskey={selectedWhiskey}
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        onSubmit={handleAddReview}
      />

      <AddWhiskeyDialog
        open={addWhiskeyOpen}
        onOpenChange={setAddWhiskeyOpen}
        onSubmit={handleAddWhiskey}
      />
    </div>
  )
}

export default App
