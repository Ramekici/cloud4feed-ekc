import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router';
import { useAppSelector } from '../hooks';
import { selectModal } from '../../features/counter/counterSlice';
import classNames from 'classnames';

export default function Layout() {
    let location = useLocation();
    let path = location.pathname ?? '/';
    const modal = useAppSelector(selectModal)
    return (
        <>
            <div className={classNames("", {"backdrop": modal})}></div>
            <div className='container d-flex flex-column h-100 mt-5'>
                <main className='h-100 justify-content-center'>
                    <Outlet />
                </main>
                {/* {!path.includes('/login') && <footer className='position-fixed bottom-0'> Footer </footer>} */}
            </div>
        </>
    )
}
