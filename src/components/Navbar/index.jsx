import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const sections = [
    { id: 'inicio', label: 'inicio' },
    { id: 'sobre-mi', label: 'sobre mí' },
    { id: 'proyectos', label: 'proyectos' },
    { id: 'contacto', label: 'contacto' },
]

const Navbar = () => {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('inicio')

    useEffect(() => {
        if (pathname !== '/') return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id)
            })
        }, { rootMargin: '-45% 0px -50% 0px' })
        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })
        return () => observer.disconnect()
    }, [pathname])

    const close = () => setOpen(false)

    return (
        <header className='navbar'>
            <div className='navbar-inner'>
                <Link className='navbar-logo' to='/#inicio' onClick={close}>
                    &lt;christian.arias /&gt;
                </Link>

                <button
                    className='navbar-toggle'
                    onClick={() => setOpen(!open)}
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={open}
                >
                    <FontAwesomeIcon icon={open ? faXmark : faBars} />
                </button>

                <ul className={open ? 'navbar-links open' : 'navbar-links'}>
                    {sections.map(({ id, label }) => (
                        <li key={id}>
                            <Link
                                to={`/#${id}`}
                                className={pathname === '/' && active === id ? 'active' : ''}
                                onClick={close}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <NavLink className='nav-cv' to='/cv' onClick={close}>CV</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar
