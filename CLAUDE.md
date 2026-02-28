# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test suite is configured.

## Environment Variables

Requires a `.env` file in the project root (not committed):

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_GEMINI_API_KEY=...
```

## Architecture

MindWords is a spaced-repetition vocabulary learning SPA with grammar lessons and AI-powered features.

**Stack:** React 19 + TypeScript, Vite, MUI v7, Tailwind CSS v4, Supabase (PostgreSQL + Auth), Google Generative AI (Gemini 2.5-flash-lite), React Router v7, React Hook Form, dayjs.

**No global state management** — local `useState`/`useEffect` hooks only. No React Query; Supabase is called directly from service files.

### Feature Modules (`src/feactures/` — note the typo is intentional/existing)

- **auth/** — `useAuth()` hook for Supabase session, `ProtectedRoute` component, Login/Signup pages
- **core/** — `lib/supabaseClient.ts` initializes the single Supabase client
- **vocabulary/** — Main learning feature: add words, daily review (spaced repetition via `nextReviewDate`), Gemini grammar validation, word definition lookup
- **grammar/** — Grammar topics: list, view content, practice exercises, Gemini-generated study cards
- **layout/** — `Layout.tsx` drawer navigation with purple theme; `utils/menuItems.tsx` defines nav items
- **shares/** — Shared `Loading` spinner component

### Routing (`src/App.tsx`)

```
/login, /signup         → Public
/  or /review           → ReviewPage (protected)
/vocabulary             → VocabularyApp (protected)
/grammar                → GrammarTopicsPage (protected)
/grammar/:grammarId     → GrammarPage (protected)
```

`BrowserRouter` is set up in `main.tsx`. All app routes are wrapped in `<ProtectedRoute>` which redirects to `/login` if unauthenticated.

### Data Models

**Word** (vocabulary): `word`, `definition`, `sentence[]`, `level`, `nextReviewDate`, `dias[]` (spaced repetition intervals), `type`, `synonyms[]`, `antonyms[]`, `user_id`

**GrammarTopic**: `title`, `levelEnglish` (A1–C2), `explanation`, `formulates[]`, `examples[]`

**ReviewTopic**: tracks grammar practice progress per user

### Supabase Patterns

- All tables use `user_id` matching `auth.uid()` with RLS enabled
- Service files (`supabaseService.ts`, `supabaseGrammar.ts`) handle all CRUD
- Query pattern: `supabase.from('TableName').select().eq('user_id', userId)`

### AI Integration

Both Gemini service files use structured JSON output (`responseMimeType: "application/json"`) with a defined response schema:
- `src/feactures/vocabulary/services/api_gemini.ts` — `validateGrammarWithGemini()`, `defineWordWithGemini()`
- `src/feactures/grammar/services/api_grammar_gemini.ts` — `generateGrammarTopicWithGemini()`

### Styling

Uses MUI components for interactive UI, Tailwind utilities for layout/spacing, and TypeScript style objects in `styles/` files for MUI `sx` props. Primary color palette is purple (`#2f0f57`, `#7a00e9`, `#9252e0`).
