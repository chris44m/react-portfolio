import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import Terminal from './Terminal'
import cvEs from '../../assets/CV_Christian_Arias_ES.pdf'
import './index.scss'

const nameArray = 'Christian Arias'.split('')
const roleArray = 'software engineer.'.split('')
const stack = ['.NET', 'ASP.NET Core', 'SQL Server', 'PostgreSQL', 'React', 'TypeScript', 'Docker']

const Home = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section id='inicio' className='hero'>
            <div className='hero-inner'>
                <div className='hero-text'>
                    <p className='hero-kicker'>// Arequipa, Perú</p>
                    <h1>
                        <span className='hero-greeting'>Hola, soy</span>
                        <span className='hero-name'>
                            <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={1} />
                        </span>
                        <span className='hero-role'>
                            <AnimatedLetters letterClass={letterClass} strArray={roleArray} idx={16} />
                        </span>
                    </h1>
                    <p className='hero-subtitle'>Backend & Full Stack Developer · .NET · React</p>
                    <div className='hero-actions'>
                        <Link className='btn btn-primary' to='/#proyectos'>Ver proyectos</Link>
                        <a className='btn btn-outline' href={cvEs} download='CV_Christian_Arias_ES.pdf'>Descargar CV</a>
                    </div>
                </div>
                <Terminal />
            </div>
            <ul className='hero-stack'>
                {stack.map((item) => (
                    <li key={item} className='tag'>{item}</li>
                ))}
            </ul>
        </section>
    )
}

export default Home
