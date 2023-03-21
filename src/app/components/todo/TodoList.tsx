import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { selectModal, setModal } from '../../../features/counter/counterSlice';
import { selectTodos } from '../../../features/counter/todosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddTodo from './AddTodo';

export default function TodoList() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const selector = useAppSelector(selectTodos)
  const modal = useAppSelector(selectModal)
  const { state } = useLocation();
  const { itemId } = state;
  console.log(selector);
  return (
    <>
      <AddTodo openModal={modal} setModalOpen={() => dispatch(setModal(false))} itemId={itemId} />
      <div className="row">
        <div className="col">
          <button className="btn btn-secondary btn-outline"
            onClick={() => { navigate('/') }}> Back to Home </button>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col mx-auto'>
          <h1 className='mb-5'> Users Todo List</h1>
          <div className="row mb-5 aling-items-end">
            <div className="col">
              <button className="btn btn-primary" data-toggle="modal"
                onClick={() => dispatch(setModal(true))}
                data-target="#addModal">Add Todo</button>
            </div>
          </div>

          {selector.length > 0 ? <table className="table">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {selector.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row" >{item.user_id}</th>
                    <td>{item.title}</td>
                    <td>{item.due_on}</td>
                    <td>{item.status}</td>
                  </tr>);
              })}
            </tbody>
          </table>
            : <div className='text-error'> Görüntülenecek Veri Yok </div>}
        </div>
      </div>
    </>
  )
}
