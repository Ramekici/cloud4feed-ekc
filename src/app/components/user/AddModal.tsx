import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks';
import cn from 'classnames';
import { asyncUpdateUser, User, asyncAddUser } from '../../../features/counter/counterSlice';

const AddModal: React.FC<{ openModal: boolean, setModalOpen: (pos: boolean) => void, user?: User }> =
    ({ openModal, setModalOpen, user }) => {
        const dispatch = useAppDispatch();
        const [initialValues, setInitial] = useState({ email: '', name: '', gender: '', status: '' })

        useEffect(() => {
            if (user !== undefined) {
                console.log(user.email);
                setInitial({ email: user?.email, name: user?.name, gender: user?.gender ?? '', status: user?.status ?? '' })
            }
        }, [
            user
        ])

        return (
            <div className={cn("modal fade", { 'show': openModal })}
                style={openModal ? { display: 'inline-block' } : {}}
                id="addModal" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validate={values => {
                            let errors = {};
                            if (!values.name) {
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
                            if (user !== undefined) {
                                console.log('up')
                                dispatch(asyncUpdateUser({ id: user.id, ...values }))
                            } else {
                                dispatch(asyncAddUser({ id: 123, ...values }))
                            }

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
                                        <h5 className="modal-title" id="exampleModalLabel">{user !== undefined ? 'Update' : 'Add'}</h5>
                                        <button type="button" className="close"
                                            onClick={() => {
                                                setModalOpen(false)
                                                setInitial({ email: '', name: '', gender: '', status: '' })
                                            }}
                                            data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            className='form-control mb-3'
                                            type="text"
                                            placeholder='Kullanici Adi'
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name && errors.name}
                                        <input
                                            className='form-control mb-3'
                                            type="email"
                                            placeholder='Email'
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && errors.email}
                                        <input
                                            className='form-control mb-3'
                                            type="text"
                                            placeholder='Gender'
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.gender}
                                        />
                                        {errors.gender && touched.gender && errors.gender}
                                        <input
                                            className='form-control mb-3'
                                            type="text"
                                            placeholder='Status'
                                            name="status"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.status}
                                        />
                                        {errors.status && touched.status && errors.status}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => {
                                                setModalOpen(false)
                                                setInitial({ email: '', name: '', gender: '', status: '' })
                                            }}
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">{user === undefined ? 'Add' : 'Update'}</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>);
    }

export default AddModal;
