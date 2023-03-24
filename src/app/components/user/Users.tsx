import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { setAuth } from '../../../features/counter/authSlice';
import { asyncFetchUsers, selectModal, setModal, User } from '../../../features/counter/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddModal from './AddModal';
import Pagination from '../Pagination';
import UserList from './UserList';
import { BoxArrowRight, PersonAdd } from 'react-bootstrap-icons';



export default function Users() {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [pageSize, setPerSize] = useState<number>(20)
    const modal = useAppSelector(selectModal)
    const [currentPage, setCurrentPage] = useState(1);
    const [update, setUpdate] = useState<User>()


    useEffect(() => {
        dispatch(asyncFetchUsers({ page: currentPage, per_page: pageSize }))
    }, [currentPage, pageSize])

    const changePageSize =(s:number)=> {
        setCurrentPage(1)
        setPerSize(s)
    }

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

    return (
        <>
            <AddModal 
                openModal={modal} 
                setModalOpen={() => dispatch(setModal(false))} 
                user={update} />
            <div className='row justify-content-end'>
                <div className="col-3 col-lg-2">
                    <button className='w-100 btn btn-outline-danger' onClick={logout}>
                    <span className='d-none d-lg-inline pe-2'>Logout</span>
                     <BoxArrowRight size={24}/></button>
                </div>
            </div>
            <div className='row'>
                <div className='col mx-auto'>
                    <h1 className='mb-5 text-center mt-5'>Users</h1>
                    <div className="row mb-5 justify-content-end">
                        <div className="col-3 col-lg-2">
                            <button className="btn btn-secondary w-100" 
                                data-toggle="modal"
                                onClick={() => {
                                    setUpdate(undefined)
                                    dispatch(setModal(true))
                                }}
                                data-target="#addModal"><PersonAdd size={24}/><span className='d-none d-lg-inline ps-2'>Add User</span></button>
                        </div>
                    </div>
                    <div className="row">
                        <Pagination
                            className="pagination-bar mx-auto"
                            currentPage={currentPage}
                            totalCount={100}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                            onPageSize={pag => changePageSize(pag)}
                        />
                    </div>
                    <UserList setUpdate={setUpdate} />
                </div>
            </div>

        </>
    )
}
