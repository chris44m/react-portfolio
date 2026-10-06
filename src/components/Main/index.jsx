import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../Home'
import About from '../About'
import Projects from '../Projects'
import Contact from '../Contact'

const Main = () => {
    const { hash, key } = useLocation()

    useEffect(() => {
        if (!hash) return
        document.getElementById(hash.slice(1))?.scrollIntoView()
    }, [hash, key])

    return (
        <>
            <Home />
            <About />
            <Projects />
            <Contact />
        </>
    )
}

export default Main
