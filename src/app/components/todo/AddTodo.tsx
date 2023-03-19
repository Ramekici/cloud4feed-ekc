import { Formik } from 'formik';
import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks';
import cn from 'classnames';
import { addTodoAsync } from '../../../features/counter/todosSlice';

const AddTodo: React.FC<({ openModal: boolean, setModalOpen: (pos: boolean) => void, itemId: string })> =
    ({ openModal, setModalOpen, itemId }) => {
        const dispatch = useAppDispatch();



        return (
            <div className={cn("modal fade", { 'show': openModal })}
                style={openModal ? { display: 'inline-block' } : {}}
                id="addModal" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <Formik
                        initialValues={{ 'todo': '' }}
                        enableReinitialize
                        validate={values => {
                            let errors = {};
                            if (!values.todo) {
                                // errors.name = '';
                                errors = { ...errors, 'name': 'Required' };
                                // } else if (
                                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(values.name)
                                // ) {
                                //     errors = { ...errors, 'name': 'Invalid email address.' };
                                //     //    errors.name = 'Invalid email address.';
                                // }
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(addTodoAsync({ id: itemId, todo: values.todo }))

                            // let from = location.state?.from?.pathname || "/";
                            // navigate(from, { replace: true });

                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"> Add </h5>
                                        <button type="button" className="close"
                                            onClick={() => {
                                                setModalOpen(false)

                                            }}
                                            data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            className='form-control mb-3'
                                            type="text"
                                            placeholder='Todo'
                                            name="todo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.todo}
                                        />
                                        {errors.todo && touched.todo && errors.todo}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => {
                                                setModalOpen(false)
                                            }}
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }

export default AddTodo;
