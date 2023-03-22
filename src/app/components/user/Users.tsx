import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { setAuth } from '../../../features/counter/authSlice';
import { asyncFetchUsers, deleteUser, selectCUserStatus, selectModal, selectUsers, setModal, User } from '../../../features/counter/userSlice';
import { fetchTodoAsync } from '../../../features/counter/todosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddModal from './AddModal';
import Loading from '../Loading';

export default function Users() {
    let navigate = useNavigate();
    // let location = useLocation();
    const dispatch = useAppDispatch();
    const selector = useAppSelector(selectUsers)
    const modal = useAppSelector(selectModal)
    const userStat = useAppSelector(selectCUserStatus)

    const [update, setUpdate] = useState<User>()

    // let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        dispatch(asyncFetchUsers())
    }, [])

    // const closeMadalHandler = (pos: boolean) =>{
    //     setModalOpen(pos)
    //     setUpdate(undefined)
    // }

    useEffect(() => { if (!modal) setUpdate(undefined) }, [modal])

    const logout = () => {
        dispatch(setAuth(false))
        localStorage.removeItem('token')
        navigate('/login')
    }

    const deleteHandler = (idm: number) => {
        if (window.confirm('Are you sure for deleting user!!!')) {
            dispatch(deleteUser({ id: idm }))
        }
        else {
            return
        }
    }

    if(userStat === 'loading'){
        return <Loading />
    }
    if(userStat === 'failed'){
        return <div className="row">Some error happened. Try it again later.</div>
    }
    

    return (
        <>
            <AddModal openModal={modal} setModalOpen={() => dispatch(setModal(false))} user={update} />
            <div className='row justify-content-end'>
                <div className="col-3 col-lg-2">
                    <button className='w-100 btn btn-outline-danger' onClick={logout}>Logout</button>
                </div>
            </div>
            <div className='row'>
                <div className='col mx-auto'>
                    <h1 className='mb-5'>Users</h1>
                    <div className="row mb-5 justify-content-end">
                        <div className="col-3 col-lg-2">
                            <button className="btn btn-primary w-100" data-toggle="modal"
                                onClick={() => {
                                    setUpdate(undefined)
                                    dispatch(setModal(true))
                                }}
                                data-target="#addModal">Add New</button>
                        </div>
                    </div>
                    <div className="row">
                        {selector.length > 0 && selector.map((item) => {
                            return (<div className="col col-md-6 " key={item.id}>
                                <div className={classNames("card mb-3", { 'border-success': item.status === 'active' })} >
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text"> {item.email}</p>
                                        <p className="card-text"> {item.gender}</p>
                                        {/* <p className="card-text"> {item.status}</p> */}
                                    </div>
                                    <div className='card-footer d-flex justify-content-between align-items-center'>
                                        <div className="byn-grp">
                                            <button className="btn btn-primary me-3"
                                                onClick={() => {
                                                    setUpdate(item)
                                                    dispatch(setModal(true));
                                                }} > Update </button>
                                            <button className="btn btn-secondary me-3"
                                                onClick={() => {
                                                    navigate('/details', { state: { itemId: item.id.toString() } })
                                                    dispatch(fetchTodoAsync(item.id.toString()))
                                                }} > Details </button>
                                        </div>
                                        <button className="btn btn-outline-danger" onClick={() => deleteHandler(item.id)} > Delete </button>
                                    </div>
                                </div>
                            </div>);
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
