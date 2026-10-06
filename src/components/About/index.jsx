import { useEffect, useState } from 'react'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJava, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from '../Loader'


const About = () => {


    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        // Crear un temporizador
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        // Función de limpieza que cancela el temporizador
        return () => clearTimeout(timer);
    }, []);

    return (

        <>
            <div className='container about-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['A', 'c', 'e', 'r', 'c', 'a', ' ', 'd', 'e', ' ', 'm', 'i']}
                            idx={13}
                        />
                    </h1>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        Soy Ingeniero de Computación y Sistemas por la Universidad San Martín de Porres y trabajo como desarrollador backend y full stack. Me especializo en .NET, ASP.NET Core, APIs REST, SQL Server y PostgreSQL.
                    </p>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        En WebControl Systems desarrollo y mantengo aplicaciones web en .NET con arquitectura MVC y principios SOLID, y participo en la migración de sistemas legados en ASP Clásico hacia .NET, optimizando consultas y procedimientos almacenados en SQL Server. Antes, en ALBIZIM, construí APIs y servicios backend en C# con integraciones REST y SOAP.
                    </p>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        Como freelance diseñé y construí por mi cuenta un sistema de gestión para restaurantes con backend en ASP.NET Core, Entity Framework Core, PostgreSQL y autenticación JWT, y frontend en React, TypeScript y Tailwind CSS, desplegado con Docker en Railway y en Vercel.
                    </p>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        Trabajo también con herramientas de desarrollo asistido por IA como Claude Code y OpenCode, revisando y validando siempre el código con foco en calidad, seguridad y confiabilidad. Me gusta analizar sistemas complejos y convertir requerimientos de negocio en soluciones técnicas sólidas.
                    </p>

                </div>

                <div className='stage-cube-cont'>
                    <div className='cubespinner'>
                        <div className='face1'>
                            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
                        </div>
                        <div className='face2'>
                            <FontAwesomeIcon icon={faHtml5} color="#F06529" />
                        </div>
                        <div className='face3'>
                            <FontAwesomeIcon icon={faCss3} color="#2884D9" />
                        </div>
                        <div className='face4'>
                            <FontAwesomeIcon icon={faJava} color="#DD0031" />
                        </div>
                        <div className='face5'>
                            <FontAwesomeIcon icon={faNodeJs} color="#EFD81D" />
                        </div>
                        <div className='face6'>
                            <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
                        </div>
                    </div>
                </div>
            </div>
            <Loader />
        </>


    )

}

export default About
