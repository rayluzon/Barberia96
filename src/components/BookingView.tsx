import React from 'react';
import { motion } from 'framer-motion';

const BookingView: React.FC = () => {
  // Clean animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="p-4 max-w-4xl mx-auto min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Completely blank white section */}
      <div className="bg-white min-h-[80vh] rounded-xl">
        {/* Empty - ready for new content */}
      </div>
    </motion.div>
  );
};

export default BookingView;