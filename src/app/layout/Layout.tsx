import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectError, selectModal, setError, setModal } from '../../features/counter/userSlice';
import classNames from 'classnames';


export default function Layout() {
    // let location = useLocation();
    // let path = location.pathname ?? '/';
    const modal = useAppSelector(selectModal)
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(error !== '') {
        setTimeout(() => {
            dispatch(setError(''))
        }, 3000);
    }
    }, [error])

    return (
        <div>
            <div className={classNames("", { "backdrop": modal })}></div>
            <div id="snackbar" className={classNames("", { 'show': error !== ''})}>Token is Invalid</div>
            <div className='container d-flex flex-column h-100 mt-5'>
                <main className='h-100 justify-content-center'>
                    <Outlet />
                </main>
                {/* {!path.includes('/login') && <footer className='position-fixed bottom-0'> Footer </footer>} */}
            </div>
        </div>
    )
}
