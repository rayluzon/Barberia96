import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Mail, Facebook, Instagram, Globe, Calendar } from 'lucide-react';
import { businessConfig, openBokaDirekt } from '../config/business';

const InfoView: React.FC = () => {
  // Force open phone app
  const handlePhoneCall = () => {
    // Force open phone app on all platforms
    const phoneNumber = businessConfig.phone;
    window.location.href = `tel:${phoneNumber}`;
  };

  // Force open email app
  const handleEmail = () => {
    // Force open default email app
    const email = businessConfig.email;
    window.location.href = `mailto:${email}`;
  };

  // Force open Google Maps
  const handleGoogleMaps = () => {
    const address = `${businessConfig.address.street}, ${businessConfig.address.postalCode} ${businessConfig.address.city}`;
    const encodedAddress = encodeURIComponent(address);
    
    // Force open Google Maps app on mobile, web on desktop
    const googleMapsApp = `comgooglemaps://?q=${encodedAddress}`;
    const googleMapsWeb = `https://maps.google.com/?q=${encodedAddress}`;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Mobile: Try to open app first, then fallback to web
      window.location.href = googleMapsApp;
      // Fallback after short delay
      setTimeout(() => {
        window.open(googleMapsWeb, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      // Desktop: Open in new tab
      window.open(googleMapsWeb, '_blank', 'noopener,noreferrer');
    }
  };

  // Force open Facebook
  const handleFacebook = () => {
    const facebookUrl = "https://www.facebook.com/Barberaria96.jkpg/";
    // Try to open Facebook app on mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `fb://page/Barberaria96.jkpg`;
      // Fallback to web version
      setTimeout(() => {
        window.open(facebookUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      // Desktop: Open in new tab
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Force open Instagram
  const handleInstagram = () => {
    const instagramUrl = "https://www.instagram.com/barberaria96/";
    // Try to open Instagram app on mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `instagram://user?username=barberaria96`;
      // Fallback to web version
      setTimeout(() => {
        window.open(instagramUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      // Desktop: Open in new tab
      window.open(instagramUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Force open website
  const handleWebsite = () => {
    const websiteUrl = "https://barberaria96.se/index.html";
    // Always open in new tab/window
    window.open(websiteUrl, '_blank', 'noopener,noreferrer');
  };

  const formatOpeningHours = () => {
    const days = {
      monday: 'Måndag',
      tuesday: 'Tisdag', 
      wednesday: 'Onsdag',
      thursday: 'Torsdag',
      friday: 'Fredag',
      saturday: 'Lördag',
      sunday: 'Söndag'
    };

    return Object.entries(businessConfig.openingHours).map(([key, hours]) => ({
      day: days[key as keyof typeof days],
      ...hours
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.98
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -2,
      scale: 1.01,
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
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
    <motion.div 
      className="p-4 max-w-4xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.img 
            src={businessConfig.logo} 
            alt={`${businessConfig.name} Logo`} 
            className="w-16 h-16 mr-3 rounded-full bg-white p-1 shadow-lg object-cover"
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          />
          <div className="text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {businessConfig.name.toUpperCase()}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {businessConfig.tagline}
            </p>
          </div>
        </div>
      </motion.div>

      {/* About section */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Star size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Professional Barbering</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {businessConfig.description}
        </p>
      </motion.div>

      {/* Services overview */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Star size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Våra Tjänster</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-2">
                Klippningar
              </h4>
              <p className="text-gray-700 text-xs md:text-sm">
                Professionella hårklippningar för alla åldrar, inklusive barn-, student- och seniorpriser.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-2">
                Kombinationsbehandlingar
              </h4>
              <p className="text-gray-700 text-xs md:text-sm">
                Hårklippning kombinerat med skäggtrim för en komplett behandling.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-2">
                Skägg & Styling
              </h4>
              <p className="text-gray-700 text-xs md:text-sm">
                Professionell skäggtrimning och styling för alla skägglängder.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-2">
                Snaggning
              </h4>
              <p className="text-gray-700 text-xs md:text-sm">
                Klassisk snaggning med professionell finish.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Opening Hours */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Clock size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Öppettider</h3>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formatOpeningHours().map((dayInfo, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                  dayInfo.closed 
                    ? 'bg-red-50 text-red-800' 
                    : 'bg-gray-50 text-gray-800'
                }`}
              >
                <span className="font-medium text-gray-900">{dayInfo.day}</span>
                <span className={dayInfo.closed ? 'text-red-600 font-medium' : 'text-gray-700'}>
                  {dayInfo.closed ? 'Stängd' : `${dayInfo.open} - ${dayInfo.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Kontakt & Adress</h3>
        </div>
        
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start">
            <MapPin size={16} className="mr-3 text-gray-500 mt-1 flex-shrink-0" />
            <div className="text-gray-700">
              <p className="font-medium text-gray-900">{businessConfig.address.street}</p>
              <p className="text-sm">{businessConfig.address.postalCode} {businessConfig.address.city}</p>
            </div>
          </div>
          
          {/* Phone */}
          <div className="flex items-center">
            <Phone size={16} className="mr-3 text-gray-500 flex-shrink-0" />
            <a 
              href={`tel:${businessConfig.phone}`} 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              {businessConfig.phone}
            </a>
          </div>
          
          {/* Email */}
          <div className="flex items-center">
            <Mail size={16} className="mr-3 text-gray-500 flex-shrink-0" />
            <a 
              href={`mailto:${businessConfig.email}`} 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              {businessConfig.email}
            </a>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <motion.button
              onClick={handlePhoneCall}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Phone size={16} className="mr-2" />
              Ring oss
            </motion.button>
            
            <motion.button
              onClick={handleEmail}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Mail size={16} className="mr-2" />
              E-post
            </motion.button>
            
            <motion.button
              onClick={handleGoogleMaps}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <MapPin size={16} className="mr-2" />
              Öppna i Google Maps
            </motion.button>

            {/* Boka Direkt Button next to Google Maps */}
            <motion.button
              onClick={openBokaDirekt}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Calendar size={16} className="mr-2" />
              Boka Direkt
            </motion.button>
          </div>

          {/* Social Media Links */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Följ oss</h4>
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={handleFacebook}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Facebook size={16} className="mr-2" />
                Facebook
              </motion.button>
              
              <motion.button
                onClick={handleInstagram}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Instagram size={16} className="mr-2" />
                Instagram
              </motion.button>
              
              <motion.button
                onClick={handleWebsite}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Globe size={16} className="mr-2" />
                Webbplats
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location Information */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Hitta hit</h3>
        </div>
        
        <div className="space-y-4 text-gray-700 text-sm md:text-base">
          <p>
            Vi ligger centralt beläget på {businessConfig.address.street} i {businessConfig.address.city}, 
            nära centrum och med god tillgänglighet med kollektivtrafik.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Vägbeskrivning</h4>
            <ul className="space-y-1 text-sm">
              <li>• Centralt läge i Jönköping</li>
              <li>• Parkering finns i närområdet</li>
              <li>• Enkelt att nå med kollektivtrafik</li>
              <li>• Handikappanpassad entré</li>
            </ul>
          </div>
          
          <div className="text-center">
            <motion.button
              onClick={handleGoogleMaps}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <MapPin size={16} className="mr-2" />
              Öppna i Google Maps
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoView;