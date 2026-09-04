import sneaker from "@/assets/shoe-sneaker.jpg";
import formal from "@/assets/shoe-formal.jpg";
import loafer from "@/assets/shoe-loafer.jpg";
import sports from "@/assets/shoe-sports.jpg";
import hero from "@/assets/hero-shoe.jpg";
import cleaning from "@/assets/cleaning.jpg";
import factory from "@/assets/factory.jpg";

/** Image keys let admin swap images without touching components. */
export const imageLibrary: Record<string, string> = {
  sneaker,
  formal,
  loafer,
  sports,
  hero,
  cleaning,
  factory,
};

export function resolveImage(key: string): string {
  const fallback = sneaker;
  if (!key) return fallback;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return imageLibrary[key] ?? fallback;
}


export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string;
  materials: string;
  care: string;
  sizes: number[];
  colors: string[];
  image: string;
  gallery: string[];
  stock: number;
  status: "Active" | "Draft" | "Out of Stock";
  featured: boolean;
  createdAt: string;
};

export const categories = [
  "Sneakers",
  "Running",
  "Formal",
  "Casual",
  "Loafers",
  "Sports",
  "Premium",
];

export const mockProducts: Product[] = [
  {
    id: "luv-classic-runner",
    name: "LUVAAN Classic Runner",
    category: "Running",
    price: 2899,
    originalPrice: 3799,
    rating: 4.6,
    reviewCount: 128,
    description: "Lightweight everyday runner with a breathable knit upper.",
    details:
      "An everyday running silhouette built on a dual-density midsole for long-wear comfort. Reinforced heel counter keeps the fit locked in on longer distances.",
    materials: "Engineered mesh upper, EVA midsole, rubber outsole.",
    care: "Wipe with a damp cloth. Air dry away from direct sunlight. Do not machine wash.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["White", "Charcoal", "Tan"],
    image: "sneaker",
    gallery: ["sneaker", "sports", "hero"],
    stock: 48,
    status: "Active",
    featured: true,
    createdAt: "2026-05-12",
  },
  {
    id: "luv-urban-leather",
    name: "LUVAAN Urban Leather",
    category: "Premium",
    price: 5499,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 92,
    description: "Full-grain leather sneaker finished by hand in Pune.",
    details:
      "A minimal court sneaker cut from full-grain leather with a cupsole construction and tonal stitching for a clean, premium finish.",
    materials: "Full-grain leather upper, leather lining, rubber cupsole.",
    care: "Use a leather conditioner monthly. Store with shoe trees.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Off White", "Black", "Tan"],
    image: "hero",
    gallery: ["hero", "sneaker", "loafer"],
    stock: 22,
    status: "Active",
    featured: true,
    createdAt: "2026-06-02",
  },
  {
    id: "luv-street-flex",
    name: "LUVAAN Street Flex",
    category: "Sneakers",
    price: 2199,
    originalPrice: 2699,
    rating: 4.3,
    reviewCount: 214,
    description: "Flexible street sneaker made for all-day city wear.",
    details:
      "Soft flex grooves and a padded collar make this the easiest shoe in the rotation. Pairs with everything.",
    materials: "Canvas and synthetic overlays, foam footbed.",
    care: "Spot clean with mild soap and a soft brush.",
    sizes: [6, 7, 8, 9, 10],
    colors: ["White", "Grey", "Terracotta"],
    image: "sneaker",
    gallery: ["sneaker", "sports"],
    stock: 61,
    status: "Active",
    featured: true,
    createdAt: "2026-04-18",
  },
  {
    id: "luv-executive-walk",
    name: "LUVAAN Executive Walk",
    category: "Formal",
    price: 4299,
    originalPrice: 5299,
    rating: 4.7,
    reviewCount: 76,
    description: "Hand-polished derby for boardrooms and long days.",
    details:
      "Blake-stitched derby with a cushioned leather insole, shaped last and a slim welt for a refined profile.",
    materials: "Calf leather upper, leather insole, TPR sole.",
    care: "Polish regularly. Use a shoe horn. Rotate wear days.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Tan Brown", "Black"],
    image: "formal",
    gallery: ["formal", "loafer"],
    stock: 30,
    status: "Active",
    featured: true,
    createdAt: "2026-03-30",
  },
  {
    id: "luv-comfort-knit",
    name: "LUVAAN Comfort Knit",
    category: "Casual",
    price: 1699,
    originalPrice: 2199,
    rating: 4.2,
    reviewCount: 156,
    description: "Sock-fit knit slip-on with memory foam cushioning.",
    details:
      "A stretch knit upper wraps the foot without pressure points — ideal for travel days and long commutes.",
    materials: "Recycled knit upper, memory foam insole, phylon sole.",
    care: "Hand wash cold, air dry.",
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ["Grey", "Charcoal", "Beige"],
    image: "sports",
    gallery: ["sports", "sneaker"],
    stock: 74,
    status: "Active",
    featured: true,
    createdAt: "2026-06-20",
  },
  {
    id: "luv-everyday-loafer",
    name: "LUVAAN Everyday Loafer",
    category: "Loafers",
    price: 3499,
    originalPrice: 4199,
    rating: 4.5,
    reviewCount: 64,
    description: "Soft suede loafer that dresses up or down instantly.",
    details:
      "Unlined suede loafer with a flexible sole — smart enough for the office, easy enough for weekends.",
    materials: "Premium suede upper, leather sock, flexible rubber sole.",
    care: "Brush with a suede brush. Use a suede protector spray.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Sand", "Dark Brown"],
    image: "loafer",
    gallery: ["loafer", "formal"],
    stock: 18,
    status: "Active",
    featured: true,
    createdAt: "2026-05-28",
  },
  {
    id: "luv-active-pro",
    name: "LUVAAN Active Pro",
    category: "Sports",
    price: 3299,
    rating: 4.4,
    reviewCount: 103,
    description: "Training shoe with a stable base for gym and turf.",
    details:
      "A wide, stable platform and grippy outsole built for lifting, court work and mixed training.",
    materials: "Ripstop mesh, TPU cage, high-abrasion rubber outsole.",
    care: "Remove insoles to dry after heavy sessions.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black", "Graphite"],
    image: "sports",
    gallery: ["sports", "sneaker"],
    stock: 40,
    status: "Active",
    featured: true,
    createdAt: "2026-07-04",
  },
  {
    id: "luv-heritage-classic",
    name: "LUVAAN Heritage Classic",
    category: "Premium",
    price: 6999,
    originalPrice: 8499,
    rating: 4.9,
    reviewCount: 41,
    description: "Our flagship hand-finished leather shoe, made to last.",
    details:
      "Built over 40 hours across seven stations. Vegetable-tanned leather that ages into its own patina.",
    materials: "Vegetable-tanned leather, leather welt, natural cork footbed.",
    care: "Condition every 4-6 weeks. Keep on cedar trees.",
    sizes: [7, 8, 9, 10, 11],
    colors: ["Cognac", "Espresso"],
    image: "formal",
    gallery: ["formal", "hero", "loafer"],
    stock: 12,
    status: "Active",
    featured: true,
    createdAt: "2026-02-14",
  },
  {
    id: "luv-trail-grip",
    name: "LUVAAN Trail Grip",
    category: "Running",
    price: 3899,
    originalPrice: 4499,
    rating: 4.1,
    reviewCount: 37,
    description: "Grippy trail runner for monsoon-ready traction.",
    details: "Deep lugs and a rock plate keep footing sure on wet, broken ground.",
    materials: "Water-resistant mesh, rock plate, lugged rubber outsole.",
    care: "Rinse mud off after use, air dry.",
    sizes: [7, 8, 9, 10, 11],
    colors: ["Graphite", "Terracotta"],
    image: "sports",
    gallery: ["sports"],
    stock: 26,
    status: "Active",
    featured: false,
    createdAt: "2026-07-19",
  },
  {
    id: "luv-city-oxford",
    name: "LUVAAN City Oxford",
    category: "Formal",
    price: 4899,
    rating: 4.6,
    reviewCount: 52,
    description: "Closed-lacing oxford with a sharp almond toe.",
    details: "A dress shoe with quiet detailing and a comfortable, padded footbed.",
    materials: "Box calf leather, leather lining.",
    care: "Cream polish and a horsehair brush.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Black", "Tan Brown"],
    image: "formal",
    gallery: ["formal"],
    stock: 0,
    status: "Out of Stock",
    featured: false,
    createdAt: "2026-01-22",
  },
];

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  status: "Active" | "Paused";
};

export const mockServices: Service[] = [
  {
    id: "svc-basic",
    name: "Basic Shoe Cleaning",
    price: 299,
    duration: "24 hours",
    description:
      "Surface clean for everyday pairs — upper, midsole and laces refreshed.",
    image: "cleaning",
    status: "Active",
  },
  {
    id: "svc-deep",
    name: "Deep Cleaning",
    price: 499,
    duration: "48 hours",
    description:
      "Full teardown clean including insoles, outsole grooves and deodorising.",
    image: "sneaker",
    status: "Active",
  },
  {
    id: "svc-sneaker",
    name: "Premium Sneaker Cleaning",
    price: 699,
    duration: "48-72 hours",
    description:
      "Specialist care for premium sneakers, with midsole detailing and re-lacing.",
    image: "hero",
    status: "Active",
  },
  {
    id: "svc-leather",
    name: "Leather Shoe Care",
    price: 599,
    duration: "48 hours",
    description: "Clean, condition and polish for leather formals and boots.",
    image: "formal",
    status: "Active",
  },
  {
    id: "svc-suede",
    name: "Suede Shoe Cleaning",
    price: 699,
    duration: "72 hours",
    description: "Dry-clean method for suede and nubuck, plus protector coating.",
    image: "loafer",
    status: "Active",
  },
  {
    id: "svc-restore",
    name: "Whitening & Restoration",
    price: 999,
    duration: "4-6 days",
    description:
      "Sole whitening, stain removal, re-paint and restoration for tired pairs.",
    image: "cleaning",
    status: "Active",
  },
];

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  email: string;
  shoeType: string;
  service: string;
  date: string;
  time: string;
  mode: string;
  notes: string;
  amount: number;
  status: string;
};

export const bookingStatuses = [
  "New",
  "Confirmed",
  "Pickup Scheduled",
  "Cleaning",
  "Ready",
  "Completed",
  "Cancelled",
];

export const mockBookings: Booking[] = [
  {
    id: "LC-24801",
    customer: "Rohit Deshmukh",
    phone: "9822011234",
    email: "rohit.d@example.com",
    shoeType: "Sneakers",
    service: "Premium Sneaker Cleaning",
    date: "2026-09-02",
    time: "11:00 AM",
    mode: "Pickup",
    notes: "White midsoles need whitening.",
    amount: 699,
    status: "Cleaning",
  },
  {
    id: "LC-24802",
    customer: "Ananya Kulkarni",
    phone: "9765432210",
    email: "ananya.k@example.com",
    shoeType: "Leather Formals",
    service: "Leather Shoe Care",
    date: "2026-09-03",
    time: "04:30 PM",
    mode: "Drop-off",
    notes: "",
    amount: 599,
    status: "Confirmed",
  },
  {
    id: "LC-24803",
    customer: "Imran Shaikh",
    phone: "9890011223",
    email: "imran.s@example.com",
    shoeType: "Suede Loafers",
    service: "Suede Shoe Cleaning",
    date: "2026-09-04",
    time: "10:00 AM",
    mode: "Pickup",
    notes: "Water stain on left toe.",
    amount: 699,
    status: "New",
  },
  {
    id: "LC-24804",
    customer: "Sneha Patil",
    phone: "9922334455",
    email: "sneha.p@example.com",
    shoeType: "Running Shoes",
    service: "Deep Cleaning",
    date: "2026-08-29",
    time: "01:00 PM",
    mode: "Drop-off",
    notes: "",
    amount: 499,
    status: "Completed",
  },
  {
    id: "LC-24805",
    customer: "Vikram Rao",
    phone: "9011223344",
    email: "vikram.rao@example.com",
    shoeType: "Sneakers",
    service: "Whitening & Restoration",
    date: "2026-09-05",
    time: "06:00 PM",
    mode: "Pickup",
    notes: "Yellowed soles.",
    amount: 999,
    status: "Pickup Scheduled",
  },
];

export type Order = {
  id: string;
  customer: string;
  date: string;
  items: number;
  amount: number;
  payment: "Paid" | "Pending" | "Refunded" | "COD";
  status: string;
};

export const orderStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const mockOrders: Order[] = [
  { id: "LV-10241", customer: "Rohit Deshmukh", date: "2026-09-01", items: 2, amount: 7398, payment: "Paid", status: "Processing" },
  { id: "LV-10242", customer: "Ananya Kulkarni", date: "2026-09-01", items: 1, amount: 3499, payment: "Paid", status: "Shipped" },
  { id: "LV-10243", customer: "Imran Shaikh", date: "2026-08-31", items: 3, amount: 9897, payment: "COD", status: "Pending" },
  { id: "LV-10244", customer: "Sneha Patil", date: "2026-08-30", items: 1, amount: 6999, payment: "Paid", status: "Delivered" },
  { id: "LV-10245", customer: "Vikram Rao", date: "2026-08-29", items: 2, amount: 5098, payment: "Pending", status: "Confirmed" },
  { id: "LV-10246", customer: "Meera Joshi", date: "2026-08-28", items: 1, amount: 2199, payment: "Refunded", status: "Cancelled" },
  { id: "LV-10247", customer: "Aditya Nair", date: "2026-08-27", items: 4, amount: 12996, payment: "Paid", status: "Delivered" },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spent: number;
  status: "Active" | "Inactive";
};

export const mockCustomers: Customer[] = [
  { id: "CUS-1001", name: "Rohit Deshmukh", phone: "9822011234", email: "rohit.d@example.com", orders: 6, spent: 28450, status: "Active" },
  { id: "CUS-1002", name: "Ananya Kulkarni", phone: "9765432210", email: "ananya.k@example.com", orders: 4, spent: 16980, status: "Active" },
  { id: "CUS-1003", name: "Imran Shaikh", phone: "9890011223", email: "imran.s@example.com", orders: 2, spent: 9897, status: "Active" },
  { id: "CUS-1004", name: "Sneha Patil", phone: "9922334455", email: "sneha.p@example.com", orders: 9, spent: 41230, status: "Active" },
  { id: "CUS-1005", name: "Vikram Rao", phone: "9011223344", email: "vikram.rao@example.com", orders: 1, spent: 5098, status: "Inactive" },
  { id: "CUS-1006", name: "Meera Joshi", phone: "9700112233", email: "meera.j@example.com", orders: 3, spent: 11240, status: "Active" },
];

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};

export const mockReviews: Review[] = [
  { id: "REV-501", productId: "luv-classic-runner", author: "Sneha P.", rating: 5, title: "Superb daily runner", body: "Light, breathable and the cushioning holds up after 200km.", date: "2026-08-21", status: "Approved" },
  { id: "REV-502", productId: "luv-classic-runner", author: "Aditya N.", rating: 4, title: "Great value", body: "Fit runs slightly narrow, size up if you have wide feet.", date: "2026-08-14", status: "Approved" },
  { id: "REV-503", productId: "luv-urban-leather", author: "Rohit D.", rating: 5, title: "Looks premium", body: "Leather quality is genuinely impressive for the price.", date: "2026-08-09", status: "Approved" },
  { id: "REV-504", productId: "luv-executive-walk", author: "Imran S.", rating: 5, title: "Boardroom ready", body: "Comfortable through a 12 hour day.", date: "2026-08-02", status: "Approved" },
  { id: "REV-505", productId: "luv-street-flex", author: "Meera J.", rating: 3, title: "Decent", body: "Nice colour but sole feels a bit thin.", date: "2026-08-25", status: "Pending" },
  { id: "REV-506", productId: "luv-heritage-classic", author: "Vikram R.", rating: 5, title: "Worth every rupee", body: "Craftsmanship is on another level.", date: "2026-08-27", status: "Pending" },
  { id: "REV-507", productId: "luv-active-pro", author: "Anon", rating: 1, title: "spam", body: "Buy cheap shoes at my link.", date: "2026-08-28", status: "Rejected" },
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  published: boolean;
};

export const portfolioCategories = [
  "Lifestyle Footwear",
  "Sports Shoes",
  "Formal Footwear",
  "Premium Sneakers",
  "Custom Designs",
  "Manufacturing Showcase",
];

export const mockPortfolio: PortfolioItem[] = [
  { id: "PF-01", title: "Everyday Lifestyle Line", category: "Lifestyle Footwear", description: "A 12-piece lifestyle range built around one comfort last.", image: "sneaker", published: true },
  { id: "PF-02", title: "Court & Turf Series", category: "Sports Shoes", description: "Training footwear developed with local athletes in Pune.", image: "sports", published: true },
  { id: "PF-03", title: "Boardroom Formals", category: "Formal Footwear", description: "Blake-stitched derbies and oxfords in calf leather.", image: "formal", published: true },
  { id: "PF-04", title: "Heritage Sneaker Capsule", category: "Premium Sneakers", description: "Full-grain leather cupsole sneakers, hand finished.", image: "hero", published: true },
  { id: "PF-05", title: "Corporate Custom Order", category: "Custom Designs", description: "500-pair custom order with embossed branding.", image: "loafer", published: true },
  { id: "PF-06", title: "Inside The Workshop", category: "Manufacturing Showcase", description: "Seven-station production floor documented end to end.", image: "factory", published: true },
];

export type ManufacturingStep = {
  id: string;
  order: number;
  title: string;
  description: string;
  image: string;
  status: "Published" | "Hidden";
};

export const mockManufacturingSteps: ManufacturingStep[] = [
  { id: "MS-1", order: 1, title: "Material Selection", description: "Leathers, knits and soles are sourced and graded before anything is cut.", image: "factory", status: "Published" },
  { id: "MS-2", order: 2, title: "Design & Development", description: "Patterns are drafted, sampled and fit-tested on our house last.", image: "hero", status: "Published" },
  { id: "MS-3", order: 3, title: "Cutting", description: "Panels are clicker-cut for consistent grain direction and minimal waste.", image: "factory", status: "Published" },
  { id: "MS-4", order: 4, title: "Stitching", description: "Uppers are closed by experienced operators, seam by seam.", image: "factory", status: "Published" },
  { id: "MS-5", order: 5, title: "Assembly", description: "Uppers are lasted and bonded or stitched to the sole unit.", image: "sports", status: "Published" },
  { id: "MS-6", order: 6, title: "Quality Inspection", description: "Every pair is checked for bonding, symmetry, finish and comfort.", image: "formal", status: "Published" },
  { id: "MS-7", order: 7, title: "Final Packaging", description: "Cleaned, tissue-wrapped and boxed with care instructions.", image: "loafer", status: "Published" },
];

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Resolved";
};

export const mockEnquiries: Enquiry[] = [
  { id: "ENQ-301", name: "Karan Mehta", email: "karan.m@example.com", phone: "9812345678", subject: "Bulk order enquiry", message: "We need 300 pairs of formal shoes for staff uniforms.", date: "2026-09-01", status: "New" },
  { id: "ENQ-302", name: "Priya Sharma", email: "priya.s@example.com", phone: "9898989898", subject: "Cleaning pickup area", message: "Do you offer pickup in Wakad?", date: "2026-08-30", status: "Contacted" },
  { id: "ENQ-303", name: "Zoya Khan", email: "zoya.k@example.com", phone: "9777123456", subject: "Return request", message: "Size 9 was tight, can I exchange for a 10?", date: "2026-08-28", status: "Resolved" },
];

export type HomepageData = {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  discoverText: string;
  floatingTags: string[];
  introTitle: string;
  introBody: string;
  introImage: string;
  featuredIds: string[];
  whyCards: { title: string; body: string; icon: string }[];
  manufacturingHighlight: string;
  portfolioHighlight: string;
  serviceHighlight: string;
};

export const mockHomepageData: HomepageData = {
  heroLabel: "Crafted For Every Step",
  heroTitle: "Step Into Better.",
  heroSubtitle:
    "Premium footwear crafted with purpose, designed for everyday confidence, and backed by professional shoe care.",
  heroImage: "hero",
  ctaPrimaryText: "Explore Collection",
  ctaPrimaryLink: "/collection",
  ctaSecondaryText: "Book Shoe Cleaning",
  ctaSecondaryLink: "/shoe-cleaning",
  discoverText: "Discover LUVAAN",
  floatingTags: ["Premium Craftsmanship", "Made for Everyday", "Professional Shoe Care"],
  introTitle: "More Than Footwear.",
  introBody:
    "LUVAAN INTERNATIONAL PRIVATE LIMITED is a Pune-based footwear house that manufactures, sells and cares for its own shoes. We control the line from material selection to the final polish, then keep your pair looking new with professional shoe cleaning — one brand, one standard, end to end.",
  introImage: "factory",
  featuredIds: [
    "luv-classic-runner",
    "luv-urban-leather",
    "luv-street-flex",
    "luv-executive-walk",
    "luv-comfort-knit",
    "luv-everyday-loafer",
    "luv-active-pro",
    "luv-heritage-classic",
  ],
  whyCards: [
    { title: "Premium Materials", body: "Full-grain leathers, engineered knits and soles graded before cutting.", icon: "◈" },
    { title: "Thoughtful Design", body: "Every last is fit-tested so the shoe works on real feet, not just paper.", icon: "◇" },
    { title: "Quality Manufacturing", body: "A seven-step in-house process with inspection on every pair.", icon: "▤" },
    { title: "Comfortable Fit", body: "Cushioned footbeds and shaped collars built for full days.", icon: "◐" },
    { title: "Professional Shoe Care", body: "In-house cleaning and restoration keeps your pair going longer.", icon: "✦" },
    { title: "Customer First", body: "Easy exchanges, honest sizing guidance and responsive support.", icon: "❖" },
  ],
  manufacturingHighlight: "A seven-step production process, run and inspected in-house.",
  portfolioHighlight: "Lines we have designed, produced and delivered.",
  serviceHighlight: "Professional cleaning, restoration and leather care from ₹299.",
};

export type Settings = {
  companyName: string;
  brandName: string;
  phone: string;
  email: string;
  address: string;
  footerText: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  businessHours: string;
};

export const mockSettings: Settings = {
  companyName: "LUVAAN INTERNATIONAL PRIVATE LIMITED",
  brandName: "LUVAAN",
  phone: "9945678901",
  email: "support@luvaan.com",
  address:
    "S No 787/3, Flat No 8, Aundh Road, Baner, Haveli, Pune, Maharashtra, 411045, India",
  footerText:
    "© 2026 LUVAAN INTERNATIONAL PRIVATE LIMITED. All Rights Reserved.",
  instagram: "https://instagram.com/luvaan",
  facebook: "https://facebook.com/luvaan",
  linkedin: "https://linkedin.com/company/luvaan",
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
};

export const manufacturingStats = [
  { value: "10+", label: "Product Categories" },
  { value: "100%", label: "Quality Focus" },
  { value: "7-Step", label: "Production Process" },
  { value: "Premium", label: "Materials" },
];

export const ADMIN_CREDENTIALS = {
  email: "admin@luvaan.com",
  password: "admin123",
};
