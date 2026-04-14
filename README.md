# Escultor — Portfolio Web

Portfolio web para escultor con diseño minimalista. Monorepo con Angular 19 + Strapi 5.

## Estructura

```
web-escultor/
├── backend/            # Strapi 5 (TypeScript) — CMS headless
│   ├── config/         # Configuración de DB, servidor, plugins
│   └── src/api/        # Content Types: Work, Video, Home, Contact
├── frontend/           # Angular 19 (Standalone Components)
│   └── src/app/
│       ├── components/     # Navbar (drawer lateral), Footer
│       ├── models/         # Interfaces TypeScript
│       ├── pages/          # Home, Gallery, WorkDetail, Contact
│       └── services/       # Work, Video, Home, Contact services
└── package.json        # Scripts raíz para ejecutar ambos proyectos
```

## Requisitos

- **Node.js** 18.x–22.x
- **npm** ≥ 6

---

## Instalación

Desde la raíz del proyecto:

```bash
# Instalar todas las dependencias (raíz, backend y frontend)
npm run install:all
```

O manualmente:

```bash
# Raíz
npm install

# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

---

## Desarrollo

### Desde la raíz (recomendado)

```bash
# Ejecutar backend y frontend simultáneamente
npm run dev
```

O ejecutarlos por separado:

```bash
# Solo backend
npm run backend

# Solo frontend
npm run frontend
```

### Directamente en cada carpeta

**Backend:**
```bash
cd backend
npm run develop
```
- Panel admin en `http://localhost:1337/admin`
- API en `http://localhost:1337/api`

**Frontend:**
```bash
cd frontend
ng serve
```
- App en `http://localhost:4200`

---

## Configuración Backend

### Variables de entorno

Crea `.env` en `backend/`:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=clave1,clave2,clave3,clave4
API_TOKEN_SALT=tu_salt
ADMIN_JWT_SECRET=tu_jwt_secret
TRANSFER_TOKEN_SALT=tu_transfer_salt
JWT_SECRET=tu_jwt

# SMTP (opcional, para formulario de contacto)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
```

### Content Types

**Home (Single Type)**
- Hero: label, título, subtítulo, botón, imagen
- Featured: label, título, botón
- Artist: label, título, bio, imagen

**Work (Collection Type)**
- `title`: Título de la obra
- `description`: Descripción (Rich Text)
- `date`: Fecha
- `category`: Categoría (Enumeración)
- `image`: Imagen
- `slug`: URL amigable (auto-generado)
- `featured`: Destacada (booleano)
- `materials`: Materiales (Multi-select plugin)

**Video (Collection Type)**
- `title`: Título
- `video`: Archivo de vídeo

### Permisos públicos

1. **Settings → Users & Permissions → Roles → Public**
2. Marca `find` y `findOne` en: Work, Video, Home
3. Guarda

### Plugins

- `strapi-plugin-multi-select` — Campo multi-select para materiales

---

## Frontend

### Páginas

| Ruta | Componente |
|---|---|
| `/` | Home — Hero, obras destacadas, artista |
| `/trabajos` | Gallery — Todas las obras |
| `/trabajos/:slug` | WorkDetail — Detalle de obra |
| `/contacto` | Contact — Formulario de contacto |

### Navegación

- **Navbar**: Menú lateral (drawer) con icono hamburguesa
- **Footer**: Enlaces de navegación y redes sociales

---

## API Endpoints

| Endpoint | Descripción |
|---|---|
| `GET /api/works?populate=*` | Todas las obras |
| `GET /api/works?filters[featured][$eq]=true&populate=*` | Obras destacadas |
| `GET /api/works?filters[slug][$eq]=:slug&populate=*` | Obra por slug |
| `GET /api/videos?populate=*` | Todos los vídeos |
| `GET /api/home?populate=*` | Contenido del home |
| `POST /api/contact` | Enviar formulario de contacto |

---

## Build Production

```bash
# Backend
npm run build:backend

# Frontend
npm run build:frontend
```

---

## Tecnologías

- **Backend**: Strapi 5, TypeScript, SQLite, Nodemailer
- **Frontend**: Angular 19, TypeScript, RxJS, Standalone Components
- **Estilo**: SCSS, diseño minimalista inspirado en Apple

---

## Licencia

MIT
