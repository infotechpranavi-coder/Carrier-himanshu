import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  image?: string;
  breadcrumb?: { label: string; href: string }[];
}

const PageHero = ({ title, image = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop", breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="100vw"
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 grid-overlay opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-primary-red mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {breadcrumb?.map((item, i) => (
              <React.Fragment key={i}>
                <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                <ChevronRight className="w-4 h-4" />
              </React.Fragment>
            ))}
            <span className="text-white/50">{title}</span>
          </nav>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4">
            {title}
            <span className="block w-24 h-2 bg-primary-red mt-6"></span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
