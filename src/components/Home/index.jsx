import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-s.png'
import './index.scss'
import Logo from './Logo'
import Loader from '../Loader'
import Type from './Type'

const Home = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['h', 'r', 'i', 's', 't', 'i', 'a', 'n']
    const jobArray = ['s', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'e', 'n', 'g', 'i', 'n', 'e', 'e', 'r', '.']

    useEffect(() => {
        const timer = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 4000);
        return () => clearTimeout(timer);
      }, []); // Dependencias vacías para que el efecto se ejecute solo una vez
      

    return (
        <>

        <div className="container home-page">
            <div className="text-zone">
                
                <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _12`}>o</span>
                    <span className={`${letterClass} _12`}>l</span>
                    <span className={`${letterClass} _12`}>a,</span>
                    <br />
                    <span className={`${letterClass} _13`}>S</span>
                    <span className={`${letterClass} _14`}>o</span>
                    <span className={`${letterClass} _15`}>y</span>

                    <img src={LogoTitle} alt="developer" />
                    <AnimatedLetters 
                    letterClass={letterClass}
                    strArray={nameArray}
                    idx={15} />

                    <br />
                    <AnimatedLetters 
                    letterClass={letterClass}
                        strArray={jobArray}
                        idx={22} />
                </h1>
                <h2>Backend & Full Stack Developer / .NET / React</h2>
                <div style={{ padding: 50, textAlign: "left", fontSize:50, color: "#C0C0C0", fontFamily: 'La Belle Aurore'  }}>
                <Type />
              </div>
                <Link to="/contact" className='flat-button'>CONTACTAME</Link>

            </div>

            <Logo />
        </div>
        <Loader />
        </>
    )
}

export default Home