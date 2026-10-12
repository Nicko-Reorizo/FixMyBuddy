# FixMyBuddy Frontend

React + Tailwind CSS frontend for the FixMyBuddy roadside assistance app.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

The location screen uses browser geolocation when permission is granted. Provider results are loaded through `src/services/providerService.js`, which is ready to connect to the future backend and does not ship fake provider records.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.
- `npm run lint` checks the frontend source with ESLint.

