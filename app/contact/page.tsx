import React from 'react';
import PageHero from '@/components/PageHero';
import QuoteForm from '@/components/QuoteForm';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHero title="Get In Touch" />

      <section className="py-24 bg-near-black">
        <Reveal className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Contact Info */}
            <div className="lg:w-1/2">
              <SectionHeading 
                title="Contact Information"
                subtitle="Reach out to our experts for any logistics requirement or partnership opportunity."
              />
              
              <div className="space-y-12 mt-12">
                <div className="flex items-start space-x-6 group transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-card-bg flex items-center justify-center rounded-2xl group-hover:bg-primary-red transition-colors">
                    <MapPin className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">Corporate Office</h4>
                    <p className="text-light-gray leading-relaxed">
                      Plot No. 12, Sector 10, Panvel,<br />
                      Maharashtra - 410206, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-card-bg flex items-center justify-center rounded-2xl group-hover:bg-primary-red transition-colors">
                    <Phone className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">Call Us</h4>
                    <p className="text-light-gray leading-relaxed">+91 12345 67890</p>
                    <p className="text-light-gray leading-relaxed">+91 09876 54321</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-card-bg flex items-center justify-center rounded-2xl group-hover:bg-primary-red transition-colors">
                    <Mail className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">Email Us</h4>
                    <p className="text-light-gray leading-relaxed">info@mscitizen.com</p>
                    <p className="text-light-gray leading-relaxed">support@mscitizen.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-card-bg flex items-center justify-center rounded-2xl group-hover:bg-primary-red transition-colors">
                    <Clock className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">Business Hours</h4>
                    <p className="text-light-gray leading-relaxed">Mon - Sat: 09:00 AM - 08:00 PM</p>
                    <p className="text-light-gray leading-relaxed">Sunday: Closed (Emergency Support Available)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:w-1/2">
              <QuoteForm />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-section-dark relative grayscale hover:grayscale-0 transition-all duration-700 border-y border-primary-red/20">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120713.06450630656!2d73.01633519159987!3d18.995166299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e84f509e5b5d%3A0x6b87d00f730a9e70!2sPanvel%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714280000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
