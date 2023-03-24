import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { selectModal, setModal } from '../../../features/counter/userSlice';
import { selectTodos, selectTodosStatus } from '../../../features/counter/todosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddTodo from './AddTodo';
import { ArrowLeft, Plus } from 'react-bootstrap-icons';
import TodoItem from './TodoItem';

export default function TodoList() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const selector = useAppSelector(selectTodos)
  const status = useAppSelector(selectTodosStatus)
  const modal = useAppSelector(selectModal)
  const { state } = useLocation();
  const { itemId } = state;
  return (
    <>
      <AddTodo openModal={modal} setModalOpen={() => dispatch(setModal(false))} itemId={itemId} />
      <div className="row">
        <div className="col">
          <button className="btn btn-outline-info"
            onClick={() => { navigate('/') }}><ArrowLeft size={32} /> Back to Home </button>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col mx-auto'>
          <h1 className='mb-5 text-center'> Users Todo List</h1>
          <div className="row mb-5 justify-content-end">
            <div className="col-3 col-lg-2">
              <button className="btn btn-secondary" data-toggle="modal"
                onClick={() => dispatch(setModal(true))}
                data-target="#addModal"><Plus size={24} />
                <span className='d-none d-lg-inline ps-1'> Add Todo </span></button>
            </div>
          </div>

          <TodoItem selector={selector} status={status} />
        </div>
      </div>
    </>
  )
}
