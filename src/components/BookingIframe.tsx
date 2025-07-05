import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingIframeProps {
  bookingUrl: string;
  serviceName: string;
  onClose: () => void;
}

const BookingIframe: React.FC<BookingIframeProps> = ({ bookingUrl, serviceName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="font-bold text-sm">{serviceName}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close booking"
        >
          <X size={20} />
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking...</p>
          </div>
        </div>
      )}

      {/* Simple Iframe */}
      <div className="flex-1 relative">
        <iframe
          src={bookingUrl}
          className="w-full h-full"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          onLoad={handleIframeLoad}
          title={`Book ${serviceName}`}
          allowFullScreen
        />
      </div>
    </motion.div>
  );
};

export default BookingIframe;