import { Field, Formik } from 'formik';
import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { addTodoAsync, selectTodosSta } from '../../../features/counter/todosSlice';
import classNames from 'classnames';
import { selectModal, setModal } from '../../../features/counter/userSlice';
import { object, string } from 'yup';
import useOnClickOutside from '../../helper/useOutsideClick';

const validation = object().shape({
    title: string().required("Baslik gerekli!").min(2, 'Minimum 2 karakter gerekli.'),
    status: string().required("Status gerekli!"),
    due_on: string().required("Tarih gerekli!")
});

const AddTodo: React.FC<({ openModal: boolean, setModalOpen: () => void, itemId: number })> =
    ({ openModal, setModalOpen, itemId }) => {
        const dispatch = useAppDispatch();
        const userStat = useAppSelector(selectTodosSta)
        const userModal = useAppSelector(selectModal)

        const handleClickOutside = () => {
            if(userModal) {dispatch(setModal(false))}
        }
        const ref = useRef(null);
        useOnClickOutside(ref, handleClickOutside)

        return (
            <div className={cn("modal fade", { 'show': openModal })}
                style={openModal ? { display: 'inline-block' } : {}}
                id="addModal" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" ref={ref}>
                    <Formik
                        initialValues={{ title: '', status: '', due_on: '' }}
                        enableReinitialize
                        validationSchema={validation}
                        onSubmit={async (values, { setSubmitting }) => {
                            var response = await dispatch(addTodoAsync({
                                data: {
                                    ...values, 'user_id': itemId,
                                    id: 123,
                                }
                            }))
                            if (response) {
                                dispatch(setModal(false))
                            }

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
                            resetForm
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"> Add </h5>
                                        <button type="button" className="close btn btn-lg"
                                            onClick={() => {
                                                resetForm()
                                                setModalOpen()
                                            }
                                            }
                                            data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group my-3">
                                            {/* <label> Kullanici Adi </label> */}
                                            <input
                                                className={classNames('', { "input-invalid": errors.title && touched.title })}
                                                type="text"
                                                placeholder='Baslik'
                                                name="title"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}

                                            />
                                            {errors.title && touched.title &&
                                                <div className="input-invalid-feedback" style={{ display: "block" }}>{errors.title}</div>}
                                        </div>
                                        <div className="input-group my-3 " >
                                            <select
                                                className={classNames('', { "input-invalid": errors.status && touched.status })}
                                                style={{ height: '2.2rem', display: "block" }}
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            >
                                                <option value="" label="Select a status">
                                                    Select a status{" "}
                                                </option>
                                                <option value="pending" label="Pending">
                                                    {" "}
                                                    Pending
                                                </option>
                                                <option value="completed" label="Completed">
                                                    Completed
                                                </option>
                                            </select>
                                            {errors.status && touched.status &&
                                                <div className="input-invalid-feedback" style={{ display: "block" }}>{errors.status}</div>}
                                        </div>
                                        <div className="input-group my-3 " >
                                            <Field type="date" name="due_on" placeholder="Select up to date" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => {
                                                resetForm()
                                                setModalOpen()
                                            }
                                            }
                                            data-dismiss="modal">Kapat</button>
                                        <button type="submit" className="btn btn-primary">
                                            <div className={classNames("", { "spinner-border": userStat === 'loading' })} role="status">
                                            </div>
                                            <span className={classNames('', { 'd-none': userStat === 'loading' })}> Ekle</span>
                                        </button>
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
