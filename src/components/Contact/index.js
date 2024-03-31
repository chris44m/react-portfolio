import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';



const Contact = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    useEffect(() => {
        // Crear un temporizador
        const timer = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
      
        // Función de limpieza que cancela el temporizador
        return () => clearTimeout(timer);
      }, []);

      const sendEmail = (e) =>{
        e.preventDefault();
        emailjs
        .sendForm(
            'service_ernqlbi',
            'template_r6li941',
            form.current,   
            'FhARJLiEsvuGYdW52'
        )
        .then(
            () => {
                alert('MENSAJE ENVIADO!')
                window.location.reload(false)
            },
            () => {
                alert('Mensaje no Enviado, intentalo otra vez')
            }
        )
      }
    return (
        <>

            <div className="container contact-page">
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                        letterClass={letterClass} 
                        strArray={['C','o','n','t','a','c','t','a','m','e' ]} 
                        idx={15}/>
                    </h1>

                    <p style={{ padding: 10, textAlign: "left", fontSize:25, color: "#C0C0C0", fontFamily: 'Helvetica Neue'  }}>
                        Dejame un mensaje y te contestare a la brevedad.
                    </p>
                    <div className='contact-form'>
                        <form ref={form} onSubmit={sendEmail}>
                            <ul>
                                <li className='half'>
                                    <input type='text' name='name' placeholder='Nombre' required />
                                </li>
                                <li className='half'>
                                    <input type='email' name='email' placeholder='Email' required />
                                </li>
                                <li>
                                    <input placeholder="Asunto" type='text' name='asunto' required />
                                </li>
                                <li>
                                    <textarea name='message' placeholder='Mensaje' required>
                                            
                                    </textarea>
                                </li>
                                <li>
                                    <input type='submit' className='flat-button' value="ENVIAR"/>
                                </li>
                            </ul>
                        </form>

                        <ul>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/christian-alfredo-arias-bejar-7a835a21b/'>
                        <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' className='anchor-icon' />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://github.com/chris44m'>
                        <FontAwesomeIcon icon={faGithub} color='#4d4d4e' className='anchor-icon' />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.instagram.com/christian44ab/'>
                        <FontAwesomeIcon icon={faInstagram} color='#4d4d4e' className='anchor-icon' />
                    </a>
                </li>
            </ul>

                    </div>
                </div>
                <div className='info-map'>
                    Christian Arias,
                    <br />
                    Arequipa,
                    <br />
                    Av. Paris 301, Hunter <br />
                    Arequipa-Peru <br />
                    <span>chris.29.01.44@gmail.com</span>
                </div>
                <div className='map-wrap'>
                    <MapContainer center={[-16.440259, -71.557100]} zoom={13}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        <Marker position={[-16.440259, -71.557100]}>

                            <Popup>ENCUENTRAME AQUI.</Popup>

                        </Marker>

                    </MapContainer>

                </div>
            </div>
            <Loader type='ball-clip-rotate-multiple'/>
        
        </>
    )
}

export default Contact