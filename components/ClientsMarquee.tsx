import React from 'react';

const clientLogos = [
  'Reliance', 'Tata', 'Adani', 'JSW', 'Vedanta', 'L&T', 'Godrej', 'ITC', 'Maruti', 'HUL'
];

const ClientsMarquee = () => {
  return (
    <section className="py-20 bg-near-black overflow-hidden border-y border-primary-red/20">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-xl font-bold uppercase tracking-[0.3em] text-white/30">Trusted By Industry Leaders</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <div 
              key={i} 
              className="mx-12 text-4xl md:text-5xl font-black text-white/10 hover:text-primary-red transition-colors duration-500 cursor-default uppercase"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
