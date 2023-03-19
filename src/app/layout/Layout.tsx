import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router';

export default function Layout() {
    let location = useLocation();
    let path = location.pathname ?? '/';
    return (
        <div className='container d-flex flex-column h-100 mt-5'>
            {/* {!path.includes('/login') && 
            <header className='mb-5'> Welcome Cloud4Feed </header>} */}
            {/* <ul>
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
            </ul> */}
            <main className='h-100 justify-content-center'>
                <Outlet />
            </main>
            {/* {!path.includes('/login') && <footer className='position-fixed bottom-0'> Footer </footer>} */}
        </div>
    )
}
