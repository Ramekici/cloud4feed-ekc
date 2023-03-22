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
    // let location = useLocation();
    const dispatch = useAppDispatch();
    const [pageSize, setPerSize] = useState<number>(10)

    const modal = useAppSelector(selectModal)

    const [currentPage, setCurrentPage] = useState(1);

    const [update, setUpdate] = useState<User>()

    // let from = location.state?.from?.pathname || "/";

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
            <AddModal openModal={modal} setModalOpen={() => dispatch(setModal(false))} user={update} />
            <div className='row justify-content-end'>
                <div className="col-3 col-lg-2">
                    <button className='w-100 btn btn-outline-danger' onClick={logout}><BoxArrowRight /> Logout</button>
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
                                data-target="#addModal"><PersonAdd /> Add User</button>
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
