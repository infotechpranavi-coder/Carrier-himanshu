import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Globe, Anchor, Factory, Construction, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-near-black pt-20 pb-10 border-t-2 border-primary-red">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Logo & Info */}
          <div className="space-y-6">
            <div className="h-12 w-40 relative">
              <Image src="/logo.svg" alt="MS Citizen Logo" fill sizes="160px" className="object-contain" />
            </div>
            <p className="text-light-gray leading-relaxed">
              India&apos;s trusted road freight partner, providing premium and cinematic logistics solutions across the nation. Specializing in high-performance transport.
            </p>
            <div className="flex space-x-4">
              {[Globe, Anchor, Factory, Construction].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-card-bg flex items-center justify-center rounded-full hover:bg-primary-red transition-all group">
                  <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-red"></span>
            </h4>
            <ul className="space-y-4">
              {['Full Truck Load (FTL)', 'Part Truck Load (PTL)', 'Warehousing', 'Project Cargo', 'Chemical Logistics', 'CFS Services'].map((service) => (
                <li key={service}>
                  <Link href={`/services/${service.toLowerCase().split(' ')[0]}`} className="text-light-gray hover:text-primary-red flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Industries
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-red"></span>
            </h4>
            <ul className="space-y-4">
              {['FMCG', 'Chemical', 'Automotive', 'Pharma', 'Energy', 'Aerospace'].map((industry) => (
                <li key={industry}>
                  <Link href="/industries" className="text-light-gray hover:text-primary-red flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-red"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="w-6 h-6 text-primary-red mr-4 shrink-0" />
                <span className="text-light-gray">Plot No. 12, Sector 10, Panvel, Maharashtra - 410206</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 h-6 text-primary-red mr-4 shrink-0" />
                <span className="text-light-gray">+91 12345 67890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-6 h-6 text-primary-red mr-4 shrink-0" />
                <span className="text-light-gray">info@mscitizen.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-light-gray">
          <p>© 2025 MS Citizen Carrier Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
