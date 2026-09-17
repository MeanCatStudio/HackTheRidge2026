# Hack The Ridge 2026

Complete Next.js source project with the changes from `review fix.md`.

## Run locally

Use Node.js 20.9 or later. Open a terminal in this folder and run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check a production build, run `npm run build`.

## Review changes

- Open hero layout with quick event information and unboxed statistics.
- Revised About, build experience and sponsor wording.
- Section order: Home, About HTR, Build experience, 2025 Hall of Fame, History, Registration, Sponsors, Team, FAQ Terminal.
- The original 2025 website is linked from the footer. Its original design is retained, with the custom cursor removed.
- Warm daytime city and a night mode, selected with the Day/Night button in the header and remembered locally. The city includes autumn trees, streetlights, rooftop details, and a rounded four carriage train with illuminated windows. Camera movement is bounded above the road throughout scrolling.
- Responsive FAQ spacing and playful terminal usernames.
- Browser and mobile icons use the supplied 2026 logo; homepage metadata and canonical URL identify Hack The Ridge 2026.
- Registration interest opens an email to the existing team address. Replace it with the official form URL when available.

Publish this version to update the live site. Search results will refresh after the search engine recrawls it.

All source and public assets are included. Generated build files and installed dependencies are excluded; `npm ci` installs the versions in the lockfile.

The header now uses an Explore menu with larger, spaced links and a separate Register shortcut. Team ID/status labels and the diagonal arrow have been removed. Train movement respects reduced-motion preferences.

The team heading reads “Meet the Team.” The three decorative build track icons are removed. FAQ lettering and boot block spacing are tightened. Reduced motion disables the train and camera movement.

Light mode uses dark text across the hero, counters, links, and reading sections. Repeated labels above headings are removed. Previous executive photo props are disabled with SHOW_PREVIOUS_EXECUTIVES in TeamSection.tsx. Train details include destination displays, wheel hubs, a rounded cab, and track railings. The city uses stable building heights, rooftop equipment, shop awnings, benches, and fuller trees.
