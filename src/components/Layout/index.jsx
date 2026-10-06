import './index.scss';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className='main'>
                <Outlet />
            </main>
        </>
    )
}

export default Layout
