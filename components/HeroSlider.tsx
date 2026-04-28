"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/constants';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative h-full w-full flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={slide.heading}
                    fill
                    sizes="100vw"
                    className="object-cover brightness-[0.4]"
                    priority
                  />
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 grid-overlay opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <div className="space-y-6">
                          <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-black leading-tight"
                          >
                            {slide.heading} <br />
                            <span className="text-primary-red">{slide.highlight}</span>
                          </motion.h1>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl text-light-gray max-w-2xl leading-relaxed"
                          >
                            {slide.subtext}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-4"
                          >
                            <Link 
                              href={slide.ctaHref}
                              className="group inline-flex items-center bg-primary-red text-white px-10 py-4 font-bold text-lg uppercase tracking-wider hover:bg-accent-red transition-all shadow-2xl shadow-primary-red/30"
                            >
                              {slide.cta}
                              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default HeroSlider;
