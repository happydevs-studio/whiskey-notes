# WhiskeyNotes.co.uk - Whiskey Inventory & Rating Platform

A sophisticated whiskey discovery and collection management platform that combines curated inventory with personal tasting notes and community ratings.

**Experience Qualities**:
1. **Refined** - The interface should evoke the warmth and sophistication of a premium whiskey tasting room, with rich materials and thoughtful details
2. **Discoverable** - Users should easily explore new whiskeys through intuitive filtering, sorting, and recommendation features that spark curiosity
3. **Personal** - The app should feel like a digital whiskey journal, where users build their own collection narrative through notes and ratings

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a multi-faceted application requiring user authentication, role-based permissions (admin/user), CRUD operations for whiskey inventory, personal collection management, filtering/discovery systems, and aggregate rating calculations across multiple user reviews.

## Essential Features

### Admin Authentication & Whiskey Management
- **Functionality**: Admins can authenticate and manage the master whiskey inventory (add, edit, delete whiskeys with full details)
- **Purpose**: Maintains a curated, high-quality whiskey database that all users can rate and review
- **Trigger**: Admin clicks "Add Whiskey" button in admin panel
- **Progression**: Admin login → Access admin panel → Click "Add Whiskey" → Fill form (name, distillery, type, region, age, ABV, description, attributes) → Submit → Whiskey appears in master inventory
- **Success criteria**: Admins can successfully add whiskeys with complete metadata, and these appear immediately in the browsable catalog

### User Profile & Nickname Setup
- **Functionality**: Users set up a nickname/profile to attach to their reviews and notes
- **Purpose**: Creates personalized identity for community contributions without requiring full registration
- **Trigger**: First-time user interaction or settings access
- **Progression**: Visit app → Prompted for nickname → Enter nickname → Saved to profile → Nickname appears on all reviews
- **Success criteria**: Nickname persists across sessions and displays on all user-generated content

### Personal Tasting Notes & Ratings
- **Functionality**: Users can write detailed notes and rate whiskeys they've tried (1-5 stars)
- **Purpose**: Builds personal whiskey journal and contributes to community ratings
- **Trigger**: User clicks on whiskey → Selects "Add Review"
- **Progression**: Browse whiskey → Click whiskey card → View details → Click "Add Review" → Write notes → Select rating (1-5 stars) → Submit → Review appears on whiskey page and in personal collection
- **Success criteria**: Reviews save with timestamp, display on whiskey detail page, and calculate into aggregate rating

### Collection Management (Tried & Wishlist)
- **Functionality**: Users maintain two lists - whiskeys they've tried and whiskeys they want to try
- **Purpose**: Provides personalized tracking and quick access to relevant whiskeys
- **Trigger**: User navigates to "My Collection" tab
- **Progression**: Click "My Collection" → Toggle between "Tried" and "Wishlist" tabs → View filtered whiskeys with personal notes → Add to wishlist from any whiskey page
- **Success criteria**: Collections persist across sessions, display accurate counts, and show relevant metadata (ratings for tried, attributes for wishlist)

### Discovery & Filtering System
- **Functionality**: Users can filter and sort whiskeys by rating, region, type, age, ABV, and custom attributes
- **Purpose**: Enables exploration and discovery of new whiskeys matching user preferences
- **Trigger**: User applies filters or sorting in browse view
- **Progression**: Browse catalog → Open filter panel → Select attributes (region: Speyside, type: Single Malt, age: 12+) → Apply → View filtered results → Sort by highest rated
- **Success criteria**: Filters work in combination, results update instantly, highest-rated sorting reflects aggregate community ratings

### Whiskey Detail Pages
- **Functionality**: Comprehensive whiskey profile with all metadata, aggregate rating, and all user reviews
- **Purpose**: Central hub for whiskey information and community feedback
- **Trigger**: User clicks on any whiskey card
- **Progression**: Click whiskey card → View full details → Read description and specs → See aggregate rating → Scroll through community reviews → Add own review or wishlist
- **Success criteria**: All whiskey data displays correctly, reviews show newest first, aggregate rating updates when new reviews added

## Edge Case Handling

- **Empty States**: Display helpful prompts when collections are empty ("Start your whiskey journey - add your first tasting note!"), when no whiskeys match filters ("Try adjusting your filters"), or when catalog is empty
- **Duplicate Reviews**: Users can edit their existing review rather than create duplicates; only one review per user per whiskey
- **Admin Access**: Non-admin users see read-only whiskey data; admin controls only visible to authenticated admins
- **Invalid Ratings**: Rating input constrained to 1-5 stars with half-star increments, cannot submit without rating
- **Long Content**: Truncate long tasting notes with "Read more" expansion, limit nickname length to prevent layout breaks
- **No Results**: When filters produce no matches, suggest broadening criteria or show "nothing yet" message with call-to-action

## Design Direction

The design should evoke the ambiance of a premium whiskey tasting room - warm, sophisticated, and inviting. Think rich amber tones, deep wood textures, and elegant typography that balances heritage with modern clarity. The interface should feel like a leather-bound journal meets a contemporary digital experience, where exploring whiskeys is as pleasurable as tasting them.

## Color Selection

Drawing from the rich, warm palette of aged whiskey and oak barrels, with sophisticated earth tones and amber highlights.

- **Primary Color**: Deep amber/copper `oklch(0.55 0.12 50)` - Evokes aged whiskey, used for primary actions and key focal points, communicating warmth and premium quality
- **Secondary Colors**: 
  - Rich charcoal `oklch(0.25 0.01 270)` - Sophisticated dark base for cards and elevated surfaces
  - Warm cream `oklch(0.95 0.01 80)` - Soft background that provides breathing room without stark white
- **Accent Color**: Bright copper `oklch(0.65 0.15 45)` - Attention-grabbing highlight for CTAs, active states, and important elements like ratings
- **Foreground/Background Pairings**:
  - Primary (Deep Amber `oklch(0.55 0.12 50)`): White text `oklch(0.98 0 0)` - Ratio 5.2:1 ✓
  - Secondary (Rich Charcoal `oklch(0.25 0.01 270)`): Cream text `oklch(0.95 0.01 80)` - Ratio 11.8:1 ✓
  - Accent (Bright Copper `oklch(0.65 0.15 45)`): Charcoal text `oklch(0.2 0.01 270)` - Ratio 8.4:1 ✓
  - Background (Warm Cream `oklch(0.95 0.01 80)`): Charcoal text `oklch(0.2 0.01 270)` - Ratio 13.1:1 ✓

## Font Selection

Typography should convey the heritage and craftsmanship of whiskey making while maintaining modern readability - a pairing of a distinctive serif for headings with a clean sans-serif for body text.

**Primary Font**: Playfair Display - A high-contrast serif that brings elegance and sophistication, perfect for whiskey names and headings
**Secondary Font**: Inter - Clean, highly readable sans-serif for body text, notes, and UI elements

- **Typographic Hierarchy**:
  - H1 (App Title/Hero): Playfair Display Bold/36px/tight letter-spacing/-0.02em
  - H2 (Section Headers): Playfair Display SemiBold/28px/tight letter-spacing/-0.01em
  - H3 (Whiskey Names): Playfair Display SemiBold/22px/normal letter-spacing
  - Body (Descriptions/Notes): Inter Regular/16px/line-height 1.6
  - Small (Metadata/Labels): Inter Medium/14px/letter-spacing/0.01em/uppercase
  - Caption (Timestamps/Secondary): Inter Regular/13px/muted color

## Animations

Animations should feel smooth and purposeful, like the slow pour of whiskey into a glass - deliberate, refined, and satisfying.

- **Card Interactions**: Gentle lift on hover (translateY -4px) with soft shadow increase, 200ms ease-out - creates tactile feeling of selecting a bottle
- **Filter/Sort Changes**: Subtle fade-in for results (150ms) prevents jarring content swaps
- **Rating Stars**: Gentle scale pulse (1.1x) on hover/selection with warm glow effect, satisfying click feedback
- **Page Transitions**: Smooth fade-slide (300ms) when navigating between views, maintains spatial continuity
- **Review Submission**: Success state with gentle scale-in animation and toast notification
- **Loading States**: Elegant skeleton cards with subtle shimmer gradient, never spinners

## Component Selection

- **Components**:
  - **Card**: Primary container for whiskey items in grid/list views, with hover states and subtle shadows
  - **Dialog**: For admin whiskey creation/editing forms and user review composition
  - **Tabs**: Navigate between "All Whiskeys", "My Collection" (Tried/Wishlist), and "Admin" sections
  - **Select & Dropdown**: Filter controls for region, type, age ranges
  - **Input & Textarea**: Review composition and admin whiskey data entry
  - **Button**: Primary (add review, submit), Secondary (wishlist), Destructive (admin delete)
  - **Badge**: Display whiskey attributes (Region, Type, Age, ABV) with distinct colors
  - **Separator**: Divide sections in detail view and review lists
  - **Avatar**: User avatars generated from nicknames for review attribution
  - **Toast (Sonner)**: Feedback for actions (review saved, whiskey added)
  - **Sheet**: Mobile filter panel that slides from side
  - **Scroll Area**: For long review lists and whiskey grids
  
- **Customizations**:
  - **Star Rating Component**: Custom 5-star rating input/display with half-star support, using Phosphor star icons with amber fill
  - **Whiskey Card Component**: Custom card with whiskey image placeholder, name, distillery, aggregate rating, quick-add to wishlist button
  - **Filter Panel**: Custom composed component with multiple selects and checkboxes for attributes
  - **Stats Display**: Custom component showing rating distribution and review count
  
- **States**:
  - Buttons: Default (solid primary), Hover (brightness increase + lift), Active (slight scale-down), Disabled (reduced opacity)
  - Cards: Default (subtle shadow), Hover (elevated shadow + border glow), Selected (amber border)
  - Inputs: Default (border), Focus (ring + border-primary), Error (border-destructive), Success (border-accent)
  - Stars: Empty (outline), Filled (solid amber), Hover (scale + glow)

- **Icon Selection**:
  - Plus: Add whiskey/review
  - Heart/HeartFilled: Wishlist toggle
  - Star/StarFilled: Ratings
  - Funnel: Filter panel toggle
  - SortAscending/SortDescending: Sort controls
  - User/UserCircle: Profile/nickname
  - Wine: Whiskey category/type indicator
  - MapPin: Region indicator
  - Clock: Age indicator
  - Drop: ABV indicator
  - X: Close dialogs/clear filters
  - Check: Success states

- **Spacing**:
  - Card padding: p-6 (24px) for comfortable content breathing room
  - Grid gaps: gap-6 (24px) for whiskey card grids on desktop, gap-4 (16px) mobile
  - Section spacing: mb-12 (48px) between major sections
  - Element spacing: gap-4 (16px) for form fields, gap-2 (8px) for inline elements
  - Container padding: px-6 py-8 for main content areas

- **Mobile**:
  - Whiskey grid: 1 column on mobile (<640px), 2 columns tablet (640-1024px), 3-4 columns desktop
  - Filter panel: Collapsible sheet on mobile, persistent sidebar on desktop
  - Tabs: Scrollable horizontal tabs on mobile, standard tabs on desktop
  - Cards: Full-width with reduced padding (p-4) on mobile
  - Typography: Slightly smaller scale on mobile (H1: 28px, H3: 20px)
  - Navigation: Bottom tab bar on mobile, top navigation on desktop
