// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg,woff2,woff,ttf}"],
        maximumFileSizeToCacheInBytes: 5e6,
        // 5MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    return `${request.url}?version=1`;
                  }
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.bokadirekt\.se\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "bokadirekt-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
                // 1 day
              },
              networkTimeoutSeconds: 10,
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    return `${request.url}?cache-bust=${Date.now()}`;
                  }
                }
              ]
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7
                // 1 week
              }
            }
          }
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/_/,
          /\/[^/?]+\.[^/]+$/,
          /^\/api\//,
          /^\/offline\.html$/,
          /^\/sw\.js$/,
          /^\/manifest\.json$/
        ],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        offlineGoogleAnalytics: true
      },
      includeAssets: [
        "favicon/favicon.ico",
        "favicon/*.png",
        "favicon/*.ico",
        "offline.html",
        "logo.png",
        "staff/*.png",
        "browserconfig.xml"
      ],
      manifest: {
        name: "Barberaria 96 - Professional Barbering Services",
        short_name: "Barberaria 96",
        description: "Barberaria 96 - Professional barbering services in J\xF6nk\xF6ping. Book your appointment online with Sweden's premier barber shop.",
        theme_color: "#1A1A1A",
        background_color: "#1A1A1A",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        categories: ["business", "lifestyle", "health", "beauty", "professional"],
        lang: "sv-SE",
        dir: "ltr",
        prefer_related_applications: false,
        edge_side_panel: {
          preferred_width: 400
        },
        launch_handler: {
          client_mode: "navigate-existing"
        },
        handle_links: "preferred",
        display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
        protocol_handlers: [
          {
            protocol: "web+barberaria",
            url: "/?booking=%s"
          }
        ],
        file_handlers: [
          {
            action: "/",
            accept: {
              "text/calendar": [".ics"]
            }
          }
        ],
        share_target: {
          action: "/",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url"
          }
        },
        screenshots: [
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            platform: "wide",
            label: "Barberaria 96 booking interface"
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            platform: "narrow",
            label: "Mobile booking experience"
          }
        ],
        icons: [
          // Any purpose icons
          {
            src: "/favicon/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/android-icon-144x144.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any"
          },
          // Maskable purpose icons (separate entries)
          {
            src: "/favicon/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/android-icon-144x144.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/favicon/1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        shortcuts: [
          {
            name: "Boka tid",
            short_name: "Boka",
            description: "Boka din tid hos Barberaria 96",
            url: "/?action=book",
            icons: [
              {
                src: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "any"
              }
            ]
          },
          {
            name: "Om oss",
            short_name: "Om oss",
            description: "L\xE4s mer om Barberaria 96",
            url: "/om-oss",
            icons: [
              {
                src: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "any"
              }
            ]
          },
          {
            name: "Kontakt",
            short_name: "Kontakt",
            description: "Kontakta Barberaria 96",
            url: "/?action=contact",
            icons: [
              {
                src: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "any"
              }
            ]
          },
          {
            name: "Priser",
            short_name: "Priser",
            description: "Se v\xE5ra priser och tj\xE4nster",
            url: "/?action=prices",
            icons: [
              {
                src: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "any"
              }
            ]
          }
        ],
        related_applications: [
          {
            platform: "webapp",
            url: "https://barbareria96.netlify.app/manifest.json"
          }
        ]
      },
      devOptions: {
        enabled: false
      },
      injectRegister: "script",
      strategies: "generateSW"
    })
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["lucide-react"],
          motion: ["framer-motion"]
        }
      }
    },
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "credentialless",
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnLGpwZWcsanBnLHdvZmYyLHdvZmYsdHRmfSddLFxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNTAwMDAwMCwgLy8gNU1CXG4gICAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdvb2dsZWFwaXNcXC5jb21cXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdnb29nbGUtZm9udHMtY2FjaGUnLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMzAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzY1IC8vIDEgeWVhclxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2FjaGVLZXlXaWxsQmVVc2VkOiBhc3luYyAoeyByZXF1ZXN0IH06IHsgcmVxdWVzdDogUmVxdWVzdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtyZXF1ZXN0LnVybH0/dmVyc2lvbj0xYDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nc3RhdGljXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnZ3N0YXRpYy1mb250cy1jYWNoZScsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiAzMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzNjUgLy8gMSB5ZWFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvd3d3XFwuYm9rYWRpcmVrdFxcLnNlXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdib2thZGlyZWt0LWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAvLyAxIGRheVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuZXR3b3JrVGltZW91dFNlY29uZHM6IDEwLFxuICAgICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2FjaGVLZXlXaWxsQmVVc2VkOiBhc3luYyAoeyByZXF1ZXN0IH06IHsgcmVxdWVzdDogUmVxdWVzdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtyZXF1ZXN0LnVybH0/Y2FjaGUtYnVzdD0ke0RhdGUubm93KCl9YDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9cXC4oPzpwbmd8anBnfGpwZWd8c3ZnfGdpZnx3ZWJwfGljbykkLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnaW1hZ2VzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDIwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCAvLyAzMCBkYXlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9cXC4oPzpqc3xjc3MpJC8sXG4gICAgICAgICAgICBoYW5kbGVyOiAnU3RhbGVXaGlsZVJldmFsaWRhdGUnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdzdGF0aWMtcmVzb3VyY2VzJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiA3IC8vIDEgd2Vla1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnL2luZGV4Lmh0bWwnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFtcbiAgICAgICAgICAvXlxcL18vLFxuICAgICAgICAgIC9cXC9bXi8/XStcXC5bXi9dKyQvLFxuICAgICAgICAgIC9eXFwvYXBpXFwvLyxcbiAgICAgICAgICAvXlxcL29mZmxpbmVcXC5odG1sJC8sXG4gICAgICAgICAgL15cXC9zd1xcLmpzJC8sXG4gICAgICAgICAgL15cXC9tYW5pZmVzdFxcLmpzb24kL1xuICAgICAgICBdLFxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIG9mZmxpbmVHb29nbGVBbmFseXRpY3M6IHRydWVcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXG4gICAgICAgICdmYXZpY29uL2Zhdmljb24uaWNvJyxcbiAgICAgICAgJ2Zhdmljb24vKi5wbmcnLFxuICAgICAgICAnZmF2aWNvbi8qLmljbycsXG4gICAgICAgICdvZmZsaW5lLmh0bWwnLFxuICAgICAgICAnbG9nby5wbmcnLFxuICAgICAgICAnc3RhZmYvKi5wbmcnLFxuICAgICAgICAnYnJvd3NlcmNvbmZpZy54bWwnXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ0JhcmJlcmFyaWEgOTYgLSBQcm9mZXNzaW9uYWwgQmFyYmVyaW5nIFNlcnZpY2VzJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ0JhcmJlcmFyaWEgOTYnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0JhcmJlcmFyaWEgOTYgLSBQcm9mZXNzaW9uYWwgYmFyYmVyaW5nIHNlcnZpY2VzIGluIEpcdTAwRjZua1x1MDBGNnBpbmcuIEJvb2sgeW91ciBhcHBvaW50bWVudCBvbmxpbmUgd2l0aCBTd2VkZW5cXCdzIHByZW1pZXIgYmFyYmVyIHNob3AuJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMUExQTFBJyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMxQTFBMUEnLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIG9yaWVudGF0aW9uOiAncG9ydHJhaXQtcHJpbWFyeScsXG4gICAgICAgIHNjb3BlOiAnLycsXG4gICAgICAgIHN0YXJ0X3VybDogJy8nLFxuICAgICAgICBjYXRlZ29yaWVzOiBbJ2J1c2luZXNzJywgJ2xpZmVzdHlsZScsICdoZWFsdGgnLCAnYmVhdXR5JywgJ3Byb2Zlc3Npb25hbCddLFxuICAgICAgICBsYW5nOiAnc3YtU0UnLFxuICAgICAgICBkaXI6ICdsdHInLFxuICAgICAgICBwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnM6IGZhbHNlLFxuICAgICAgICBlZGdlX3NpZGVfcGFuZWw6IHtcbiAgICAgICAgICBwcmVmZXJyZWRfd2lkdGg6IDQwMFxuICAgICAgICB9LFxuICAgICAgICBsYXVuY2hfaGFuZGxlcjoge1xuICAgICAgICAgIGNsaWVudF9tb2RlOiAnbmF2aWdhdGUtZXhpc3RpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZV9saW5rczogJ3ByZWZlcnJlZCcsXG4gICAgICAgIGRpc3BsYXlfb3ZlcnJpZGU6IFsnd2luZG93LWNvbnRyb2xzLW92ZXJsYXknLCAnc3RhbmRhbG9uZScsICdtaW5pbWFsLXVpJ10sXG4gICAgICAgIHByb3RvY29sX2hhbmRsZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICd3ZWIrYmFyYmVyYXJpYScsXG4gICAgICAgICAgICB1cmw6ICcvP2Jvb2tpbmc9JXMnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBmaWxlX2hhbmRsZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnLycsXG4gICAgICAgICAgICBhY2NlcHQ6IHtcbiAgICAgICAgICAgICAgJ3RleHQvY2FsZW5kYXInOiBbJy5pY3MnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2hhcmVfdGFyZ2V0OiB7XG4gICAgICAgICAgYWN0aW9uOiAnLycsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHRpdGxlOiAndGl0bGUnLFxuICAgICAgICAgICAgdGV4dDogJ3RleHQnLFxuICAgICAgICAgICAgdXJsOiAndXJsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvbG9nby5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcGxhdGZvcm06ICd3aWRlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQmFyYmVyYXJpYSA5NiBib29raW5nIGludGVyZmFjZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9sb2dvLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLCBcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcGxhdGZvcm06ICduYXJyb3cnLFxuICAgICAgICAgICAgbGFiZWw6ICdNb2JpbGUgYm9va2luZyBleHBlcmllbmNlJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAvLyBBbnkgcHVycG9zZSBpY29uc1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTZ4MTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICczMngzMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9hbmRyb2lkLWljb24tNDh4NDgucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNDh4NDgnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vYW5kcm9pZC1pY29uLTcyeDcyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzcyeDcyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vYW5kcm9pZC1pY29uLTE0NHgxNDQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTI4eDEyOCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9hbmRyb2lkLWljb24tMTQ0eDE0NC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNDR4MTQ0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2FwcGxlLWljb24tMTUyeDE1Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNTJ4MTUyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2FuZHJvaWQtaWNvbi0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzI1NngyNTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzM4NHgzODQnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vMTAyNHgxMDI0LnBuZycsIFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uLzEwMjR4MTAyNC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxMDI0eDEwMjQnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gTWFza2FibGUgcHVycG9zZSBpY29ucyAoc2VwYXJhdGUgZW50cmllcylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE2eDE2JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICczMngzMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2FuZHJvaWQtaWNvbi00OHg0OC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2FuZHJvaWQtaWNvbi03Mng3Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9hbmRyb2lkLWljb24tMTQ0eDE0NC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxMjh4MTI4JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vYW5kcm9pZC1pY29uLTE0NHgxNDQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTQ0eDE0NCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2FwcGxlLWljb24tMTUyeDE1Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNTJ4MTUyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uLzEwMjR4MTAyNC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcyNTZ4MjU2JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzM4NHgzODQnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi8xMDI0eDEwMjQucG5nJywgXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTAyNHgxMDI0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Jva2EgdGlkJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdCb2thJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQm9rYSBkaW4gdGlkIGhvcyBCYXJiZXJhcmlhIDk2JyxcbiAgICAgICAgICAgIHVybDogJy8/YWN0aW9uPWJvb2snLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJy9mYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzk2eDk2JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnT20gb3NzJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdPbSBvc3MnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMXHUwMEU0cyBtZXIgb20gQmFyYmVyYXJpYSA5NicsXG4gICAgICAgICAgICB1cmw6ICcvb20tb3NzJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0tvbnRha3QnLFxuICAgICAgICAgICAgc2hvcnRfbmFtZTogJ0tvbnRha3QnLCBcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnS29udGFrdGEgQmFyYmVyYXJpYSA5NicsXG4gICAgICAgICAgICB1cmw6ICcvP2FjdGlvbj1jb250YWN0JyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ByaXNlcicsXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiAnUHJpc2VyJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2Ugdlx1MDBFNXJhIHByaXNlciBvY2ggdGpcdTAwRTRuc3RlcicsIFxuICAgICAgICAgICAgdXJsOiAnLz9hY3Rpb249cHJpY2VzJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmVsYXRlZF9hcHBsaWNhdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwbGF0Zm9ybTogJ3dlYmFwcCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2JhcmJhcmVyaWE5Ni5uZXRsaWZ5LmFwcC9tYW5pZmVzdC5qc29uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ3NjcmlwdCcsXG4gICAgICBzdHJhdGVnaWVzOiAnZ2VuZXJhdGVTVydcbiAgICB9KVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgaWNvbnM6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgICAgICAgbW90aW9uOiBbJ2ZyYW1lci1tb3Rpb24nXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeSc6ICdjcmVkZW50aWFsbGVzcycsXG4gICAgICAnQ3Jvc3MtT3JpZ2luLU9wZW5lci1Qb2xpY3knOiAnc2FtZS1vcmlnaW4nXG4gICAgfVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLHdEQUF3RDtBQUFBLFFBQ3ZFLCtCQUErQjtBQUFBO0FBQUEsUUFDL0IsZ0JBQWdCO0FBQUEsVUFDZDtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLGNBQ0EsU0FBUztBQUFBLGdCQUNQO0FBQUEsa0JBQ0Usb0JBQW9CLE9BQU8sRUFBRSxRQUFRLE1BQTRCO0FBQy9ELDJCQUFPLEdBQUcsUUFBUSxHQUFHO0FBQUEsa0JBQ3ZCO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQTtBQUFBLGNBQ2hDO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FB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QTtBQUFBLFVBRUw7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUE7QUFBQSxVQUVBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFdBQVc7QUFBQSxVQUNUO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsZ0JBQ1AsTUFBTTtBQUFBLGdCQUNOLFNBQVM7QUFBQSxjQUNYO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsZ0JBQ1AsTUFBTTtBQUFBLGdCQUNOLFNBQVM7QUFBQSxjQUNYO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsZ0JBQ1AsTUFBTTtBQUFBLGdCQUNOLFNBQVM7QUFBQSxjQUNYO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsZ0JBQ1AsTUFBTTtBQUFBLGdCQUNOLFNBQVM7QUFBQSxjQUNYO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxzQkFBc0I7QUFBQSxVQUNwQjtBQUFBLFlBQ0UsVUFBVTtBQUFBLFlBQ1YsS0FBSztBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDN0IsUUFBUSxDQUFDLGtCQUFrQjtBQUFBLFVBQzNCLE9BQU8sQ0FBQyxjQUFjO0FBQUEsVUFDdEIsUUFBUSxDQUFDLGVBQWU7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsZ0NBQWdDO0FBQUEsTUFDaEMsOEJBQThCO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
