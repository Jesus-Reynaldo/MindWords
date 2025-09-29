# React + TypeScript + Vite

MindWords es una aplicación para aprender vocabulario con repaso espaciado, autenticación y verificación gramatical asistida por IA.

## Características

- **Autenticación con Supabase** usando `useAuth()` en `src/feactures/auth/hook/useAuth.ts`.
- **Gestión de vocabulario (CRUD)** con tablas de Supabase (`Word`) vía `src/feactures/vocabulary/services/supabaseService.ts`.
- **Revisión diaria** por `nextReviewDate` (Day.js) para saber qué palabras estudiar hoy.
- **Validación gramatical con Gemini** en `src/feactures/vocabulary/services/api_gemini.ts`.
- **UI React + MUI + Tailwind** sobre Vite + TypeScript.

## Stack

- React 19, TypeScript, Vite
- MUI (@mui/material), Emotion
- Tailwind CSS (v4 con `@tailwindcss/vite`)
- Supabase (`@supabase/supabase-js`)
- Google Generative AI (`@google/genai`)
- dayjs

## Requisitos previos

- Node.js 18+ recomendado
- npm o pnpm
- Una instancia de Supabase (URL y Anon Key)
- Una API Key de Gemini (Google AI Studio)

## Variables de entorno

La app lee variables desde `import.meta.env`.
Debes crear un archivo `.env` en la raíz del proyecto con:

```bash
# Supabase
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Gemini (Google AI)
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Referencias en el código:
- `src/feactures/core/lib/supabaseClient.ts` usa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- `src/feactures/vocabulary/services/api_gemini.ts` usa `VITE_GEMINI_API_KEY`.

> Nota: `.env` y `.env.local` están ignorados por Git (ver `.gitignore`). Si quieres, puedo generar un `.env.example` con estos nombres de variables.

## Scripts

Disponibles en `package.json`:

```bash
# Desarrollo con Vite
npm run dev

# Construcción de producción
npm run build

# Previsualización del build
npm run preview

# Linter
npm run lint
```

## Puesta en marcha

1. Clona el repo e instala dependencias:
   ```bash
   npm install
   ```
2. Crea `.env` con tus claves (ver sección Variables de entorno).
3. Arranca en desarrollo:
   ```bash
   npm run dev
   ```
4. Abre el navegador en la URL que muestre Vite (por defecto, `http://localhost:5173`).

## Estructura relevante

```
src/
  feactures/
    auth/
      hook/
        useAuth.ts                # Gestión de sesión Supabase
    core/
      lib/
        supabaseClient.ts         # Cliente Supabase (env)
    vocabulary/
      services/
        supabaseService.ts        # CRUD de palabras + filtros por usuario
        api_gemini.ts             # Validación gramatical con Gemini (env)
```

## Configuración de Supabase

- Crea tabla `Word` con al menos:
  - `id` (uuid, pk)
  - `user_id` (uuid)
  - `text` (text)
  - `nextReviewDate` (date)
- Añade RLS adecuada para que cada usuario solo acceda a sus filas (`user_id = auth.uid()`).

## Seguridad
- La clave anónima de Supabase es pública en front-end, pero usa RLS.
- No subas `.env` al repositorio.

## Problemas comunes
  113→- 403 al hacer `git push`: suele ser por credenciales cacheadas de otra cuenta GitHub. Elimina la credencial `git:https://github.com` en el Administrador de Credenciales de Windows o ejecuta `git credential-manager git logout https://github.com` y vuelve a iniciar sesión.

## Licencia

MIT
