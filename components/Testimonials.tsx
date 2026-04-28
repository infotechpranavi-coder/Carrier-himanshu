"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import SectionHeading from './SectionHeading';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = ({ light = false }: { light?: boolean }) => {
  return (
    <section className={light ? "py-24 bg-white border-y border-primary-red/20" : "py-24 bg-section-dark border-y border-primary-red/20"}>
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Clients Feedback"
          subtitle="What our partners say about our commitment to reliability and safety."
          align="center"
          light={light}
        />

        <div className="max-w-5xl mx-auto mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-16 testimonial-swiper"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className={light ? "bg-white p-10 rounded-2xl relative border border-black/5 h-full flex flex-col shadow-lg" : "bg-card-bg p-10 rounded-2xl relative border border-white/5 h-full flex flex-col"}>
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-primary-red opacity-10" />
                  
                  {/* Rating */}
                  <div className="flex space-x-1 mb-6 text-primary-red">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg italic text-light-gray mb-8 flex-1 leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-red flex items-center justify-center rounded-full font-black text-white">
                      {t.initials}
                    </div>
                    <div>
                    <h4 className={light ? "font-bold text-near-black uppercase tracking-tight" : "font-bold text-white uppercase tracking-tight"}>{t.name}</h4>
                      <p className="text-xs text-primary-red font-bold tracking-widest">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
