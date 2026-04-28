export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  industries: string[];
}

export interface Industry {
  id: string;
  title: string;
  icon: string;
  description: string;
  anchor: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface WhyPoint {
  number: string;
  title: string;
  description: string;
  badge: string;
}

export interface HeroSlide {
  tag?: string;
  heading: string;
  highlight: string;
  subtext: string;
  image: string;
  cta: string;
  ctaHref: string;
}
