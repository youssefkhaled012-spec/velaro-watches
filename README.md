# VELARO Watches

Existing React + TypeScript + Tailwind boutique, continued in place. The VELARO storefront is the active experience; the original VALERE/Azzam components and catalogue remain available in the source tree.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. The development server no longer opens a browser automatically.

```sh
npm run build
npm run preview
npm test
```

Browser tests use an installed Google Chrome via Playwright. On a machine without Chrome, install it or change `channel` in `playwright.config.ts` to an available browser. Tests start the development server automatically when it is not already running.

## Implementation

- `src/App.tsx`: page dispatch and global overlays. Product and brand views remount per reference to reset local gallery/filter state.
- `src/context/ShopContext.tsx`: shopping state, browser history, display currency, toast lifecycle, and legacy API compatibility. Cart and wishlist start empty and persist locally with validated storage recovery.
- `src/data/catalog.ts`: merges original references with the newer catalogue without duplicating reference numbers. Original-only products retain their original detail view. Missing archive inspection data is not presented as an issued report.
- `src/utils/catalogFilters.ts`: shared catalogue matching for brand, gender/category, movement, condition, price, case size and search.
- `src/hooks/useDialog.ts`: modal focus management, Escape dismissal, focus return, and body scroll locking.
- `src/components/FooterVelaro.tsx`: shared footer extracted from the existing homepage design.
- `tests/storefront.spec.ts`: browser regression coverage for shopping, filtering, comparison, forms, history, responsive layout, and invalid saved data.

## Current state and implementation plan

No separate implementation-plan document existed in the supplied project. All application source and configuration files were reviewed before editing. The continuation plan was inferred from the current VELARO entry point, original components, and incomplete interactions.

Completed:

1. Repair the TypeScript failures across both generations of components without excluding legacy files from compilation.
2. Reconnect original catalogue references, including women's watches, unisex references and accessories.
3. Fix catalogue predicates, pre-owned inventory, journal data fields/categories, brand hero positioning, wishlist navigation, and gallery state resets.
4. Implement persistent shopping selections, shareable product/brand URLs, history navigation, and unknown-reference handling.
5. Complete mobile category/brand/wishlist/currency navigation, keyboard controls, responsive overlays, focus handling and reduced-motion support.
6. Replace pretend submissions, checkout confirmations and alert-only downloads in active flows with actual downloadable enquiry drafts and sample reports. Validate optional photo selections.
7. Share the existing footer, implement newsletter interest storage and client-care information, provide article-specific journal text, and replace unrelated stock images with existing watch photography.
8. Update the compatible Vite development toolchain to resolve reported dependency vulnerabilities; add repeatable browser regression tests.

Production integration still required:

- An authenticated backend, real customer accounts, orders and inventory. The current collector account is explicitly an illustrative demo profile.
- Payment provider, tax/shipping calculation, reservation and fulfilment integrations. Downloading a purchase enquiry takes no payment and reserves no stock.
- Approved destinations for sourcing, concierge and valuation enquiries. Drafts download locally; no message is sent. Photo filenames are included, not photo bytes.
- Newsletter delivery service. The current form only saves interest on the device.
- Verified product photography, commercial copy, inspection records, warranty/returns/privacy terms and brand permissions. Existing stock photography is illustrative and is not a verified photograph of each named reference. Reports are sample text downloads, not official certificates or PDFs.
- Live currency data if desired. Existing example rates (EUR 0.92, GBP 0.78, EGP 49 per USD) are clearly described as illustrative.

No existing source features were deleted to obtain a passing build. No external service, payment, email or deployment is connected by this continuation.
