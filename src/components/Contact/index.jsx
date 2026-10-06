import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const links = [
    { icon: faEnvelope, label: 'chris.29.01.44@gmail.com', href: 'mailto:chris.29.01.44@gmail.com' },
    { icon: faLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/christian-alfredo-arias-bejar-7a835a21b/' },
    { icon: faGithub, label: 'GitHub', href: 'https://github.com/chris44m' },
    { icon: faWhatsapp, label: 'WhatsApp', href: 'https://wa.me/51927478889' },
]

const statusMessages = {
    sending: 'Enviando…',
    sent: 'Mensaje enviado. Te responderé a la brevedad.',
    error: 'No se pudo enviar el mensaje. Inténtalo otra vez o escríbeme por correo.',
}

const Contact = () => {
    const form = useRef()
    const [status, setStatus] = useState('idle')

    const sendEmail = (e) => {
        e.preventDefault()
        setStatus('sending')
        emailjs
            .sendForm('service_ernqlbi', 'template_r6li941', form.current, 'FhARJLiEsvuGYdW52')
            .then(
                () => {
                    setStatus('sent')
                    form.current.reset()
                },
                () => setStatus('error')
            )
    }

    return (
        <section id='contacto' className='section contact'>
            <h2 className='section-title'><span>03.</span>Contacto</h2>
            <div className='contact-grid'>
                <form ref={form} onSubmit={sendEmail} className='contact-form'>
                    <div className='form-row'>
                        <label>
                            <span>Nombre</span>
                            <input type='text' name='name' required />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type='email' name='email' required />
                        </label>
                    </div>
                    <label>
                        <span>Asunto</span>
                        <input type='text' name='asunto' required />
                    </label>
                    <label>
                        <span>Mensaje</span>
                        <textarea name='message' rows='6' required />
                    </label>
                    <div className='form-footer'>
                        <button type='submit' className='btn btn-primary' disabled={status === 'sending'}>
                            Enviar mensaje
                        </button>
                        <p className={`form-status ${status}`} role='status'>
                            {statusMessages[status] ?? ''}
                        </p>
                    </div>
                </form>

                <aside className='contact-info'>
                    <p>
                        ¿Tienes un proyecto o una oportunidad? Déjame un mensaje y te contestaré a la brevedad.
                    </p>
                    <ul>
                        {links.map(({ icon, label, href }) => (
                            <li key={label}>
                                <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel='noreferrer'>
                                    <FontAwesomeIcon icon={icon} fixedWidth />
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li className='contact-location'>
                            <FontAwesomeIcon icon={faLocationDot} fixedWidth />
                            Arequipa, Perú
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    )
}

export default Contact
