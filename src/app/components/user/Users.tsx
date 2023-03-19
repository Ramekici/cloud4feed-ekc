import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { asyncUsers, deleteUser, selectUsers, User } from '../../../features/counter/counterSlice';
import { fetchTodoAsync } from '../../../features/counter/todosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddModal from './AddModal';

export default function Users() {
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useAppDispatch();
    const selector = useAppSelector(selectUsers)

    const [openModal, setModalOpen] = useState<boolean>(false)
    const [update, setUpdate] = useState<User>()

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        dispatch(asyncUsers())
    }, [])

    // const closeMadalHandler = (pos: boolean) =>{
    //     setModalOpen(pos)
    //     setUpdate(undefined)
    // }

    useEffect(() => { if (!openModal) setUpdate(undefined) }, [openModal])


    return (
        <>
            <AddModal openModal={openModal} setModalOpen={setModalOpen} user={update} />
            <div className='row'>
                <div className='col-md-5 col-lg-4 mx-auto'>
                    <h1 className='mb-5'>Users</h1>
                    <div className="row mb-5 aling-items-end">
                        <div className="col">
                            <button className="btn btn-primary" data-toggle="modal"
                                onClick={() => setModalOpen(true)}
                                data-target="#addModal">Add New</button>
                        </div>
                    </div>
                    {selector.length > 0 && selector.map((item) => {
                        return (<div className="card mb-3" key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text"> {item.email}</p>
                                <p className="card-text"> {item.gender}</p>

                            </div>
                            <div className='card-footer'>
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        setUpdate(item)
                                        setModalOpen(true);
                                    }} > Update </button>
                                <button className="btn btn-secondary"
                                    onClick={() => {
                                        navigate('/details', { state: {itemId: item.id.toString() } })
                                        dispatch(fetchTodoAsync(item.id.toString()))
                                    }} > Details </button>
                                <button className="btn btn-error" onClick={() => {
                                    console.log(item.id)
                                    dispatch(deleteUser({ id: item.id.toString() }))
                                }} > Delete </button>
                            </div>
                        </div>);
                    }
                    )}


                </div>
            </div>
        </>
    )
}
