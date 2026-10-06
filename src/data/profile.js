export const siteUrl = 'https://react-portfolio-gamma-three.vercel.app'

export const profile = {
    nombre: 'Christian Arias',
    titulo: 'Software Engineer',
    rol: 'Backend & Full Stack Developer',
    ubicacion: 'Arequipa, PE',
    disponible: true,
    stackPrincipal: ['.NET', 'SQL Server', 'PostgreSQL', 'React'],
    stack: {
        lenguajes: ['C#', 'JavaScript', 'TypeScript', 'SQL'],
        backend: ['.NET', 'ASP.NET Core', 'Entity Framework Core', 'REST APIs', 'JWT'],
        frontend: ['React', 'TypeScript', 'Blazor', 'Tailwind CSS', 'Vite'],
        basesDeDatos: ['SQL Server', 'PostgreSQL'],
        herramientas: ['Git', 'Docker', 'Postman', 'Swagger/OpenAPI'],
    },
    experiencia: [
        { empresa: 'WebControl Systems', cargo: 'Desarrollador Web', desde: '2024-12', hasta: null },
        { empresa: 'ALBIZIM', cargo: 'Desarrollador Back-end', desde: '2023-09', hasta: '2024-08' },
        { empresa: 'Santa Ursula', cargo: 'Desarrollador Web', desde: '2022-09', hasta: '2023-08' },
    ],
    proyectos: [
        {
            nombre: 'Sistema de Gestión para Restaurantes',
            tipo: 'Freelance · Full Stack',
            periodo: '2025 – 2026',
            descripcion: 'Sistema completo para restaurantes: mesas y pedidos, menú e inventario con descuento automático de stock y costeo por recetas, caja con arqueo diario, planillas, dashboard de rentabilidad, facturación electrónica SUNAT e impresión de tickets térmicos.',
            destacado: 'Flujo transaccional de cierre de pedidos con actualización atómica de stock para evitar condiciones de carrera en pedidos concurrentes.',
            stack: ['ASP.NET Core', '.NET 8', 'EF Core', 'PostgreSQL', 'JWT', 'Swagger', 'React 19', 'TypeScript', 'Tailwind CSS', 'Docker'],
            repo: null,
        },
        {
            nombre: 'HNCASE — Central de Esterilización',
            tipo: 'Proyecto personal · Full Stack',
            periodo: '2023',
            descripcion: 'Aplicación web para gestionar el flujo de trabajo de la central de esterilización de un hospital: seguimiento de materiales, ciclos y registros de procesamiento.',
            destacado: 'Diseño de extremo a extremo, desde el modelado de datos hasta la interfaz, con arquitectura MVC.',
            stack: ['React 18', 'Bootstrap', 'Axios', '.NET', 'REST API'],
            repo: 'https://github.com/chris44m/HNCASE',
        },
        {
            nombre: 'Sistema de Reservas — Santa Ursula',
            tipo: 'Desarrollador Web',
            periodo: '2022 – 2023',
            descripcion: 'Sistema web de reservas de habitaciones y servicios con una estructura mantenible y escalable.',
            destacado: 'Despliegue y configuración del hosting en la nube con Heroku.',
            stack: ['.NET Framework', 'Blazor', 'PostgreSQL', 'MVC', 'Heroku'],
            repo: 'https://github.com/chris44m/hotel-santa-ursula-II',
        },
    ],
    contacto: {
        email: 'chris.29.01.44@gmail.com',
        linkedin: 'https://www.linkedin.com/in/christian-alfredo-arias-bejar-7a835a21b/',
        github: 'https://github.com/chris44m',
        whatsapp: 'https://wa.me/51927478889',
    },
}

const { whatsapp, ...contactoPublico } = profile.contacto

export const apiProfile = {
    nombre: profile.nombre,
    titulo: profile.titulo,
    rol: profile.rol,
    ubicacion: profile.ubicacion,
    disponible: profile.disponible,
    stackPrincipal: profile.stackPrincipal,
    stack: profile.stack,
    experiencia: profile.experiencia,
    proyectos: profile.proyectos.map(({ nombre, tipo, periodo, descripcion, stack, repo }) => ({
        nombre,
        tipo,
        periodo,
        descripcion,
        stack,
        repo,
    })),
    contacto: contactoPublico,
    cv: `${siteUrl}/cv`,
    sitio: siteUrl,
}
