import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, Clock, Euro } from 'lucide-react';
import BookingIframe from './BookingIframe';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  bookingUrl: string;
  category: string;
}

const services: Service[] = [
  {
    id: 'barn-klippning',
    name: 'Barn Klippning (0-12 år)',
    description: 'Professionell klippning för barn',
    duration: '25 min',
    price: '249 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/barn-klippning-o-12-ar-1114691',
    category: 'Klippningar'
  },
  {
    id: 'klippning',
    name: 'Klippning',
    description: 'Klassisk herrklippning',
    duration: '30 min',
    price: '329 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/klippning-1112349',
    category: 'Klippningar'
  },
  {
    id: 'senior-klippning',
    name: 'Senior Klippning',
    description: 'Specialpris för seniorer',
    duration: '25 min',
    price: '279 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/senior-klippning-1114692',
    category: 'Klippningar'
  },
  {
    id: 'student-klippning',
    name: 'Student Klippning',
    description: 'Studentpris med giltig legitimation',
    duration: '30 min',
    price: '279 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/student-klippning-1114687',
    category: 'Klippningar'
  },
  {
    id: 'klippning-skagg-student',
    name: 'Klippning & Skäggtrimning (Student)',
    description: 'Komplett behandling med studentpris',
    duration: '60 min',
    price: '449 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/klippning-skaggtrimning-student-2022071',
    category: 'Kombinationer'
  },
  {
    id: 'snaggning',
    name: 'Snaggning',
    description: 'Klassisk snaggning',
    duration: '15 min',
    price: '170 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/snaggning-1114694',
    category: 'Specialbehandlingar'
  },
  {
    id: 'styling',
    name: 'Styling',
    description: 'Professionell styling av hår',
    duration: '15 min',
    price: '149 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/styling-1652900',
    category: 'Styling'
  },
  {
    id: 'skagg-kort',
    name: 'Skäggtrimning - Kort Skägg',
    description: 'För skägg upp till 4 cm',
    duration: '30 min',
    price: '249 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/skagg-trim-kort-skagg-4-cm-1324014',
    category: 'Skäggvård'
  },
  {
    id: 'skagg-langt',
    name: 'Skäggtrimning - Långt Skägg',
    description: 'För skägg över 4 cm',
    duration: '30 min',
    price: '299 kr',
    bookingUrl: 'https://www.bokadirekt.se/boka-tjanst/barberaria-96-35693/skagg-trim-langt-skagg-over-4-cm-1357365',
    category: 'Skäggvård'
  }
];

const BookingDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceSelect = (service: Service) => {
    // DEBUG: Log service selection
    console.log('🎯 Service selected:', service);
    console.log('🔗 Booking URL:', service.bookingUrl);
    
    setSelectedService(service);
    setIsOpen(false);
  };

  const closeBookingIframe = () => {
    setSelectedService(null);
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const serviceVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    })
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <>
      <motion.div 
        className="p-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Dropdown Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-brand-accent transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4">
                <Calendar size={24} className="text-brand-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-brand-primary mb-1">
                  Välj Tjänst & Boka Tid
                </h3>
                <p className="text-gray-600 text-sm">
                  Klicka för att se alla våra tjänster och boka direkt
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4"
            >
              <ChevronDown size={24} className="text-brand-accent" />
            </motion.div>
          </div>
        </motion.button>

        {/* Dropdown Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-brand-primary mb-2">
                    Våra Tjänster
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Välj den tjänst du vill boka och klicka för att öppna bokningssystemet
                  </p>
                </div>

                {/* Services by Category */}
                <div className="space-y-6">
                  {Object.entries(servicesByCategory).map(([category, categoryServices], categoryIndex) => (
                    <div key={category} className="space-y-3">
                      <h5 className="font-semibold text-brand-primary text-base border-b border-brand-accent pb-2">
                        {category}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryServices.map((service, serviceIndex) => (
                          <motion.button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className="text-left p-4 bg-gray-50 rounded-lg hover:bg-brand-accent hover:bg-opacity-10 transition-all duration-200 border border-transparent hover:border-brand-accent group"
                            variants={serviceVariants}
                            initial="hidden"
                            animate="visible"
                            custom={categoryIndex * 10 + serviceIndex}
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-semibold text-brand-primary text-sm group-hover:text-brand-accent transition-colors">
                                {service.name}
                              </h6>
                              <div className="text-right ml-3">
                                <div className="font-bold text-brand-accent text-sm">
                                  {service.price}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                              {service.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-500">
                                <Clock size={12} className="mr-1" />
                                <span className="text-xs">{service.duration}</span>
                              </div>
                              <div className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-medium group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors">
                                BOKA
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="bg-brand-primary rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="font-semibold mb-1">Snabb & Säker Bokning</h6>
                        <p className="text-brand-accent text-sm opacity-90">
                          Boka direkt online via vårt säkra bokningssystem
                        </p>
                      </div>
                      <div className="text-brand-accent">
                        <Calendar size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Booking Iframe Modal */}
      <AnimatePresence>
        {selectedService && (
          <BookingIframe
            bookingUrl={selectedService.bookingUrl}
            serviceName={selectedService.name}
            onClose={closeBookingIframe}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingDropdown;