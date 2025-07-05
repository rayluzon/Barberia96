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
    // Prevent body scroll and force full overlay on Apple devices
    document.body.classList.add('apple-modal-open');
    
    // iOS Safari specific: Force viewport to cover entire screen
    const viewport = document.querySelector('meta[name=viewport]');
    const originalContent = viewport?.getAttribute('content');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
    
    return () => {
      document.body.classList.remove('apple-modal-open');
      
      // Restore original viewport
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="apple-fullscreen-modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2147483647, // Maximum z-index
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        // iOS Safari specific styles
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        // Force above all iOS Safari UI
        WebkitAppearance: 'none',
        appearance: 'none',
        // Ensure modal captures all touch events
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        // Force hardware acceleration
        willChange: 'transform, opacity'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Compact Header for Apple devices */}
      <div 
        className="apple-modal-header"
        style={{
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '44px', // Apple touch target minimum
          zIndex: 2147483646,
          position: 'relative',
          // iOS Safari specific header styles
          WebkitTransform: 'translate3d(0, 0, 0)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          isolation: 'isolate'
        }}
      >
        <div className="flex items-center min-w-0 flex-1">
          <h2 className="font-bold text-sm truncate">{serviceName}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
          style={{
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close booking"
        >
          <X size={20} />
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-white"
          style={{ zIndex: 10 }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking...</p>
          </div>
        </div>
      )}

      {/* Full-Screen Iframe for Apple devices */}
      <div 
        className="apple-iframe-container"
        style={{
          flex: 1,
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 44px)', // Subtract header height
          maxHeight: 'calc(100vh - 44px)',
          minHeight: 'calc(100vh - 44px)',
          // iOS Safari specific container styles
          WebkitTransform: 'translate3d(0, 0, 0)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitOverflowScrolling: 'touch',
          overflow: 'hidden',
          isolation: 'isolate'
        }}
      >
        <iframe
          src={bookingUrl}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            minHeight: '100%',
            border: 'none',
            outline: 'none',
            display: 'block',
            backgroundColor: 'white',
            // iOS Safari specific iframe styles
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overflow: 'auto',
            // Force iframe above Apple system UI
            WebkitPerspective: '1000px',
            perspective: '1000px',
            // Optimize touch interactions
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'auto',
            // Ensure iframe renders properly
            WebkitAppearance: 'none',
            appearance: 'none',
            position: 'relative',
            zIndex: 1
          }}
          onLoad={handleIframeLoad}
          title={`Book ${serviceName}`}
          allowFullScreen
          // Enhanced security sandbox for iOS compatibility
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          // iOS Safari specific attributes
          allow="payment; geolocation"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </motion.div>
  );
};

export default BookingIframe;