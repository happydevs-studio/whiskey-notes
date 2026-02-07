import { Whiskey, Review } from './types'

// Sample whiskeys representing various regions, types, and flavor profiles
export const sampleWhiskeys: Omit<Whiskey, 'createdAt'>[] = [
  {
    id: 'glenfiddich-12',
    name: 'Glenfiddich 12 Year Old',
    distillery: 'Glenfiddich',
    type: 'Single Malt',
    region: 'Speyside',
    age: 12,
    abv: 40,
    description: 'A classic Speyside single malt with distinctive fresh pear and subtle oak flavors. Matured in American bourbon and Spanish sherry oak casks for at least 12 years, this whisky is mellow and smooth with characteristic sweet, fruity notes.',
    attributes: ['Fruity', 'Smooth', 'Sweet', 'Oak']
  },
  {
    id: 'lagavulin-16',
    name: 'Lagavulin 16 Year Old',
    distillery: 'Lagavulin',
    type: 'Single Malt',
    region: 'Islay',
    age: 16,
    abv: 43,
    description: 'An intensely flavored, peat-smoke single malt with a long finish. Dried fruit and distinctive earthy peat smoke notes combine with maritime flavors of seaweed and iodine. One of the most iconic Islay malts.',
    attributes: ['Peaty', 'Smoky', 'Maritime', 'Complex', 'Full-bodied']
  },
  {
    id: 'macallan-18-sherry',
    name: 'The Macallan 18 Year Old Sherry Oak',
    distillery: 'The Macallan',
    type: 'Single Malt',
    region: 'Speyside',
    age: 18,
    abv: 43,
    description: 'Matured exclusively in hand-picked sherry seasoned oak casks from Jerez for richness and complexity. Features dried fruits, ginger, and an exceptionally smooth palate with a long, warming finish.',
    attributes: ['Rich', 'Sherry', 'Dried Fruit', 'Spicy', 'Luxurious']
  },
  {
    id: 'glenlivet-12',
    name: 'The Glenlivet 12 Year Old',
    distillery: 'The Glenlivet',
    type: 'Single Malt',
    region: 'Speyside',
    age: 12,
    abv: 40,
    description: 'The classic Speyside style of The Glenlivet distillery. Delicately balanced with notes of honey and summer fruits, finishing with a hint of almond. An excellent introduction to single malt whisky.',
    attributes: ['Fruity', 'Floral', 'Smooth', 'Balanced', 'Honeyed']
  },
  {
    id: 'ardbeg-10',
    name: 'Ardbeg 10 Year Old',
    distillery: 'Ardbeg',
    type: 'Single Malt',
    region: 'Islay',
    age: 10,
    abv: 46,
    description: 'The peatiest, smokiest and most complex single malt of them all. Yet it does not flaunt the peat, rather it gives way to the natural sweetness of the malt to produce a whisky of perfect balance.',
    attributes: ['Peaty', 'Smoky', 'Complex', 'Citrus', 'Bold']
  },
  {
    id: 'highland-park-12',
    name: 'Highland Park 12 Year Old',
    distillery: 'Highland Park',
    type: 'Single Malt',
    region: 'Highland',
    age: 12,
    abv: 40,
    description: 'A harmonious balance of sweet and smoky, this Orkney single malt displays aromatic smokiness, honey sweetness and floral heather notes. Matured in sherry seasoned American oak casks.',
    attributes: ['Balanced', 'Heather', 'Honey', 'Smoky', 'Complex']
  },
  {
    id: 'talisker-10',
    name: 'Talisker 10 Year Old',
    distillery: 'Talisker',
    type: 'Single Malt',
    region: 'Island',
    age: 10,
    abv: 45.8,
    description: 'Made by the sea on the shores of the Isle of Skye. A powerful and intense single malt with a distinctive peppery character, smoke, and a sweet finish with briny notes.',
    attributes: ['Maritime', 'Peppery', 'Smoky', 'Bold', 'Spicy']
  },
  {
    id: 'monkey-shoulder',
    name: 'Monkey Shoulder',
    distillery: 'William Grant & Sons',
    type: 'Blended Malt',
    region: 'Speyside',
    abv: 40,
    description: 'A smooth and easy-drinking blend of three Speyside single malts. With notes of vanilla, honey, and orange, it\'s perfect for cocktails or sipping neat. Named after a condition that maltmen used to get from turning the malt by hand.',
    attributes: ['Smooth', 'Vanilla', 'Honey', 'Versatile', 'Citrus']
  },
  {
    id: 'oban-14',
    name: 'Oban 14 Year Old',
    distillery: 'Oban',
    type: 'Single Malt',
    region: 'Highland',
    age: 14,
    abv: 43,
    description: 'A West Highland malt with distinctive smoky and fruity characteristics. Smooth and rich, with hints of salt, citrus and peat smoke, balanced with a touch of sweetness.',
    attributes: ['Smoky', 'Fruity', 'Maritime', 'Balanced', 'Elegant']
  },
  {
    id: 'redbreast-12',
    name: 'Redbreast 12 Year Old',
    distillery: 'Midleton',
    type: 'Single Pot Still',
    region: 'Irish',
    age: 12,
    abv: 40,
    description: 'A wonderfully complex and smooth Irish whiskey with a rich, spicy and fruity character. Made from a mash of malted and unmalted barley, triple distilled, and matured in sherry and bourbon casks.',
    attributes: ['Spicy', 'Fruity', 'Rich', 'Smooth', 'Sherry']
  },
  {
    id: 'yamazaki-12',
    name: 'Yamazaki 12 Year Old',
    distillery: 'Yamazaki',
    type: 'Single Malt',
    region: 'Japanese',
    age: 12,
    abv: 43,
    description: 'Japan\'s first and oldest malt whisky distillery produces this elegant and complex spirit. Notes of peach, pineapple, grapefruit, clove, candied orange and vanilla, with a hint of Mizunara oak.',
    attributes: ['Fruity', 'Complex', 'Elegant', 'Mizunara', 'Balanced']
  },
  {
    id: 'buffalo-trace',
    name: 'Buffalo Trace Bourbon',
    distillery: 'Buffalo Trace',
    type: 'Bourbon',
    region: 'American',
    abv: 45,
    description: 'A rich and complex Kentucky straight bourbon with notes of vanilla, toffee and candied fruit. Aged in new oak barrels for at least 8 years, it\'s remarkably smooth with a long, satisfying finish.',
    attributes: ['Vanilla', 'Caramel', 'Smooth', 'Sweet', 'Oak']
  }
]

// Sample reviews to populate the app with initial activity
export const sampleReviews: Omit<Review, 'createdAt'>[] = [
  {
    id: 'review-1',
    whiskeyId: 'glenfiddich-12',
    userId: 'sample-user-1',
    nickname: 'WhiskyExplorer',
    rating: 4,
    notes: 'A fantastic introduction to single malts. The pear notes are prominent and it\'s incredibly smooth. Perfect for beginners and a staple in any collection.'
  },
  {
    id: 'review-2',
    whiskeyId: 'lagavulin-16',
    userId: 'sample-user-2',
    nickname: 'PeatLover',
    rating: 5,
    notes: 'Absolutely stunning! The peat smoke is incredible but not overwhelming. Complex layers reveal themselves with each sip. My go-to Islay malt.'
  },
  {
    id: 'review-3',
    whiskeyId: 'lagavulin-16',
    userId: 'sample-user-1',
    nickname: 'WhiskyExplorer',
    rating: 4.5,
    notes: 'Intense and sophisticated. The maritime character is distinctive. Took me a while to appreciate it, but now it\'s one of my favorites.'
  },
  {
    id: 'review-4',
    whiskeyId: 'macallan-18-sherry',
    userId: 'sample-user-3',
    nickname: 'SherryFan',
    rating: 5,
    notes: 'Pure luxury in a glass. The sherry influence is magnificent - rich, fruity, and incredibly smooth. Worth every penny for special occasions.'
  },
  {
    id: 'review-5',
    whiskeyId: 'glenlivet-12',
    userId: 'sample-user-1',
    nickname: 'WhiskyExplorer',
    rating: 4,
    notes: 'Clean, crisp and very approachable. The fruity notes are delightful. Great value and perfect for introducing friends to whisky.'
  },
  {
    id: 'review-6',
    whiskeyId: 'ardbeg-10',
    userId: 'sample-user-2',
    nickname: 'PeatLover',
    rating: 5,
    notes: 'If you love peat, this is your whisky. Incredibly smoky yet balanced with citrus sweetness. Ardbeg knows what they\'re doing.'
  },
  {
    id: 'review-7',
    whiskeyId: 'highland-park-12',
    userId: 'sample-user-3',
    nickname: 'SherryFan',
    rating: 4.5,
    notes: 'Wonderfully balanced between sweet and smoky. The heather honey notes are beautiful. A very well-rounded dram from the Orkneys.'
  },
  {
    id: 'review-8',
    whiskeyId: 'talisker-10',
    userId: 'sample-user-4',
    nickname: 'IslandHopper',
    rating: 4.5,
    notes: 'The pepper kick is real! Maritime and bold with a warming finish. Captures the spirit of Skye perfectly. One of my favorite island malts.'
  },
  {
    id: 'review-9',
    whiskeyId: 'monkey-shoulder',
    userId: 'sample-user-1',
    nickname: 'WhiskyExplorer',
    rating: 3.5,
    notes: 'Very easy drinking and great for mixing. Not the most complex, but that\'s not what it\'s trying to be. Excellent value for money.'
  },
  {
    id: 'review-10',
    whiskeyId: 'yamazaki-12',
    userId: 'sample-user-5',
    nickname: 'GlobalSipper',
    rating: 5,
    notes: 'Japanese precision and elegance at its finest. The fruit notes are incredible and the Mizunara influence adds unique complexity. Hard to find but worth it!'
  },
  {
    id: 'review-11',
    whiskeyId: 'buffalo-trace',
    userId: 'sample-user-4',
    nickname: 'IslandHopper',
    rating: 4,
    notes: 'Smooth American bourbon with great vanilla and caramel notes. Easy to drink and fantastic value. My favorite everyday bourbon.'
  },
  {
    id: 'review-12',
    whiskeyId: 'redbreast-12',
    userId: 'sample-user-5',
    nickname: 'GlobalSipper',
    rating: 4.5,
    notes: 'Irish whiskey at its best. Rich, spicy, and smooth with beautiful sherry influence. Single pot still whiskey is underrated!'
  }
]
