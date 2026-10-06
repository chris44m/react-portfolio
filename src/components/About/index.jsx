import { useEffect, useState } from 'react'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJava, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'


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
                        Estoy en el último año de Ingeniería de Computación y Sistemas en la Universidad San Martín de Porres, apasionado por el desarrollo de software y la innovación tecnológica.
                    </p>
                    <p className='me' align="LEFT" style={{fontFamily: 'Helvetica Neue'}}>
                        Destaco en C# y JavaScript, creando soluciones robustas y experiencias web interactivas. Con práctica en Java, desarrollo aplicaciones multiplataforma eficientes. En bases de datos, manejo PostgreSQL y MySQL, diseñando esquemas que optimizan el rendimiento de las aplicaciones.
                    </p>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        Utilizo herramientas como Figma para diseño UI, Visual Studio Code para desarrollo, y Postman para pruebas de APIs, buscando siempre la eficiencia y la calidad en el proceso de desarrollo.
                    </p>
                    <p className='me' style={{fontFamily: 'Helvetica Neue'}}>
                        Actualmente, amplío mis conocimientos en React, aprendiendo desde sus fundamentos hasta técnicas avanzadas como hooks y gestión del estado, con el objetivo de crear aplicaciones web modernas y escalables.
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
            <Loader type="ball-clip-rotate-multiple" />
        </>


    )

}

export default About
