import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectError, selectModal, setError, setModal } from '../../features/counter/userSlice';
import classNames from 'classnames';
import { selectErrorTodo, setErrorTodo } from '../../features/counter/todosSlice';


export default function Layout() {
    // let location = useLocation();
    // let path = location.pathname ?? '/';
    const modal = useAppSelector(selectModal)
    const errorTodo = useAppSelector(selectErrorTodo)
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                dispatch(setError(''))
            }, 3000);
        }
        if (errorTodo !== '') {
            setTimeout(() => {
                dispatch(setErrorTodo(''))
            }, 3000);
        }

    }, [error, errorTodo])

    return (
        <>
            <div className={classNames("", { "backdrop": modal })}></div>
            <div id="snackbar" className={classNames("", { 'show': error !== '' || errorTodo !== '' })}>Token is Invalid</div>
            <div className='container mt-5' style={{ minHeight: '100vh' }}>
                <Outlet />

                {/* {!path.includes('/login') && <footer className='position-fixed bottom-0'> Footer </footer>} */}
            </div>
        </>
    )
}
