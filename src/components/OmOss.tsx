import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Award, Calendar, Shield, FileText, Star, Scissors, Clock } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { motion } from 'framer-motion';
import { businessConfig, staff, reviews, openBokaDirekt } from '../config/business';

const OmOss: React.FC = () => {
  const navigate = useNavigate();

  // Clean animation variants
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
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  const headerVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: 0.3
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

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content Area */}
      <div className="flex-1 pb-20 overflow-y-auto">
        <motion.div 
          className="p-4 max-w-4xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Header section */}
          <motion.div 
            className="text-center mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div className="relative">
                <motion.img 
                  src={businessConfig.logo} 
                  alt={`${businessConfig.name} Logo`} 
                  className="w-16 h-16 mr-4 rounded-full bg-brand-accent p-1 shadow-lg object-cover border-2 border-brand-gold"
                  variants={headerVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.div>
              <motion.div 
                className="text-left"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-brand-primary">
                  {businessConfig.name.toUpperCase()}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {businessConfig.tagline}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Story */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Calendar size={20} className="text-brand-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-primary">Vår Historia</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {businessConfig.description}
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Scissors size={20} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary">Våra Barberare</h3>
                <p className="text-gray-600 text-sm">Träffa teamet bakom den professionella servicen</p>
              </div>
            </div>
            
            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staff.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                    
                    {/* Profile section */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <motion.div 
                          className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-accent shadow-sm bg-gray-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAzMkMyOC40NjUzIDMyIDI1LjYgMjkuMTM0NyAyNS42IDI1LjZDMjUuNiAyMi4wNjUzIDI4LjQ2NTMgMTkuMiAzMiAxOS4yQzM1LjUzNDcgMTkuMiAzOC40IDIyLjA2NTMgMzguNCAyNS42QzM4NCAyOS4xMzQ3IDM1LjUzNDcgMzIgMzIgMzJaTTMyIDM1LjJDMzkuMDY5MyAzNS4yIDQ0LjggNDAuOTMwNyA0NC44IDQ4SDQ0LjhWNTEuMkgxOS4yVjQ4QzE5LjIgNDAuOTMwNyAyNC45MzA3IDM1LjIgMzIgMzUuMloiIGZpbGw9IiM5QjlCQTAiLz4KPC9zdmc+Cg==';
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Info section */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-brand-primary mb-1">{member.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{member.title}</p>
                        {member.experience && (
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Clock size={12} className="mr-1" />
                            <span>{member.experience} erfarenhet</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        {member.bio}
                      </p>
                    )}

                    {/* Specialties */}
                    {member.specialties && member.specialties.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-brand-primary text-sm mb-2">Specialiteter:</h5>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-brand-accent bg-opacity-20 text-brand-primary rounded text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Reviews Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Star size={20} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary">Kundrecensioner</h3>
                <p className="text-gray-600 text-sm">Vad våra kunder säger</p>
              </div>
            </div>
            
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reviews.slice(0, 6).map((review, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-brand-accent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center mb-2">
                    <div className="flex text-brand-accent mr-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs text-green-600 font-medium">Verifierad</span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    "{review.text}"
                  </p>
                  <p className="text-xs text-gray-500">- {review.author}, {review.date}</p>
                </motion.div>
              ))}
            </div>

            {/* Overall Rating Summary */}
            <div className="bg-brand-primary rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                {/* Left side - Rating */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex text-brand-accent mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xl font-bold">5.0</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Här är 12 av 845 recensioner
                  </p>
                </div>

                {/* Right side - Boka Direkt Button */}
                <motion.button
                  onClick={openBokaDirekt}
                  className="bg-brand-accent text-brand-primary px-6 py-3 rounded-lg font-bold hover:bg-brand-gold transition-colors shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Boka Direkt
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Award size={20} className="text-brand-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-primary">Våra Värderingar</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Heart size={24} className="mx-auto text-brand-accent mb-2" />
                <h4 className="font-semibold text-brand-primary text-sm mb-1">Kvalitet</h4>
                <p className="text-xs text-gray-600">Högsta standard i allt vi gör</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Award size={24} className="mx-auto text-brand-accent mb-2" />
                <h4 className="font-semibold text-brand-primary text-sm mb-1">Precision</h4>
                <p className="text-xs text-gray-600">Noggrannhet i varje detalj</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users size={24} className="mx-auto text-brand-accent mb-2" />
                <h4 className="font-semibold text-brand-primary text-sm mb-1">Service</h4>
                <p className="text-xs text-gray-600">Professionell kundupplevelse</p>
              </div>
            </div>
          </motion.div>

          {/* Privacy Policy and Terms */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate('/integritetspolicy')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 text-left border border-gray-200"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Shield size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary">Integritetspolicy</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Läs om hur vi hanterar dina personuppgifter och skyddar din integritet.
              </p>
            </motion.button>

            <motion.button
              onClick={() => navigate('/anvandarvillkor')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 text-left border border-gray-200"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <FileText size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary">Användarvillkor</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Läs våra villkor för användning av våra tjänster och webbplats.
              </p>
            </motion.button>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default OmOss;