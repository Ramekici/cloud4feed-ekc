import classNames from 'classnames';
import React from 'react'
import { Eye, GenderFemale, GenderMale, Pen, Trash3 } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { fetchTodoAsync } from '../../../features/counter/todosSlice';
import { deleteUser, selectCUserStatus, selectUsers, setModal, User } from '../../../features/counter/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loading from '../Loading';

const UserList: React.FC<{ setUpdate: (p: User) => void }> = ({ setUpdate }) => {

    let navigate = useNavigate();
    const selector = useAppSelector(selectUsers)
    const userStat = useAppSelector(selectCUserStatus)
    const dispatch = useAppDispatch()
    const deleteHandler = (idm: number) => {
        if (window.confirm('Are you sure for deleting user!!!')) {
            dispatch(deleteUser({ id: idm }))
        }
        else {
            return
        }
    }

    if (userStat === 'loading') {
        return <div className='d-flex align-items-center justify-content-center'> <Loading /> </div>
    }
    if (userStat === 'failed') {
        return <div className="row">Some error happened. Try it again later.</div>
    }
    return (
        <div className="row mt-3">
            {selector.length > 0 && selector.map((item) => {
                return (<div className="col-12 col-lg-6 mb-4 px-3" key={item.id} style={{ minHeight: '150px' }}>
                    <div className={classNames("card h-100 mx-1", { 'border-success border-3': item.status === 'active' })} >
                        <div className="card-body p-relative" style={{ minHeight: '72px' }}>
                            <h4 className="card-title">{item.name}</h4>
                            <p className="card-text"> Mail : {item.email}</p>
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px'
                            }}>{item.gender === 'female' ? <GenderFemale size={32} /> : <GenderMale size={32} />} </div>

                        </div>
                        <div className='card-footer d-flex justify-content-between align-items-center'>
                            <div className="byn-grp">
                                <button className="btn btn-primary me-3"
                                    onClick={() => {
                                        setUpdate(item)
                                        dispatch(setModal(true));
                                    }} > <Pen /><span className='d-none d-lg-inline ps-1'>Update</span></button>
                                <button className="btn btn-secondary me-3"
                                    onClick={() => {
                                        navigate('/details', { state: { itemId: item.id.toString() } })
                                        dispatch(fetchTodoAsync(item.id.toString()))
                                    }} > <Eye /><span className='d-none d-lg-inline ps-1'>Details</span></button>
                            </div>
                            <button className="btn btn-outline-danger"
                                onClick={() => deleteHandler(item.id)} >
                                <Trash3 /><span className='d-none d-lg-inline ps-1'>Delete</span></button>
                        </div>
                    </div>
                </div>);
            }
            )}
        </div>
    )
}

export default UserList;
