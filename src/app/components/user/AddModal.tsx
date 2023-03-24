import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { asyncUpdateUser, User, asyncAddUser, setModal, selectUserStatus, selectModal } from '../../../features/counter/userSlice';
import classNames from 'classnames';
import { object, string } from 'yup';
import useOnClickOutside from '../../helper/useOutsideClick';

const validation = object().shape({
    name: string().required("Kullanici Adi gerekli!").min(2, 'Minimum 2 karakter gerekli.'),
    email: string().required("Email gerekli!").email(),
    status: string().required("Status gerekli!"),
    gender: string().required("Gender gerekli!")
});

const AddModal: React.FC<{ openModal: boolean, setModalOpen: () => void, user?: User }> =
    ({ openModal, setModalOpen, user }) => {
        const dispatch = useAppDispatch();
        const [initialValues, setInitial] = useState({ email: '', name: '', gender: '', status: '' })
        const userStat = useAppSelector(selectUserStatus)
        const userModal = useAppSelector(selectModal)

        useEffect(() => {
            if (user !== undefined) {
                console.log(user);
                setInitial({ email: user?.email, name: user?.name, gender: user?.gender ?? '', status: user?.status ?? '' })
            }
        }, [
            user
        ])

        const handleClickOutside = () => {
            if(userModal) {dispatch(setModal(false))}
            
        }

        const ref = useRef(null);
        useOnClickOutside(ref, handleClickOutside)

        return (
            <div className={cn("modal fade", { 'modal-open show': openModal })}
                style={openModal ? { display: 'block' } : {display: 'none'}}
                id="addModal" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" ref={ref}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={validation}

                        onSubmit={async (values, { setSubmitting }) => {
                            let response = null;
                            if (user !== undefined) {
                            
                                response = await dispatch(asyncUpdateUser({ id: user.id, ...values }))
                            } else {
                                response = await dispatch(asyncAddUser({ id: 123, ...values }))
                            }
                            console.log(response)
                            if (response) {
                                dispatch(setModal(false))
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
                            <form onSubmit={handleSubmit} className='d-flex flex-column w-100'>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{user !== undefined ? 'Update' : 'Add'}</h5>
                                        <button type="button" className="close btn btn-lg"
                                            onClick={() => {
                                                setModalOpen()
                                                setInitial({ email: '', name: '', gender: '', status: '' })
                                            }}
                                            data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" className=''>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group-custom my-3">
                                            <input
                                                className={classNames('input', { "input-invalid": errors.name && touched.name })}
                                                type="text"
                                                placeholder='Kullanici Adi'
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />

                                            {errors.name && touched.name &&
                                                <div className="input-invalid-feedback" style={{ display: "block" }}>{errors.name}</div>}
                                        </div>
                                        <div className="input-group-custom my-3">
                                            <input
                                                className={classNames('input', { "input-invalid": errors.email && touched.email })}
                                                type="email"
                                                placeholder='Email'
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />


                                            {errors.email && touched.email &&
                                                <div className="input-invalid-feedback" style={{ display: "block" }}>{errors.email}</div>}
                                        </div>


                                        <div className="input-group-custom my-3">
                                            <select
                                                className={classNames('input', { "input-invalid": errors.status && touched.status })}
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                style={{ display: "block", height: '3rem', 
                                                borderRadius: '.3rem' }}
                                            >
                                                <option value="" label="Select a status">
                                                    Select a status{" "}
                                                </option>
                                                <option value="active" label="Active">
                                                    {" "}
                                                    Active
                                                </option>
                                                <option value="inactive" label="Inactive">
                                                    Not Activated
                                                </option>
                                            </select>
                                            {errors.status && touched.status &&
                                                <div className="input-invalid-feedback" 
                                                style={{ display: "block" }}>{errors.status}</div>}
                                        </div>

                                        <div className="row my-3">
                                            <div className="col-12 mb-1">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="male"
                                                >
                                                    Gender
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    id="male"
                                                    type="radio"
                                                    value="male"
                                                    name='gender'
                                                    onChange={handleChange}
                                                    checked={values.gender === "male"}
                                                />
                                                <label
                                                    className="ps-2 form-control-label"
                                                    htmlFor="male"
                                                >
                                                    Male
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    id="female"
                                                    type="radio"
                                                    value="female"
                                                    name='gender'
                                                    onChange={handleChange}
                                                    checked={values.gender === "female"}
                                                />
                                                <label
                                                    className="ps-2 form-control-label"
                                                    htmlFor="female"
                                                >
                                                    Female
                                                </label>
                                            </div>
                                            {errors.gender && touched.gender &&
                                                <div className="input-invalid-feedback ps-3" 
                                                style={{ display: "block" }}>{errors.gender}</div>}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => {
                                                setModalOpen()
                                                setInitial({ email: '', name: '', gender: '', status: '' })
                                            }}
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary btn-md">
                                            <span className={classNames("", { "spinner-border": userStat === 'loading' })} role="status">

                                            </span>
                                            <span className={classNames('', { 'd-none': userStat === 'loading' })}> {user === undefined ? 'Add' : 'Update'}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>);
    }

export default AddModal;
