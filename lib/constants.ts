import { NavItem, Service, Industry, Stat, Testimonial, Milestone, WhyPoint, HeroSlide } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'FTL (Full Truck Load)', href: '/services/ftl' },
      { label: 'PTL (Part Truck Load)', href: '/services/ptl' },
      { label: 'Warehousing', href: '/services/warehousing' },
      { label: 'Project Cargo', href: '/services/project-cargo' },
      { label: 'Chemical Logistics', href: '/services/chemical' },
      { label: 'CFS & Container', href: '/services/cfs' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'FMCG', href: '/industries#fmcg' },
      { label: 'Chemical', href: '/industries#chemical' },
      { label: 'Automotive', href: '/industries#auto' },
      { label: 'Pharma', href: '/industries#pharma' },
      { label: 'Energy & Solar', href: '/industries#energy' },
      { label: 'All Industries', href: '/industries' },
    ],
  },
  { label: 'Network', href: '/network' },
  { label: '🌱 Carbon', href: '/carbon' },
  { label: 'Milestones', href: '/milestones' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'ftl',
    title: 'Full Truck Load (FTL)',
    slug: 'ftl',
    icon: 'Truck',
    shortDesc: 'Dedicated transport solutions for large shipments across India.',
    longDesc: 'Our Full Truck Load (FTL) services provide dedicated vehicles for your cargo, ensuring maximum efficiency, safety, and speed. With our extensive fleet of company-owned vehicles, we guarantee availability and reliability for your high-volume transport needs.',
    benefits: ['Dedicated Vehicles', 'Real-time GPS Tracking', 'Direct Delivery', 'Cost-effective for Large Volumes'],
    industries: ['FMCG', 'Automotive', 'Steel', 'Construction'],
  },
  {
    id: 'ptl',
    title: 'Part Truck Load (PTL)',
    slug: 'ptl',
    icon: 'Package',
    shortDesc: 'Efficient and reliable partial load transportation.',
    longDesc: 'Our PTL services are perfect for shipments that don\'t require a full truck. We optimize routes and combine loads to provide you with a cost-effective solution without compromising on delivery speed or safety.',
    benefits: ['Pay for Space Used', 'Regular Departures', 'Door-to-Door Delivery', 'Secure Handling'],
    industries: ['Retail', 'Textiles', 'Small Electronics'],
  },
  {
    id: 'warehousing',
    title: 'Warehousing & 3PL',
    slug: 'warehousing',
    icon: 'Warehouse',
    shortDesc: 'Strategic storage and distribution solutions.',
    longDesc: 'We offer state-of-the-art warehousing facilities at key strategic locations. Our 3PL solutions include inventory management, order fulfillment, and distribution services designed to streamline your supply chain.',
    benefits: ['Inventory Management', 'Safe Storage', 'Distribution Services', 'Customizable Solutions'],
    industries: ['FMCG', 'E-Commerce', 'Pharma'],
  },
  {
    id: 'project-cargo',
    title: 'Project Cargo',
    slug: 'project-cargo',
    icon: 'Crane',
    shortDesc: 'Specialized handling for ODC and heavy machinery.',
    longDesc: 'Handling Over Dimensional Cargo (ODC) and heavy machinery requires expertise and specialized equipment. MS Citizen Carrier has a proven track record of managing complex project cargo with precision and safety.',
    benefits: ['Specialized Equipment', 'Route Surveys', 'Expert Handling', 'End-to-End Management'],
    industries: ['Energy & Solar', 'Construction', 'Aerospace'],
  },
  {
    id: 'chemical',
    title: 'Chemical Logistics',
    slug: 'chemical',
    icon: 'FlaskConical',
    shortDesc: 'Safe and compliant transport of hazardous materials.',
    longDesc: 'We specialize in the transportation of chemicals, including hazardous materials. Our fleet and staff are fully compliant with safety regulations, ensuring your chemical products reach their destination safely.',
    benefits: ['Hazmat Certified', 'Specialized Safety Gear', 'Regulatory Compliance', 'Spill Response Ready'],
    industries: ['Chemical', 'Pharma', 'Agriculture'],
  },
  {
    id: 'cfs',
    title: 'CFS & Container',
    slug: 'cfs',
    icon: 'Container',
    shortDesc: 'Comprehensive container freight station services.',
    longDesc: 'Our CFS services provide a seamless link between sea and land transport. We handle container stuffing, de-stuffing, and temporary storage with high efficiency and security.',
    benefits: ['Strategic Locations', 'Secure Handling', 'Customs Support', 'Efficient Turnaround'],
    industries: ['Global Trade', 'Manufacturing'],
  },
];

export const INDUSTRIES: Industry[] = [
  { id: 'fmcg', title: 'FMCG', icon: 'ShoppingBag', description: 'Fast-moving consumer goods logistics with a focus on speed and distribution.', anchor: 'fmcg' },
  { id: 'chemical', title: 'Chemical', icon: 'FlaskConical', description: 'Specialized transport for safe handling of chemical products.', anchor: 'chemical' },
  { id: 'auto', title: 'Automotive', icon: 'Car', description: 'Just-in-time delivery for automotive components and vehicles.', anchor: 'auto' },
  { id: 'pharma', title: 'Pharma', icon: 'Stethoscope', description: 'Temperature-controlled and secure logistics for pharmaceuticals.', anchor: 'pharma' },
  { id: 'energy', title: 'Energy & Solar', icon: 'Sun', description: 'Transport solutions for solar panels, turbines, and energy infrastructure.', anchor: 'energy' },
  { id: 'retail', title: 'Retail', icon: 'Store', description: 'Efficient retail supply chain management.', anchor: 'retail' },
];

export const STATS: Stat[] = [
  { value: 15, suffix: '+', label: 'Years', sublabel: 'Experience' },
  { value: 500, suffix: '+', label: 'Vehicles', sublabel: 'Own Fleet' },
  { value: 300, suffix: '+', label: 'Cities', sublabel: 'Pan-India' },
  { value: 20, suffix: '+', label: 'Industries', sublabel: 'Served' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', quote: 'MS Citizen Carrier has been our reliable partner for over 5 years. Their commitment to on-time delivery is unmatched.', name: 'Rajesh Kumar', role: 'Logistics Manager', company: 'Global FMCG Ltd.', initials: 'RK' },
  { id: '2', quote: 'Their expertise in handling chemical cargo safely is impressive. Highly recommend for specialized logistics.', name: 'Anita Sharma', role: 'Supply Chain Head', company: 'ChemCorp India', initials: 'AS' },
  { id: '3', quote: 'Professional, transparent, and always available. The GPS tracking gives us peace of mind.', name: 'Vikram Singh', role: 'Operations Director', company: 'Solar Solutions', initials: 'VS' },
];

export const MILESTONES: Milestone[] = [
  { year: '2010', title: 'The Beginning', description: 'MS Citizen Carrier was founded with 5 trucks and a vision for reliable freight.' },
  { year: '2015', title: 'Fleet Expansion', description: 'Grew fleet to 100+ vehicles and expanded to major metro cities.' },
  { year: '2018', title: 'Chemical Specialization', description: 'Obtained full Hazmat certifications and specialized in chemical logistics.' },
  { year: '2022', title: 'Tech Integration', description: 'Implemented advanced GPS tracking and digital fleet management across all vehicles.' },
  { year: '2025', title: 'Green Initiative', description: 'Introduced CNG fleet and carbon-neutral logistics options.' },
];

export const WHY_POINTS: WhyPoint[] = [
  { number: '01', title: '15+ Years Experience', description: 'A decade and a half of excellence in the logistics industry.', badge: 'EXPERT' },
  { number: '02', title: '500+ Own Vehicles', description: 'Complete control over our fleet for reliability and availability.', badge: 'FLEET' },
  { number: '03', title: 'GPS Tracking', description: 'Real-time visibility for every shipment, 24/7.', badge: 'TECH' },
  { number: '04', title: 'Hazmat Compliance', description: 'Fully certified for safe transportation of chemicals.', badge: 'SAFETY' },
  { number: '05', title: 'Pan-India Network', description: 'Connected across 300+ cities with strategic hubs.', badge: 'NETWORK' },
  { number: '06', title: 'On-Time Delivery', description: 'A track record of meeting strict deadlines consistently.', badge: 'SPEED' },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    heading: 'FREIGHT. TRANSIT.',
    highlight: 'CARRIERS.',
    subtext: 'India\'s most trusted partner for large-scale freight and specialized logistics solutions.',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop',
    cta: 'Get Free Quote',
    ctaHref: '/contact',
  },
  {
    heading: 'SAFE. SECURE.',
    highlight: 'CHEMICALS.',
    subtext: 'Specialized Hazmat logistics ensuring the safest transit for your chemical cargo.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    cta: 'Our Services',
    ctaHref: '/services',
  },
  {
    heading: 'PAN-INDIA.',
    highlight: 'NETWORK.',
    subtext: 'Spanning across 300+ cities with strategic hubs in every major chemical belt.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
    cta: 'View Network',
    ctaHref: '/network',
  },
  {
    heading: 'GREEN. CLEAN.',
    highlight: 'LOGISTICS.',
    subtext: 'Committed to a sustainable future with our CNG fleet and carbon offset programs.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop',
    cta: 'Carbon Pledge',
    ctaHref: '/carbon',
  },
];

