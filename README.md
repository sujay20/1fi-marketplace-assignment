# 1Fi Marketplace — SDE Intern Assignment

A new **1Fi Marketplace** section built inside the existing Shop page, matching
the app's current visual language (purple "No-cost EMIs" banner, pill-style
segmented tabs, rounded white cards, bottom nav).

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build
```

The app renders inside a simulated phone frame on desktop and goes full-screen
automatically on mobile viewports, so it can be reviewed like the reference
screenshots without a native shell.

## What's implemented

- **Shop page** with all three required tabs: `Top Brands` and `Nearby Stores`
  are intentionally blank stubs (out of scope per the brief); `1Fi Marketplace`
  is fully built.
- **Marketplace listing** — search, category filters, a responsive product
  grid, loading skeletons, an error state with retry, and an empty state.
- **Product detail** — image, rating, price, a variant selector (storage /
  colour / size depending on the product), description, highlights, and an
  EMI plan list that re-fetches whenever the variant (and therefore price)
  changes.
- **EMI selection flow** — pick a plan, tap the sticky CTA, and a confirmation
  sheet summarises the monthly instalment, tenure, and total payable before
  returning to the marketplace.
- Every screen has its own loading and error state, driven by real
  status flags (`idle | loading | success | error`), not just a spinner
  that disappears.

## Architecture

```
src/
  api/
    marketplaceApi.js   → the only module UI code talks to; simulates
                           network latency + failure and returns
                           promises, so swapping in a real backend later
                           means changing this file only.
    products.data.js    → mock "database": products + EMI plan templates.
  utils/
    emi.js               → pure functions that turn (price, EMI template)
                           into a priced plan. No UI or fetching logic.
  hooks/
    useProducts.js        → list fetching w/ stale-response protection.
    useProductDetail.js   → single product fetching + retry.
    useEmiPlans.js         → plan fetching for a given product + variant.
  components/
    common/               → generic, reusable UI (SearchBar, SegmentedTabs,
                           BottomNav, Banner, Skeleton, StateViews).
    marketplace/           → feature-specific UI (ProductCard, ProductGrid,
                           VariantSelector, EMIPlanCard/List, ConfirmationSheet).
  pages/
    ShopPage.jsx           → banner + tabs shell, switches between the 3 tabs.
    MarketplaceTab.jsx     → search + filter + grid, wired to useProducts.
    ProductDetailPage.jsx  → variant + EMI selection + CTA, wired to
                           useProductDetail + useEmiPlans.
    TopBrandsTab.jsx / NearbyStoresTab.jsx → blank stubs per the brief.
```

**Why this split:** product/EMI data is never hardcoded into a component —
every screen goes through a hook, which goes through `marketplaceApi.js`,
which is the single seam where a real backend would plug in. EMI pricing
logic (`utils/emi.js`) is separated from both the mock data and the
components so it can be unit-tested and reused if the pricing rules move
server-side later.

**Routing:** `react-router-dom` gives each tab and each product its own URL
(`/shop/marketplace`, `/shop/marketplace/:productId`), which is how the
existing 1Fi app's navigation already behaves (deep-linkable screens, back
button support) rather than local `useState`-only view-switching.

## Design notes

Colours, spacing, and component shapes (pill tabs, rounded-2xl cards, the
purple banner gradient, bottom nav treatment) were sampled directly from the
provided Shop page screenshots so the Marketplace doesn't feel like a
different app bolted onto the existing one. Tokens live in
`tailwind.config.js` under the `brand` / `ink` / `surface` keys instead of
being repeated as raw hex values across components.

## What I'd do with more time

- Wire a real cart / order-confirmation backend instead of the local
  confirmation sheet.
- Add persisted favourites and recently viewed products.
- Replace the emoji product art with real product photography once asset
  hosting is available.
- Unit tests for `utils/emi.js` and the three hooks (currently manually
  verified via the UI).
