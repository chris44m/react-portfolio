import './index.scss'
import dotnetIcon from 'devicon/icons/dotnetcore/dotnetcore-original.svg'
import reactIcon from 'devicon/icons/react/react-original.svg'
import sqlServerIcon from 'devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg'
import postgresIcon from 'devicon/icons/postgresql/postgresql-original.svg'
import dockerIcon from 'devicon/icons/docker/docker-original.svg'
import gitIcon from 'devicon/icons/git/git-original.svg'

const faces = [
    { icon: dotnetIcon, name: '.NET' },
    { icon: reactIcon, name: 'React' },
    { icon: sqlServerIcon, name: 'SQL Server' },
    { icon: postgresIcon, name: 'PostgreSQL' },
    { icon: dockerIcon, name: 'Docker' },
    { icon: gitIcon, name: 'Git' },
]

const About = () => {
    return (
        <section id='sobre-mi' className='section about'>
            <h2 className='section-title'><span>01.</span>Sobre mí</h2>
            <div className='about-grid'>
                <div className='about-text'>
                    <p>
                        Soy Ingeniero de Computación y Sistemas por la Universidad San Martín de Porres y trabajo como desarrollador backend y full stack. Me especializo en .NET, ASP.NET Core, APIs REST, SQL Server y PostgreSQL.
                    </p>
                    <p>
                        En WebControl Systems desarrollo y mantengo aplicaciones web en .NET con arquitectura MVC y principios SOLID, y participo en la migración de sistemas legados en ASP Clásico hacia .NET, optimizando consultas y procedimientos almacenados en SQL Server. Antes, en ALBIZIM, construí APIs y servicios backend en C# con integraciones REST y SOAP.
                    </p>
                    <p>
                        Como freelance diseñé y construí por mi cuenta un sistema de gestión para restaurantes con backend en ASP.NET Core, Entity Framework Core, PostgreSQL y autenticación JWT, y frontend en React, TypeScript y Tailwind CSS, desplegado con Docker en Railway y en Vercel.
                    </p>
                    <p>
                        Trabajo también con herramientas de desarrollo asistido por IA como Claude Code y OpenCode, revisando y validando siempre el código con foco en calidad, seguridad y confiabilidad. Me gusta analizar sistemas complejos y convertir requerimientos de negocio en soluciones técnicas sólidas.
                    </p>
                </div>

                <div className='stage-cube-cont'>
                    <div className='cubespinner'>
                        {faces.map(({ icon, name }, index) => (
                            <div key={name} className={`face${index + 1}`}>
                                <img src={icon} alt={name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
