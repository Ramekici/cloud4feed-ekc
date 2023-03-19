import React, { useState } from 'react'
import { useLocation } from 'react-router';
import { selectTodos } from '../../../features/counter/todosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddTodo from './AddTodo';

export default function TodoList() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectTodos)
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { state } = useLocation();
  const { itemId } = state;
  return (
    <>
      <AddTodo openModal={openModal} setModalOpen={setModalOpen} itemId={itemId}/>
      <div className='row'>
        <div className='col-md-5 col-lg-4 mx-auto'>
          <h1 className='mb-5'> Users Todo List</h1>
          <div className="row mb-5 aling-items-end">
            <div className="col">
              <button className="btn btn-primary" data-toggle="modal"
                onClick={() => setModalOpen(true)}
                data-target="#addModal">Add Todo</button>
            </div>
          </div>
          {selector.values.length > 0 && selector.map((item) => {
            return (<div className="card mb-3" key={item.id}>
              <div className="card-body">
                <h5 className="card-title">Item</h5>
              </div>
            </div>);
          }
          )}
        </div>
      </div>
    </>
  )
}
