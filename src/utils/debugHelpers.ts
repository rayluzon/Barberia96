// Debug helpers to compare project differences

export class ProjectDebugger {
  static logEnvironmentInfo() {
    console.group('🔍 PROJECT ENVIRONMENT DEBUG');
    
    // Browser info
    console.log('🌐 User Agent:', navigator.userAgent);
    console.log('📱 Platform:', navigator.platform);
    console.log('🔧 Browser:', this.getBrowserInfo());
    
    // Viewport info
    console.log('📏 Viewport:', {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    });
    
    // Security context
    console.log('🔒 Security Context:', {
      isSecureContext: window.isSecureContext,
      origin: window.location.origin,
      protocol: window.location.protocol,
      hostname: window.location.hostname
    });
    
    // Available APIs
    console.log('🛠️ Available APIs:', {
      serviceWorker: 'serviceWorker' in navigator,
      webWorker: typeof Worker !== 'undefined',
      localStorage: typeof Storage !== 'undefined',
      indexedDB: 'indexedDB' in window,
      webGL: this.hasWebGL(),
      webRTC: this.hasWebRTC()
    });
    
    // CSP info
    console.log('🛡️ CSP Info:', this.getCSPInfo());
    
    // Headers that might affect iframe loading
    console.log('📋 Document Headers:', this.getDocumentHeaders());
    
    console.groupEnd();
  }
  
  static getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
  
  static hasWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }
  
  static hasWebRTC() {
    return !!(window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
  }
  
  static getCSPInfo() {
    const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
    return {
      hasCSP: metaTags.length > 0,
      cspContent: Array.from(metaTags).map(tag => tag.getAttribute('content'))
    };
  }
  
  static getDocumentHeaders() {
    return {
      title: document.title,
      charset: document.characterSet,
      doctype: document.doctype?.name || 'unknown',
      readyState: document.readyState,
      referrer: document.referrer,
      domain: document.domain
    };
  }
  
  static testIframeCompatibility(url: string) {
    console.group('🧪 IFRAME COMPATIBILITY TEST');
    
    // Test 1: Basic iframe creation
    try {
      const testIframe = document.createElement('iframe');
      testIframe.style.display = 'none';
      testIframe.src = 'about:blank';
      document.body.appendChild(testIframe);
      console.log('✅ Basic iframe creation: SUCCESS');
      document.body.removeChild(testIframe);
    } catch (error) {
      console.error('❌ Basic iframe creation: FAILED', error);
    }
    
    // Test 2: Cross-origin iframe test
    try {
      const testIframe = document.createElement('iframe');
      testIframe.style.display = 'none';
      testIframe.src = url;
      
      testIframe.onload = () => {
        console.log('✅ Cross-origin iframe load: SUCCESS');
        document.body.removeChild(testIframe);
      };
      
      testIframe.onerror = (error) => {
        console.error('❌ Cross-origin iframe load: FAILED', error);
        document.body.removeChild(testIframe);
      };
      
      document.body.appendChild(testIframe);
      
      // Timeout test
      setTimeout(() => {
        if (document.body.contains(testIframe)) {
          console.warn('⏰ Cross-origin iframe load: TIMEOUT');
          document.body.removeChild(testIframe);
        }
      }, 10000);
      
    } catch (error) {
      console.error('❌ Cross-origin iframe test: FAILED', error);
    }
    
    console.groupEnd();
  }
  
  static compareWithWorkingProject() {
    console.group('🔄 WORKING PROJECT COMPARISON');
    
    console.log('📝 To compare with your working project, check these values:');
    console.log('1. User Agent:', navigator.userAgent);
    console.log('2. Document domain:', document.domain);
    console.log('3. Window origin:', window.location.origin);
    console.log('4. Protocol:', window.location.protocol);
    console.log('5. CSP headers:', this.getCSPInfo());
    console.log('6. Iframe sandbox support:', 'sandbox' in document.createElement('iframe'));
    
    console.log('🎯 Key differences to look for:');
    console.log('- Different domain/subdomain');
    console.log('- Different protocol (http vs https)');
    console.log('- Different CSP headers');
    console.log('- Different browser/version');
    console.log('- Different iframe attributes');
    
    console.groupEnd();
  }
}

// Auto-run debug on load
if (typeof window !== 'undefined') {
  ProjectDebugger.logEnvironmentInfo();
  ProjectDebugger.compareWithWorkingProject();
}