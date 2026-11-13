# Artrigo — React services website

React, TypeScript, Vite and GSAP. Four languages: English, Arabic, German and French. Arabic uses RTL.

## Pages

Homepage and 13 service pages, each with four statically rendered language routes (56 pages).

- /services/ai-agent-development/
- /services/application-engineering/
- /services/ai-data-systems/
- /services/website-development/
- /services/mobile-app-development/
- /services/cloud-infrastructure/
- /services/product-studio/
- /services/technology-advisory/
- /services/dedicated-engineering-teams/
- /services/solution-implementation/
- /services/ecommerce-engineering/
- /services/quality-security/
- /services/game-immersive-experiences/

Arabic, German and French routes use /ar/, /de/ and /fr/ prefixes. Every page has localized metadata, canonical URLs, reciprocal hreflang, structured Organization/Service/Breadcrumb data and a sitemap entry. Urdu is removed.

## Interaction design

GSAP ScrollTrigger pins desktop system blueprints, draws SVG connections, moves horizontal project rails and stacks delivery cards. Desktop scenes require a viewport at least 1000px wide and 760px high. Smaller viewports use native scrolling and touch rails with automatic progression. Reduced motion keeps every scene static and disables autoplay. Content is available without JavaScript.

Project concepts and interactive examples are original illustrative demonstrations. The gallery presents the Artrigo approach without attributing other companies’ client reviews to Artrigo. Asset provenance is recorded in ASSET-SOURCES.json.

## Enquiries

Project and newsletter forms submit to the activated FormSubmit receiver atifabbas296@gmail.com. Service enquiries carry the selected service and current page URL. Automated checks intercept requests and send no real emails. Existing inbox delivery was previously confirmed by the owner.

## Development

Run npm install, npm run dev, npm run build and npm run preview. The production build runs TypeScript, Vite and scripts/prerender.mjs. The existing Sites project ID and access settings remain in .openai/hosting.json.

## Vercel deployment

Import iamatif/artrigo, use the Vite preset, npm run build and dist output. Node.js 22.x is selected. Production canonical URLs, hreflang, sitemap and structured data use VERCEL_PROJECT_PRODUCTION_URL automatically; SITE_URL can override this for a custom production domain. All 56 pages are prerendered.
