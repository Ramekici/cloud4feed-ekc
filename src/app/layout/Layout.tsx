import React from 'react'
import { Outlet } from 'react-router-dom'
// import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectModal, setModal } from '../../features/counter/userSlice';
import classNames from 'classnames';


export default function Layout() {
    // let location = useLocation();
    // let path = location.pathname ?? '/';
    const modal = useAppSelector(selectModal)
    // const dispatch = useAppDispatch()
    return (
        <div>
            <div className={classNames("", {"backdrop": modal})}></div>
            <div className='container d-flex flex-column h-100 mt-5'>
                <main className='h-100 justify-content-center'>
                    <Outlet />
                </main>
                {/* {!path.includes('/login') && <footer className='position-fixed bottom-0'> Footer </footer>} */}
            </div>
        </div>
    )
}
