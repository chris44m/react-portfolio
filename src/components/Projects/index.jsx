import { useEffect, useState } from 'react'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const projects = [
    {
        title: 'Sistema de Gestión para Restaurantes',
        meta: 'Freelance · Full Stack · 2025 – 2026',
        description: 'Sistema completo para restaurantes: mesas y pedidos, menú e inventario con descuento automático de stock y costeo por recetas, caja con arqueo diario, planillas, dashboard de rentabilidad, facturación electrónica SUNAT e impresión de tickets térmicos.',
        highlight: 'Flujo transaccional de cierre de pedidos con actualización atómica de stock para evitar condiciones de carrera en pedidos concurrentes.',
        tags: ['ASP.NET Core', '.NET 8', 'EF Core', 'PostgreSQL', 'JWT', 'Swagger', 'React 19', 'TypeScript', 'Tailwind CSS', 'Docker'],
    },
    {
        title: 'HNCASE — Central de Esterilización',
        meta: 'Proyecto personal · Full Stack · 2023',
        description: 'Aplicación web para gestionar el flujo de trabajo de la central de esterilización de un hospital: seguimiento de materiales, ciclos y registros de procesamiento.',
        highlight: 'Diseño de extremo a extremo, desde el modelado de datos hasta la interfaz, con arquitectura MVC.',
        tags: ['React 18', 'Bootstrap', 'Axios', '.NET', 'REST API'],
        repo: 'https://github.com/chris44m/HNCASE',
    },
    {
        title: 'Sistema de Reservas — Santa Ursula',
        meta: 'Desarrollador Web · 2022 – 2023',
        description: 'Sistema web de reservas de habitaciones y servicios con una estructura mantenible y escalable.',
        highlight: 'Despliegue y configuración del hosting en la nube con Heroku.',
        tags: ['.NET Framework', 'Blazor', 'PostgreSQL', 'MVC', 'Heroku'],
        repo: 'https://github.com/chris44m/hotel-santa-ursula-II',
    },
]

const Projects = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <div className='container projects-page'>
                <h1>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={['P', 'r', 'o', 'y', 'e', 'c', 't', 'o', 's']}
                        idx={15}
                    />
                </h1>

                <div className='projects-grid'>
                    {projects.map((project) => (
                        <article className='project-card' key={project.title}>
                            <h2>{project.title}</h2>
                            <span className='project-meta'>{project.meta}</span>
                            <p>{project.description}</p>
                            <p className='project-highlight'>{project.highlight}</p>
                            <ul className='project-tags'>
                                {project.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                            {project.repo ? (
                                <a className='project-link' href={project.repo} target='_blank' rel='noreferrer'>
                                    <FontAwesomeIcon icon={faGithub} /> Ver código
                                </a>
                            ) : (
                                <span className='project-link private'>
                                    <FontAwesomeIcon icon={faLock} /> Repositorio privado
                                </span>
                            )}
                        </article>
                    ))}
                </div>
            </div>
            <Loader />
        </>
    )
}

export default Projects
