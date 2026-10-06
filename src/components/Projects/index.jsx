import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { profile } from '../../data/profile'

const Projects = () => {
    return (
        <section id='proyectos' className='section projects'>
            <h2 className='section-title'><span>02.</span>Proyectos</h2>
            <div className='projects-grid'>
                {profile.proyectos.map((project) => (
                    <article className='project-card' key={project.nombre}>
                        <span className='project-meta'>{project.tipo} · {project.periodo}</span>
                        <h3>{project.nombre}</h3>
                        <p>{project.descripcion}</p>
                        <p className='project-highlight'>{project.destacado}</p>
                        <ul className='project-tags'>
                            {project.stack.map((tag) => (
                                <li key={tag} className='tag'>{tag}</li>
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
        </section>
    )
}

export default Projects
