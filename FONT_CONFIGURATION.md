# Font Configuration Documentation

## Overview
This document describes the font configuration for the Hack The Ridge 2025 website to ensure consistent font rendering across all systems.

## Font Stack Strategy

### Primary Sans-Serif Font (Geist)
- **Primary**: Geist (Google Font, loaded via Next.js)
- **Fallback Chain**: 
  1. `system-ui` - Uses the system's default UI font
  2. `-apple-system` - Apple's San Francisco font on macOS/iOS
  3. `BlinkMacSystemFont` - Older macOS/iOS fallback
  4. `Segoe UI` - Windows default
  5. `Roboto` - Android default
  6. `Helvetica Neue` - Classic fallback
  7. `Arial` - Universal fallback
  8. `sans-serif` - Generic sans-serif
  9. Emoji fonts for proper emoji rendering

### Monospace Font (Geist Mono)
- **Primary**: Geist Mono (Google Font, loaded via Next.js)
- **Fallback Chain**:
  1. `ui-monospace` - System monospace
  2. `SFMono-Regular` - macOS monospace
  3. `SF Mono` - macOS monospace variant
  4. `Menlo` - macOS fallback
  5. `Monaco` - macOS fallback
  6. `Consolas` - Windows monospace
  7. `Liberation Mono` - Linux monospace
  8. `Courier New` - Universal fallback
  9. `monospace` - Generic monospace

### Custom Fonts

#### Sacco (Display Font)
- **Location**: `/public/sacco/web/`
- **Formats**: WOFF2, WOFF, EOT
- **Weights**: 
  - 600 (SemiBoldCondensed)
  - 700 (SemiBoldExtraCondensed)
  - 800 (SemiBoldUltraCondensed)
- **Fallback Chain**: `Impact`, `Arial Black`, `Franklin Gothic Bold`, `sans-serif`
- **Usage**: CSS class `font-sacco`

#### Impact (Display Font)
- **Fallback Chain**: `Impact`, `Arial Black`, `Franklin Gothic Bold`, `Helvetica Neue`, `Arial`, `sans-serif`
- **Usage**: CSS class `font-impact`

## Implementation Details

### Next.js Font Configuration
Located in: `src/app/layout.tsx`

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
});
```

### CSS Variables
Located in: `src/app/globals.css`

```css
@theme inline {
  --font-sans: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --font-sacco: 'Sacco', Impact, 'Arial Black', 'Franklin Gothic Bold', sans-serif;
  --font-impact: 'Impact', 'Arial Black', 'Franklin Gothic Bold', 'Helvetica Neue', Arial, sans-serif;
}
```

### Tailwind CSS Classes
- `font-sans` - Uses Geist with fallbacks
- `font-mono` - Uses Geist Mono with fallbacks
- `font-sacco` - Uses Sacco with fallbacks
- `font-impact` - Uses Impact with fallbacks

## Font Loading Strategy

### Display: Swap
All fonts use `font-display: swap` which:
1. Shows fallback font immediately
2. Swaps to custom font when loaded
3. Prevents invisible text (FOIT)
4. Improves perceived performance

### Preloading
Google Fonts (Geist and Geist Mono) are automatically optimized by Next.js:
- Fonts are self-hosted
- CSS is inlined
- No external requests in production
- Automatic font subsetting

## Browser Compatibility

### Modern Browsers
- Chrome/Edge: Uses `system-ui` or `Segoe UI`
- Safari: Uses `-apple-system` (San Francisco)
- Firefox: Uses `system-ui`

### Older Browsers
- Falls back to `Arial` or `Helvetica Neue`
- EOT format provided for IE support (Sacco font)

## Testing Recommendations

1. **Windows**: Should display Segoe UI or Geist
2. **macOS**: Should display San Francisco or Geist
3. **Linux**: Should display system-ui or Geist
4. **Android**: Should display Roboto or Geist
5. **iOS**: Should display San Francisco or Geist

## Maintenance

### Adding New Fonts
1. Add `@font-face` declaration in `globals.css`
2. Define CSS variable in `@theme inline` block
3. Add Tailwind class if needed
4. Include comprehensive fallback chain

### Font File Requirements
- WOFF2 (primary, best compression)
- WOFF (fallback)
- EOT (IE support, optional)

## Known Issues & Fixes

### VideoText Component Font Family
**Issue**: The `VideoText` component embeds font-family values into SVG strings. Single quotes in the SVG template string can conflict with single quotes in font names.

**Solution**: Changed SVG template to use double quotes for the `font-family` attribute (line 108, 111 in `video-text.tsx`):
```typescript
// Before: font-family='${fontFamily}'
// After:  font-family="${fontFamily}"
```

This allows font names with spaces to be properly quoted:
```typescript
fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
```

## Performance Considerations

- **Font files**: Hosted locally in `/public/sacco/web/`
- **Google Fonts**: Optimized by Next.js, self-hosted
- **Fallback fonts**: System fonts load instantly
- **No FOUT/FOIT**: `font-display: swap` prevents layout shift
