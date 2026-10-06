# Christian Arias · Portafolio

Portafolio personal de **Christian Arias**, Software Engineer en Arequipa, Perú. Desarrollador backend y full stack con .NET, ASP.NET Core, SQL Server, PostgreSQL y React.

**Sitio:** https://react-portfolio-gamma-three.vercel.app

![Vista previa del portafolio](public/og-image.png)

## Secciones

- **Inicio:** presentación con una terminal que simula una petición `GET /api/christian` y responde con el perfil en JSON.
- **Sobre mí:** experiencia y enfoque, con un cubo 3D de las tecnologías principales.
- **Proyectos:** sistema de gestión para restaurantes, HNCASE (central de esterilización) y sistema de reservas Santa Ursula.
- **Contacto:** formulario con envío por EmailJS y enlaces a correo, LinkedIn, GitHub y WhatsApp.
- **CV:** visor del currículum en PDF con descarga en español e inglés.

## Stack

| | |
|---|---|
| Framework | React 19 + React Router 7 |
| Build | Vite 8 |
| Estilos | Sass (SCSS) con variables de diseño |
| Tipografías | Inter y JetBrains Mono (`@fontsource`) |
| Íconos | Font Awesome 7 y Devicon |
| PDF | react-pdf 11 |
| Formulario | EmailJS |
| Hosting | Vercel |

## Cómo correrlo

Requiere **Node.js 22.13 o superior**.

```bash
npm install
npm run dev
```

El sitio queda en http://localhost:3000.

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |

## Estructura

```
src/
├── assets/          CV en PDF (ES y EN)
├── components/
│   ├── Navbar/      Barra superior con navegación por secciones
│   ├── Main/        Página única que compone las secciones
│   ├── Home/        Portada y terminal animada
│   ├── About/       Sobre mí y cubo de tecnologías
│   ├── Projects/    Tarjetas de proyectos
│   ├── Contact/     Formulario y enlaces de contacto
│   └── Resume/      Visor del CV
└── styles/          Variables de diseño y estilos globales
```

## Contacto

- Correo: chris.29.01.44@gmail.com
- LinkedIn: [christian-alfredo-arias-bejar](https://www.linkedin.com/in/christian-alfredo-arias-bejar-7a835a21b/)
- GitHub: [chris44m](https://github.com/chris44m)
