import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Phone, Wifi, WifiOff, Shield } from 'lucide-react';
import { businessConfig } from '../config/business';

interface BookingIframeProps {
  bookingUrl: string;
  serviceName: string;
  onClose: () => void;
}

const BookingIframe: React.FC<BookingIframeProps> = ({ bookingUrl, serviceName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when iframe modal is open - Apple device specific
    document.body.classList.add('apple-modal-open');
    
    // iOS Safari specific: Allow all zoom and interactions
    const viewport = document.querySelector('meta[name=viewport]');
    const originalContent = viewport?.getAttribute('content');
    if (viewport) {
      // Remove all viewport restrictions for maximum compatibility
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
    
    // Extended timeout for slow connections
    loadTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 30000); // 30 second timeout

    // Calculate and set proper heights for Apple devices
    const updateHeights = () => {
      const vh = window.innerHeight;
      const headerHeight = 44; // Minimal header height for Apple devices
      const availableHeight = vh - headerHeight;
      
      if (containerRef.current) {
        containerRef.current.style.height = `${availableHeight}px`;
        containerRef.current.style.maxHeight = `${availableHeight}px`;
      }
      
      if (iframeRef.current) {
        iframeRef.current.style.height = `${availableHeight}px`;
        iframeRef.current.style.minHeight = `${availableHeight}px`;
      }
    };

    // Initial height calculation
    updateHeights();

    // Update heights on resize (orientation change, keyboard show/hide)
    const handleResize = () => {
      setTimeout(updateHeights, 100); // Small delay for iOS keyboard
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      document.body.classList.remove('apple-modal-open');
      
      // Restore original viewport
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent);
      }
      
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    // DEBUG: Log successful iframe load
    console.log('✅ BokaDirekt iframe loaded successfully!');
    console.log('📍 URL:', bookingUrl);
    console.log('🌐 User Agent:', navigator.userAgent);
    console.log('📱 Platform:', navigator.platform);
    
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // Ensure iframe takes full available height after load
    if (iframeRef.current && containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      iframeRef.current.style.height = `${containerHeight}px`;
      iframeRef.current.style.minHeight = `${containerHeight}px`;
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // DEBUG: Log iframe error details
    console.error('❌ BokaDirekt iframe failed to load!');
    console.error('📍 URL:', bookingUrl);
    console.error('🌐 User Agent:', navigator.userAgent);
    console.error('📱 Platform:', navigator.platform);
    console.error('🔍 Iframe element:', iframeRef.current);
    
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
  };

  const handleFallbackBooking = () => {
    // iOS Safari compatible external link opening
    try {
      // Method 1: Try window.open with specific parameters for iOS
      const newWindow = window.open(
        bookingUrl, 
        '_blank', 
        'noopener,noreferrer,width=375,height=667,scrollbars=yes,resizable=yes'
      );
      
      // Method 2: If popup blocked (common in iOS), use location
      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          window.location.href = bookingUrl;
        }
      }, 100);
    } catch (error) {
      // Fallback: Direct navigation for VKWebView/TWA
      window.location.href = bookingUrl;
    }
    onClose();
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    
    // Reload iframe with cache busting for iOS
    if (iframeRef.current) {
      const url = new URL(bookingUrl);
      url.searchParams.set('_t', Date.now().toString());
      iframeRef.current.src = url.toString();
    }
  };

  // Handle postMessage - Accept ALL messages (no origin restrictions)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // DEBUG: Log all postMessage events
      console.log('📨 PostMessage received:', {
        origin: event.origin,
        data: event.data,
        source: event.source
      });
      
      // REMOVED: No origin restrictions - accept all messages
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        // Handle navigation events for iOS
        if (data?.type === 'navigation' && data?.url) {
          console.log('Iframe navigation detected:', data.url);
        }
        
        // Handle completion events
        if (data?.type === 'booking_complete') {
          console.log('Booking completed successfully');
          // Could trigger success callback here
        }
      } catch (error) {
        console.log('Error parsing postMessage:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [bookingUrl]);

  // iOS Safari specific touch handling - Allow all touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow all touch events to pass through
    // e.stopPropagation(); // REMOVED
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="apple-fullscreen-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Minimized Header for Apple devices */}
        <motion.div 
          className="apple-modal-header bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-2 flex items-center justify-between shadow-lg relative h-11 flex-shrink-0"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center min-w-0 flex-1">
            <motion.img 
              src={businessConfig.logo} 
              alt="Logo" 
              className="w-6 h-6 mr-2 rounded-full bg-white p-0.5 flex-shrink-0"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="min-w-0 flex-1">
              <motion.h2 
                className="font-bold text-xs truncate"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Säker Bokning
              </motion.h2>
              <motion.p 
                className="text-xs opacity-90 flex items-center truncate"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.9 }}
                transition={{ delay: 0.3 }}
              >
                <Shield size={10} className="mr-1 flex-shrink-0" />
                <span className="truncate">{serviceName}</span>
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            {/* Online/Offline indicator */}
            <motion.div 
              className="flex items-center"
              animate={{
                scale: isOnline ? [1, 1.2, 1] : 1,
                opacity: isOnline ? [1, 0.7, 1] : 0.5
              }}
              transition={{
                duration: 2,
                repeat: isOnline ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {isOnline ? (
                <Wifi size={14} className="text-green-300" />
              ) : (
                <WifiOff size={14} className="text-red-300" />
              )}
            </motion.div>
            <motion.button
              onClick={onClose}
              className="p-1.5 hover:bg-black hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0"
              aria-label="Stäng bokning"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Full-Screen Content Area for Apple devices */}
        <motion.div 
          ref={containerRef}
          className="apple-iframe-container"
          onTouchStart={handleTouchStart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-white z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-center px-4">
                  <motion.div 
                    className="w-10 h-10 border-b-2 border-gray-900 rounded-full mx-auto mb-3"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.p 
                    className="text-gray-600 text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Laddar säker bokning...
                  </motion.p>
                  <motion.p 
                    className="text-gray-400 text-xs mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Ansluter till bokningssystem
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Offline State */}
          <AnimatePresence>
            {!isOnline && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-white z-20 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center max-w-sm">
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <WifiOff size={40} className="text-gray-400 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Ingen Internetanslutning
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Kontrollera din internetanslutning och försök igen.
                  </p>
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleRetry}
                      className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                      disabled={!isOnline}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Försök Igen
                    </motion.button>
                    <div className="flex items-center justify-center text-gray-600 text-sm">
                      <Phone size={16} className="mr-2" />
                      <span>Ring: {businessConfig.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {hasError && isOnline && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-white z-10 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center max-w-sm">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Kunde Inte Ladda Bokning
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Detta kan bero på webbläsarens säkerhetsinställningar eller tillfälliga problem. 
                    Försök igen eller öppna bokningen i din webbläsare.
                  </p>
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleRetry}
                      className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Försök Igen
                    </motion.button>
                    <motion.button
                      onClick={handleFallbackBooking}
                      className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Öppna i Webbläsare
                    </motion.button>
                    <div className="flex items-center justify-center text-gray-600 text-sm">
                      <Phone size={16} className="mr-2" />
                      <span>Eller ring: {businessConfig.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAXIMALLY PERMISSIVE IFRAME - ALL RESTRICTIONS REMOVED */}
          {isOnline && (
            <motion.iframe
              ref={iframeRef}
              src={bookingUrl}
              // DEBUG: Add onLoad handler to log more details
              onLoad={(e) => {
                console.log('🎯 Iframe onLoad event fired');
                console.log('📄 Iframe document:', e.currentTarget.contentDocument);
                console.log('🔗 Iframe window:', e.currentTarget.contentWindow);
                handleIframeLoad();
              }}
              onError={(e) => {
                console.error('💥 Iframe onError event fired');
                console.error('🚨 Error details:', e);
                handleIframeError();
              }}
              className="w-full h-full border-0 bg-white block"
              // REMOVED ALL SANDBOX RESTRICTIONS - MAXIMUM PERMISSIONS
              sandbox=""
              scrolling="auto"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={`Säker bokning - ${serviceName}`}
              loading="eager"
              // MAXIMUM PERMISSIONS - ALL FEATURES ALLOWED
              allow="*"
              // REMOVED REFERRER RESTRICTIONS
              // referrerPolicy="strict-origin-when-cross-origin"
              aria-label={`Bokningsformulär för ${serviceName}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              // ADDITIONAL PERMISSIVE ATTRIBUTES
              // REMOVED SECURITY RESTRICTIONS
              style={{
                // FORCE MAXIMUM COMPATIBILITY
                border: 'none',
                outline: 'none',
                width: '100%',
                height: '100%',
                minHeight: '100%',
                maxHeight: '100%',
                display: 'block',
                backgroundColor: 'white',
                // REMOVE ALL WEBKIT RESTRICTIONS
                WebkitAppearance: 'none',
                appearance: 'none',
                // ALLOW ALL TOUCH INTERACTIONS
                touchAction: 'auto',
                WebkitTouchCallout: 'default',
                WebkitUserSelect: 'auto',
                userSelect: 'auto',
                // MAXIMUM PERFORMANCE
                willChange: 'auto',
                transform: 'none',
                WebkitTransform: 'none'
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingIframe;