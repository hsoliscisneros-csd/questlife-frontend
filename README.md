# QuestLife Frontend

SPA — React · Vite · Tailwind CSS

## Configuración

```bash
cp .env.example .env
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:5173 — el proxy redirige `/api` al backend en el puerto 3000.

## Estructura

```
src/
  components/   # ui, layout, rpg
  pages/        # public, user
  services/     # apiClient, authService
  hooks/        # useAuth
  assets/
```
