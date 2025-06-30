# Barberaria 96 - Professionell Barbering

En modern, responsiv bokningssystem för Barberaria 96. Byggd med React, TypeScript och Tailwind CSS.

## Funktioner

- 🎨 Modern, responsiv design
- 📱 Mobil-först approach med PWA-stöd
- 🔒 Säker iframe-bokningsintegration med BokaDirekt
- 🌐 Svenskt språkstöd
- ⚡ Snabb laddning med optimerad prestanda
- 🎭 Mjuka animationer med Framer Motion
- 📊 Tjänstehanteringssystem
- 👥 Personalvisning
- ⭐ Kundrecensioner
- 📍 Plats- och kontaktinformation
- 🔐 Integritetspolicy och användarvillkor

## Snabb installation

1. **Uppdatera företagskonfiguration**
   
   Redigera `src/config/business.ts` med dina företagsdetaljer:
   
   ```typescript
   export const businessConfig: BusinessConfig = {
     name: "Barberaria 96",
     tagline: "GENTLEMEN BARBER SHOP",
     description: "Din beskrivning...",
     phone: "+46123456789",
     email: "info@barberaria96.se",
     address: {
       street: "Din Gata 123",
       postalCode: "123 45",
       city: "Jönköping",
       country: "Sverige"
     },
     // ... mer konfiguration
   };
   ```

2. **Uppdatera tjänster**
   
   Alla tjänster är redan konfigurerade med BokaDirekt-länkar från din lista.

3. **Lägg till din logotyp**
   
   Logotypen är redan tillagd från din bifogade fil.

4. **Uppdatera personalinformation**
   
   Redigera `staff`-arrayen i `business.ts` och lägg till personalfoton i `/public/staff/`.

5. **Anpassa recensioner**
   
   Uppdatera `reviews`-arrayen med riktiga kundrecensioner.

## Filstruktur

```
src/
├── components/          # React-komponenter
├── config/
│   └── business.ts     # Huvudkonfigurationsfil
├── utils/              # Hjälpfunktioner
└── ...

public/
├── logo.png           # Din företagslogotyp
├── staff/             # Personalfoton
└── ...
```

## Konfigurerade tjänster

Alla tjänster från din BokaDirekt-lista är redan konfigurerade:

### Klippningar
- Barn Klippning (0–12 år) - 25 min, 249 kr
- Klippning - 30 min, 329 kr
- Senior Klippning - 25 min, 279 kr
- Student Klippning - 30 min, 279 kr

### Kombinationsbehandlingar
- Klippning & Skäggtrimning - 60 min, 499 kr
- Klippning & Skäggtrimning (Student) - 60 min, 449 kr

### Skägg & Styling
- Skäggtrimning – Kort Skägg (upp till 4 cm) - 30 min, 249 kr
- Skäggtrimning – Långt Skägg (över 4 cm) - 30 min, 299 kr
- Styling - 15 min, 149 kr

### Snaggning
- Snaggning - 15 min, 170 kr

## Anpassning

### Färger och tema

Uppdatera temafärgerna i `src/config/business.ts`:

```typescript
theme: {
  primaryColor: "#1F2937",
  secondaryColor: "#374151", 
  accentColor: "#D4AF37" // Guld accent för att matcha logotypen
}
```

### Öppettider

Konfigurera dina öppettider i `openingHours`-objektet.

## BokaDirekt-integration

Systemet stöder iframe-integration med BokaDirekt. Alla boknings-URL:er är redan konfigurerade från din lista.

## Deployment

Systemet är redo för deployment på:
- Netlify (konfiguration inkluderad)
- Vercel (konfiguration inkluderad)
- Vilken statisk hosting-tjänst som helst

## Utveckling

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build
```

## Webbläsarstöd

- Moderna webbläsare (Chrome, Firefox, Safari, Edge)
- Mobila webbläsare (iOS Safari, Chrome Mobile)
- PWA-stöd för app-liknande upplevelse

## Säkerhetsfunktioner

- Content Security Policy (CSP)
- Säker iframe-sandboxing
- XSS-skydd
- Konsolskydd (valfritt)

## Licens

Detta system tillhandahålls som det är för kommersiell och personlig användning. Anpassa det för dina affärsbehov.

## Support

För anpassningshjälp eller frågor, se komponentdokumentationen i koden.