# Quthon Marketing Website

**Status:** Planning
**Created:** 2026-10-29
**Mode:** Human Approval Required

## 1. Project Overview

- **Project:** Quthon marketing website
- **App Type:** SPA
- **Purpose:** Present Quthon as a modern enterprise consulting and technology partner with an outcome-led, credible, conversion-focused website.
- **Experience:** A single-page React application with reusable sections and static route-level navigation to key marketing destinations.
- **Reference approach:** Use structural consulting-site patterns inspired by enterprise leaders without copying SourceFuse branding, assets, or proprietary content.

## 2. Requirements Summary

- React + TypeScript implemented with Vite.
- Public marketing website with no sign-in or protected application features.
- No backend, database, queue, cache, uploads, file/object storage, or persistent datastore required for the first release.
- Strong bold dark enterprise visual direction with near-black surfaces and electric cyan/teal accents.
- Content areas: homepage, services, solutions, industries, proof/case studies, insights, company/about, and contact conversion.
- Responsive behavior for desktop, tablet, and mobile, with keyboard and screen-reader accessibility.
- Static build output suitable for an Azure Static Web Apps deployment in a later phase.

## 3. Technology Stack

- **Frontend:** React with TypeScript
- **Build tool:** Vite
- **Styling:** Component-scoped CSS with a shared design-token layer
- **Routing:** Lightweight client-side navigation; React Router only if multiple destination URLs are required
- **Content:** Typed static TypeScript data modules for a maintainable first release
- **Testing:** Vitest and React Testing Library
- **Code quality:** ESLint and TypeScript strict mode
- **Hosting target:** Static hosting only; no application backend in scope

## 4. Architecture & Services

### Frontend Service: `frontend`

The frontend is the only runtime service. It renders the complete public marketing experience, manages responsive navigation, and provides static lead-conversion calls to action.

- Use reusable section and card components.
- Keep service, solution, industry, proof, and insight content in typed data modules.
- Animate presentation with CSS or a lightweight motion library without delaying core content.
- Keep analytics hooks and form endpoints behind clearly configurable integration boundaries.
- Do not add a backend unless submitted requirements later explicitly introduce lead storage or authenticated features.

### External Integrations

- No required integrations for initial implementation.
- A contact form may use a mailto fallback or an explicitly configured third-party endpoint; it must not imply server-side storage.

## 5. Pages & Features

### Homepage

- Utility/top announcement navigation
- Bold hero with Quthon value proposition and primary/secondary calls to action
- Credibility strip with concise proof points
- Service pillars for consulting, cloud, engineering, data/AI, modernization, and delivery
- Outcome-led solution cards
- Industry coverage
- Case-study or client-proof teaser cards
- Insights teaser cards
- Company summary and final conversion CTA
- Footer navigation, legal placeholders, and contact links

### Supporting Destinations

The initial release may implement destination anchors or lightweight route sections for:

- Services
- Solutions
- Industries
- Work/Case Studies
- Insights
- About
- Contact

Detailed article routes, careers, legal content, and CMS-driven content are deferred because no content or persistence source was specified.

## 6. Design System & UI

**Component Library:** Fluent UI v9

- Use near-black charcoal backgrounds with neutral gray surfaces.
- Use electric teal/cyan as the primary action and highlight color, with restrained violet or blue accents only if they improve hierarchy.
- Use crisp, high-contrast typography with a modern enterprise sans-serif treatment.
- Use large geometric hero composition, subtle grid textures, and asymmetric section layouts rather than generic template cards.
- Cards should have clear borders, deliberate spacing, and intentional hover/focus states.
- Maintain accessible contrast ratios and visible keyboard focus.
- Respect reduced-motion preferences.
- Ensure every layout reflows cleanly at mobile, tablet, laptop, and wide-desktop widths.
- Keep content density high enough for enterprise credibility but avoid dashboard-style information walls.

### Core Components

- Header and compact mobile menu
- Hero
- Proof/credibility strip
- Service card grid
- Solution feature panels
- Industry selector or card grid
- Case-study cards
- Insight cards
- Testimonial or metric panel
- Contact call-to-action
- Footer

## 7. Data & State

- Data stores: `No datastore required`.
- Authentication: `No`.
- Store content in local typed data arrays or modules.
- Use React state only for temporary UI state such as mobile navigation, filters, modal views, and form validation.
- Avoid global state libraries unless later application complexity justifies one.
- If a contact form is included, it must explicitly use a configured external service or mailto behavior; it must not claim that submissions are persisted.

## 8. API Specifications

No API is required in this release. There are no backend routes, database schemas, service endpoints, or server-side authorization requirements.

Any future API design remains outside this plan and requires separate requirements.

## 9. Security & Accessibility

- Avoid collecting unnecessary personal information.
- Render only approved static copy and assets.
- Validate external links and use safe link-opening behavior where applicable.
- Avoid secrets and private credentials in client-side source or environment variables.
- Implement semantic landmarks, headings, lists, buttons, and form labels.
- Maintain keyboard navigation and visible focus for menus, links, cards, and dialogs.
- Provide meaningful alternative text for informative imagery.
- Support reduced motion and text enlargement.

## 10. Testing Strategy

- Verify the production build and strict TypeScript compilation.
- Unit-test reusable components and content rendering helpers.
- Test navigation behavior, mobile menu behavior, and responsive visibility.
- Add interaction tests for any filter, contact, or modal UI.
- Run basic accessibility checks with automated tooling and manual keyboard review.
- Validate major layouts at common desktop, tablet, and mobile viewport sizes.
- Confirm there are no console errors, broken internal links, or missing assets.

## 11. Deployment & Operations

- Produce static Vite build artifacts in `dist`.
- No backend deployment, databases, secrets, queues, or application services are required.
- Deployment should remain compatible with Azure Static Web Apps.
- Add a production build command and appropriate static fallback configuration if client-side routes are introduced.
- Configure caching, MIME types, and redirect rules at the static-hosting layer when deploying.

## 12. Implementation Phases

1. Scaffold the Vite React + TypeScript application structure.
2. Establish shared design tokens, global typography, layout primitives, and the component library setup.
3. Build the site header, homepage hero, proof strip, service, solution, industry, insight, and footer sections.
4. Add supporting route or anchor content using typed static data.
5. Implement responsive behavior and keyboard-accessible navigation.
6. Add tests and accessibility checks.
7. Run production build validation and summarize deployment-ready static artifacts.
