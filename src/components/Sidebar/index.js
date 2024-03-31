import './index.scss'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFile, faHome, faUser, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';




const Sidebar = () => {

    const [showNav, setShowNav] = useState(false);

    return (

        <div className='nav-bar'>
            <Link className='logo' to='/' onClick={() => setShowNav(false)}>
                <img src={LogoS} alt='logo' />
                <img className='sub-logo' src={LogoSubtitle} alt='christian' />
            </Link>
            <nav className={showNav ? 'mobile-show' : ''}>

                <NavLink exact='true' activeclassname='active' to='/' onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faHome} color='#4d4d4e' />
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='about-link' to='/about' onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faUser} color='#4d4d4e' />
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='contact-link' to='/contact' onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faEnvelope} color='#4d4d4e' />
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='file-link' to='/cv' onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faFile} color='#4d4d4e' />
                </NavLink>
                <FontAwesomeIcon
                    onClick={() => setShowNav(false)}
                    icon={faClose}
                    color="#F0F8FF"
                    size="3x"
                    className='close-icon' />
            </nav>

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
            <FontAwesomeIcon
                onClick={() => setShowNav(true)}
                icon={faBars}
                color="#F0F8FF"
                size="3x"
                className='hamburger-icon' />
        </div>
    )
}
export default Sidebar;