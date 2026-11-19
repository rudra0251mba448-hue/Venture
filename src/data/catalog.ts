export type CategoryId = 'all' | 'interior' | 'car-care' | 'mounts-tech' | 'collectibles';

export type VehicleProfileId =
  | 'all'
  | 'swift-baleno'
  | 'nexon-punch'
  | 'creta-i20'
  | 'thar-suv'
  | 'city-sedan';

export interface VehicleProfile {
  id: VehicleProfileId;
  label: string;
  shortLabel: string;
  bodyStyle: string;
  fitmentNote: string;
}

export interface ProductReview {
  author: string;
  city: string;
  car: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  shortBenefit: string;
  description: string;
  variants: string[];
  compatibleVehicles: Exclude<VehicleProfileId, 'all'>[];
  universalFit: boolean;
  fitmentSummary: string;
  dimensions: string;
  installTime: string;
  materialSpec: string;
  inStock: boolean;
  stockNote?: string;
  specs: { label: string; value: string }[];
  installSteps: string[];
  reviews: ProductReview[];
}

export interface CuratedBundle {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  productIds: string[];
  highlights: string[];
  idealFor: string;
}

export const VEHICLE_PROFILES: VehicleProfile[] = [
  {
    id: 'all',
    label: 'All Vehicles',
    shortLabel: 'All Cars',
    bodyStyle: 'Full Curated Catalogue',
    fitmentNote: 'Showing all 8 AutoNest verified products across Indian passenger vehicles.',
  },
  {
    id: 'swift-baleno',
    label: 'Swift / Baleno / Fronx',
    shortLabel: 'Swift · Baleno',
    bodyStyle: 'Compact Hatchback & Crossover',
    fitmentNote: 'Verified vent clips, compact console clearance, and hatch boot fitment.',
  },
  {
    id: 'nexon-punch',
    label: 'Tata Nexon / Punch / Altroz',
    shortLabel: 'Nexon · Punch',
    bodyStyle: 'Compact SUV & Hatch',
    fitmentNote: 'Tested for Tata flat-bottom vents, 12V console placement, and deep door pockets.',
  },
  {
    id: 'creta-i20',
    label: 'Hyundai Creta / i20 / Venue',
    shortLabel: 'Creta · i20',
    bodyStyle: 'Urban SUV & Premium Hatch',
    fitmentNote: 'Compatible with Hyundai horizontal louvers and wide center console trays.',
  },
  {
    id: 'thar-suv',
    label: 'Mahindra Thar / Scorpio-N / XUV',
    shortLabel: 'Thar · SUVs',
    bodyStyle: 'Rugged & Full-Size SUV',
    fitmentNote: 'Heavy-duty dash grip and vibration-damped mounts built for rough roads.',
  },
  {
    id: 'city-sedan',
    label: 'Honda City / Verna / Virtus',
    shortLabel: 'City · Sedans',
    bodyStyle: 'Executive Sedan',
    fitmentNote: 'Low-profile matte finishes tailored for sleek sedan dashboards and boot floors.',
  },
];

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Essentials' },
  { id: 'interior', label: 'Interior Upgrades' },
  { id: 'car-care', label: 'Car Care & Detailing' },
  { id: 'mounts-tech', label: 'Mounts & Utility' },
  { id: 'collectibles', label: 'Collectibles' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'maglock-dash-mount',
    sku: 'AN-MT-01',
    name: 'MagLock Pro Carbon Dash & Vent Mount',
    category: 'mounts-tech',
    categoryLabel: 'Mounts & Utility',
    price: 999,
    compareAtPrice: 1299,
    shortBenefit: 'Zero-wobble N52 magnetic lock tested on Indian speed breakers.',
    description:
      'Engineered with dual-ring N52 neodymium magnets and a steel hook vent clamp plus 3M VHB low-profile dash base. Keeps your phone steady for navigation through Dehradun hill curves and city traffic without blocking AC airflow.',
    variants: ['Stealth Matte Black', 'Brushed Gunmetal'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Fits horizontal & vertical vents + flat dash surfaces (excludes circular Turbine vents).',
    dimensions: '64 × 64 × 42 mm',
    installTime: '45 seconds',
    materialSpec: 'CNC Aluminum Alloy + Silicone Pad',
    inStock: true,
    stockNote: 'Bestseller in Dehradun Pilot',
    specs: [
      { label: 'Magnet Array', value: '16 × N52 Neodymium Ring' },
      { label: 'Mounting Type', value: 'Steel Vent Hook + 3M VHB Base' },
      { label: 'Device Support', value: 'MagSafe Direct + Included Metal Ring' },
      { label: 'Rotation', value: '360° Ball-Joint Tension Lock' },
    ],
    installSteps: [
      'Choose either the metal vent hook or clean the flat dash surface with the included alcohol wipe.',
      'Tighten the locking collar until the silicone stabilizer rests flush against the vent blade.',
      'Attach the slim metal ring to non-MagSafe cases if needed, then snap your phone into place.',
    ],
    reviews: [
      {
        author: 'Raghav Rawat',
        city: 'Dehradun',
        car: 'Tata Nexon XZ+',
        rating: 5,
        comment:
          'Tried two cheap Amazon mounts that snapped on Rajpur Road potholes. This steel hook mount has zero rattle.',
      },
      {
        author: 'Ananya Joshi',
        city: 'Chandigarh',
        car: 'Hyundai i20',
        rating: 5,
        comment: 'Clean matte finish blends straight into the dash instead of looking bulky.',
      },
    ],
  },
  {
    id: 'gap-organizer-set',
    sku: 'AN-IN-02',
    name: 'Nappa-Stitch Seat Gap Organizer Pair',
    category: 'interior',
    categoryLabel: 'Interior Upgrades',
    price: 1199,
    compareAtPrice: 1499,
    shortBenefit: 'Stops keys and phones dropping while adding dual cord-pass slots.',
    description:
      'A pair of contoured PU-leather seat gap catchers with suede-lined compartments and rear USB cable routing cutouts. Designed specifically for compact-to-midsize Indian car seat-to-tunnel widths (18mm to 42mm).',
    variants: ['Obsidian Black / Red Stitch', 'Charcoal / Grey Stitch'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'city-sedan'],
    universalFit: false,
    fitmentSummary: 'Ideal for 18–42 mm console gaps. Not recommended for wide gapless bench seats.',
    dimensions: '265 × 165 × 58 mm (Each)',
    installTime: '30 seconds',
    materialSpec: 'Micro-Grain PU Leather + High-Density Foam Wedge',
    inStock: true,
    stockNote: 'In Stock · Verified Fit',
    specs: [
      { label: 'Set Contents', value: 'Driver + Co-Driver Pair (2 Units)' },
      { label: 'Gap Tolerance', value: '18 mm – 42 mm Tapered Fit' },
      { label: 'Cable Routing', value: 'Dual Bottom USB Pass-Through' },
      { label: 'Lining', value: 'Anti-Rattle Felt Interior' },
    ],
    installSteps: [
      'Slide the tapered foam fin directly between the front seat bolster and center console.',
      'Align the seatbelt buckle cutout so the strap moves freely without obstruction.',
      'Thread your Type-C charging cable through the bottom slot for a clutter-free cockpit.',
    ],
    reviews: [
      {
        author: 'Karan Negi',
        city: 'Dehradun',
        car: 'Maruti Swift ZXi',
        rating: 5,
        comment: 'Fits snugly in the Swift without sliding forward when adjusting the seat.',
      },
    ],
  },
  {
    id: 'detailing-starter-kit',
    sku: 'AN-CC-03',
    name: '6-Piece Ceramic Mist & 800GSM Detailing Kit',
    category: 'car-care',
    categoryLabel: 'Car Care & Detailing',
    price: 1249,
    compareAtPrice: 1599,
    shortBenefit: 'Streak-free Sunday wash & UV interior dressing in one compact pouch.',
    description:
      'Built for young car owners who detail at home or hostel parking. Includes pH-neutral foam shampoo (250ml), quick SiO2 ceramic gloss spray (250ml), matte non-greasy interior protectant (200ml), twin 800GSM edgeless microfiber towels, and soft vent detailing brush.',
    variants: ['Complete 6-Piece Pouch'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Safe for clear-coat paint, matte black plastics, piano black trims, and leatherette.',
    dimensions: '280 × 190 × 110 mm Zip Case',
    installTime: '20 min wash',
    materialSpec: 'pH-Neutral SiO2 Formulas + Korean 800GSM Microfiber',
    inStock: true,
    stockNote: 'In Stock · Ready to Ship',
    specs: [
      { label: 'Paint Protection', value: 'SiO2 Hydrophobic Mist (Up to 6 Weeks)' },
      { label: 'Towel Grade', value: '2 × 800 GSM Edgeless 40×40 cm' },
      { label: 'Interior Finish', value: 'OEM Matte Dry-Touch (Zero Grease)' },
      { label: 'Storage', value: 'Water-Resistant Boot Organizer Bag' },
    ],
    installSteps: [
      'Wash vehicle with 2 caps of pH-neutral shampoo and dry with the plush 800GSM towel.',
      'Mist 1–2 sprays of Ceramic Gloss per panel on cool paint and buff immediately.',
      'Use the soft boar-style bristle brush with Interior Mist to clean AC vents and piano black switches.',
    ],
    reviews: [
      {
        author: 'Siddharth Bisht',
        city: 'Dehradun',
        car: 'Hyundai Creta SX',
        rating: 5,
        comment:
          'Love that the interior spray does not leave a shiny sticky film on the dashboard. Rain beads right off the bonnet.',
      },
    ],
  },
  {
    id: 'ambient-fiber-kit',
    sku: 'AN-IN-04',
    name: 'OEM-Flush USB-C Interior Ambient Strip',
    category: 'interior',
    categoryLabel: 'Interior Upgrades',
    price: 1399,
    compareAtPrice: 1799,
    shortBenefit: 'Tuck-in optical fiber illumination with zero exposed wiring or glare.',
    description:
      'Replace harsh aftermarket LED tubes with a 3-meter razor-fin optical fiber strip that tucks cleanly into dashboard panel seams. Powered via USB-C or 12V adapter with subtle warm white, ice blue, or racing amber modes via hidden touch dimmer.',
    variants: ['Warm Amber / Ice Blue Dual', '64-Tone App Controlled'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'city-sedan'],
    universalFit: false,
    fitmentSummary: 'Requires 1.5 mm dashboard trim seam (fits Swift, Baleno, i20, Creta, Nexon, City).',
    dimensions: '3.0 m Optical Fin · 1.5 mm Flange',
    installTime: '15 minutes',
    materialSpec: 'Diffused PMMA Light Guide + Silicone Fin',
    inStock: true,
    stockNote: 'Limited Batch',
    specs: [
      { label: 'Power Input', value: '5V USB-C / USB-A (Low Heat)' },
      { label: 'Brightness', value: '5-Step Night Dimming Memory' },
      { label: 'Trim Tool', value: 'Nylon Pry Tool Included' },
      { label: 'Warranty', value: '6-Month Replacement Guarantee' },
    ],
    installSteps: [
      'Use the included nylon pry tool to gently press the optical fin into the dashboard seam.',
      'Route the thin power lead down the passenger A-pillar or center console gap.',
      'Plug into your center USB port and tap the inline dimmer to match your gauge cluster tone.',
    ],
    reviews: [
      {
        author: 'Devansh Sharma',
        city: 'Noida',
        car: 'Honda City V',
        rating: 5,
        comment: 'Looks factory-fitted at night on warm amber mode. Took me 12 minutes to tuck in.',
      },
    ],
  },
  {
    id: 'foldable-boot-crate',
    sku: 'AN-IN-05',
    name: 'Velcro-Grip 45L Collapsible Boot Organizer',
    category: 'interior',
    categoryLabel: 'Interior Upgrades',
    price: 1099,
    compareAtPrice: 1399,
    shortBenefit: 'Keeps detailing sprays, gym gear, and groceries upright on corners.',
    description:
      'Constructed with rigid 1680D ballistic oxford fabric, removable dividers, and heavy-duty anti-slip Velcro strips on the base that lock onto factory trunk carpets—even in compact hatchback boots.',
    variants: ['45L Compact Hatch / Sedan', '60L Full SUV Edition'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Sized for Maruti Swift/Baleno boots (45L) and Creta/Thar/City trunks.',
    dimensions: '520 × 340 × 270 mm (Folded: 45 mm)',
    installTime: '10 seconds',
    materialSpec: '1680D Ballistic Oxford + Rigid PP Core Panels',
    inStock: true,
    specs: [
      { label: 'Compartments', value: '3 Main Bays + 4 Side Mesh Pockets' },
      { label: 'Base Anchor', value: 'Full-Width Carpet Grip Velcro' },
      { label: 'Load Rating', value: 'Up to 22 kg Static Load' },
      { label: 'Fold Profile', value: 'Collapses Flat to 4.5 cm' },
    ],
    installSteps: [
      'Unclip the side buckles and insert the rigid bottom board to lock the frame.',
      'Position against the rear seatback carpet so the base Velcro grips firmly.',
      'Adjust the center Velcro divider for bottles, jump cables, or helmets.',
    ],
    reviews: [
      {
        author: 'Prateek Rawat',
        city: 'Dehradun',
        car: 'Maruti Baleno Alpha',
        rating: 4,
        comment: 'Zero sliding in the boot during Mussoorie climbs. Folds flat when carrying suitcases.',
      },
    ],
  },
  {
    id: 'alloy-metal-scent',
    sku: 'AN-CC-06',
    name: 'Anodized Alloy Vent Diffuser + 3 Refills',
    category: 'car-care',
    categoryLabel: 'Car Care & Detailing',
    price: 549,
    compareAtPrice: 749,
    shortBenefit: 'Clean cedarwood & citrus cabin scent without messy hanging bottles.',
    description:
      'Machined anodized aluminum bar that clips discretely onto any horizontal AC louver. Uses dry solid ceramic fragrance cores infused with essential oils—zero leak risk on hot summer dashboards.',
    variants: ['Matte Black · Cedar & Bergamot', 'Titanium Silver · Fresh Pine'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Silicone-sleeved spring clip fits all standard horizontal and thick SUV vents.',
    dimensions: '82 × 14 × 14 mm',
    installTime: '10 seconds',
    materialSpec: 'Bead-Blasted Aluminum + Solid Ceramic Core',
    inStock: true,
    stockNote: 'Great Starter Add-On',
    specs: [
      { label: 'Core Longevity', value: '30–40 Days per Solid Stick (3 Included)' },
      { label: 'Heat Resistance', value: 'Leak-Proof up to 75°C Cabin Temp' },
      { label: 'Control', value: 'Twist-Shutter Airflow Dial' },
    ],
    installSteps: [
      'Unscrew the end cap and drop in one solid ceramic fragrance stick.',
      'Slide the silicone-padded clip onto your center AC louver.',
      'Rotate the top slot to adjust scent intensity.',
    ],
    reviews: [
      {
        author: 'Aarav Verma',
        city: 'Dehradun',
        car: 'Mahindra Thar LX',
        rating: 5,
        comment: 'Subtle, non-headache fragrance and looks like part of the Thar vent trim.',
      },
    ],
  },
  {
    id: 'twin-usb-fast-charger',
    sku: 'AN-MT-07',
    name: '65W Flush-Fit Dual PD Car Charger + Braided Cable',
    category: 'mounts-tech',
    categoryLabel: 'Mounts & Utility',
    price: 799,
    compareAtPrice: 999,
    shortBenefit: 'Sits flush in your 12V socket with live voltage readout & 65W laptop/phone PD.',
    description:
      'Built for road trips and daily commutes. Fits flush inside Indian 12V accessory sockets with a fold-out pull tab, delivering 45W USB-C PD + 20W QC3.0 simultaneously with thermal cut-off protection.',
    variants: ['Space Grey · Type-C Cable', 'Space Grey · Lightning Cable'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Works in standard 12V/24V sockets including recessed Tata Nexon & Creta consoles.',
    dimensions: '41 × 21 mm Flush Profile',
    installTime: '5 seconds',
    materialSpec: 'Zinc Alloy Body + Kevlar-Braided 1m Cable',
    inStock: true,
    specs: [
      { label: 'Total Output', value: '65W Max (45W PD + 20W QC3.0)' },
      { label: 'Safety', value: 'Over-Voltage, Surge & Temp Guard' },
      { label: 'Removal', value: 'Fold-Flat Stainless Pull Handle' },
    ],
    installSteps: [
      'Insert into your 12V socket until the outer ring sits flush with the console trim.',
      'Connect the included 1m braided fast-charge cable without console lid interference.',
    ],
    reviews: [
      {
        author: 'Nikhil Mehta',
        city: 'Gurugram',
        car: 'VW Virtus / City',
        rating: 5,
        comment: 'Finally a charger that lets the center console shutter close completely.',
      },
    ],
  },
  {
    id: 'diecast-keychain-model',
    sku: 'AN-CL-08',
    name: '1:64 Heritage Alloy Desk Model & Rotor Keychain',
    category: 'collectibles',
    categoryLabel: 'Collectibles',
    price: 649,
    compareAtPrice: 849,
    shortBenefit: 'Weighted 1:64 die-cast display car paired with a spinning brake-rotor fob.',
    description:
      'For true automotive enthusiasts. Features a precision 1:64 rubber-tire die-cast coupe on an acrylic display plinth alongside a CNC-machined spinning caliper-and-rotor keychain.',
    variants: ['Alpine White Coupe + Red Caliper', 'Gunmetal GT + Gold Caliper'],
    compatibleVehicles: ['swift-baleno', 'nexon-punch', 'creta-i20', 'thar-suv', 'city-sedan'],
    universalFit: true,
    fitmentSummary: 'Keychain ring fits all smart key fobs & flip keys; display plinth fits flat desks/dash.',
    dimensions: 'Car: 72 mm · Rotor Keychain: 34 mm',
    installTime: 'Ready out of box',
    materialSpec: 'Zinc Die-Cast + Acrylic Display Case',
    inStock: true,
    stockNote: 'Enthusiast Favorite',
    specs: [
      { label: 'Scale Model', value: '1:64 Die-Cast with Rubber Tires' },
      { label: 'Keychain', value: 'Free-Spinning Vented Disc Rotor' },
      { label: 'Packaging', value: 'Gift-Ready Collector Sleeve' },
    ],
    installSteps: [
      'Attach the spinning rotor fob to your car key using the split steel ring.',
      'Display the 1:64 scale coupe on your desk or use the clear 3M pad for stationary shelf mounting.',
    ],
    reviews: [
      {
        author: 'Kabir Thapa',
        city: 'Dehradun',
        car: 'College Enthusiast',
        rating: 5,
        comment: 'Bought this as a gift for my friend’s new Baleno delivery. The spinning rotor feels super solid.',
      },
    ],
  },
];

export const CURATED_BUNDLES: CuratedBundle[] = [
  {
    id: 'bundle-clean-cockpit',
    name: 'Clean Cockpit Starter Bundle',
    subtitle: 'Most popular ₹1,299 launch pack — saves ₹449 vs individual items',
    price: 1299,
    originalPrice: 1748,
    productIds: ['maglock-dash-mount', 'twin-usb-fast-charger'],
    highlights: [
      'MagLock Pro Carbon Dash & Vent Mount',
      '65W Flush-Fit Dual PD Car Charger + Cable',
      'Complimentary Dehradun Express / Free Pan-India Delivery',
    ],
    idealFor: 'Daily commuters & new car deliveries',
  },
  {
    id: 'bundle-weekend-detail',
    name: 'Weekend Shine & Cabin Fresh Kit',
    subtitle: 'Complete interior & exterior care — saves ₹399 on the bundle',
    price: 1399,
    originalPrice: 1798,
    productIds: ['detailing-starter-kit', 'alloy-metal-scent'],
    highlights: [
      '6-Piece Ceramic Mist & 800GSM Detailing Kit',
      'Anodized Alloy Vent Diffuser + 3 Solid Refills',
      'Includes step-by-step Monsoon & Dust Care Guide',
    ],
    idealFor: 'Weekend detailing & road-trip prep',
  },
];
