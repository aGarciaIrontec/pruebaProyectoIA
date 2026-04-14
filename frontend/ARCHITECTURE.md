# Estructura del Proyecto Angular

## Arquitectura de Componentes

```
src/app/
├── components/           # Componentes compartidos
│   ├── navbar/
│   │   ├── navbar.component.ts
│   │   ├── navbar.component.html
│   │   └── navbar.component.scss
│   └── footer/
│       ├── footer.component.ts
│       ├── footer.component.html
│       └── footer.component.scss
│
├── pages/                # Páginas/Vistas principales
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   ├── home.component.scss
│   │   └── components/  # Subcomponentes específicos de Home
│   │       ├── hero/
│   │       ├── featured-works/
│   │       └── artist-bio/
│   │
│   ├── gallery/
│   │   ├── gallery.component.ts
│   │   ├── gallery.component.html
│   │   ├── gallery.component.scss
│   │   └── components/
│   │       └── work-card/
│   │
│   └── work-detail/
│       ├── work-detail.component.ts
│       ├── work-detail.component.html
│       └── work-detail.component.scss
│
├── services/             # Servicios que llaman al backend
│   ├── work.service.ts
│   └── video.service.ts
│
└── models/               # Interfaces TypeScript
    └── strapi.model.ts
```

## Patrones de Arquitectura

### Componentes
- Cada componente tiene su propio archivo `.html`, `.ts` y `.scss`
- Los componentes grandes se dividen en subcomponentes
- Uso de `standalone: true` (Angular 19)

### Servicios
- Los servicios llaman directamente al backend de Strapi
- Uso de `HttpClient` con tipos tipados
- Patrón de inyección con `inject()`

### Estado
- Uso de Signals para estado reactivo
- No se usa store (NgRx) por simplicidad del proyecto
- Los componentes gestionan su propio estado local

## Estilos (SCSS)

- Variables CSS globales en `styles.css`
- SCSS con anidamiento y mixins cuando sea necesario
- Metodología BEM para clases CSS
- Tailwind CSS como complemento

## Comandos

```bash
# Desarrollo
npm run frontend:start

# Build producción
npm run build
```
