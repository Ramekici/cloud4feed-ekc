import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { authAsync } from '../../../features/counter/authSlice';
import { useAppDispatch } from '../../hooks';
import { object, string } from 'yup'
import classNames from 'classnames';
import Eye from './Eye';

const validation = object().shape({
    name: string().required("Kullanici adi gerekli!").min(3, 'Minimum 3 karakter'),
    token: string().required("Token gerekli!")
    .matches(/^.*(?=.{3,})(?=.*\d)(?=.*[a-zA-Z0-9]).*$/g, 'En az 1 harf ve 1 rakam icermelidir.'),
});

export default function Auth() {
    let navigate = useNavigate();
    let location = useLocation();

    const [showPass, setShowPass] = useState<boolean>(false)

    // let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const user = localStorage.getItem('token') ?? '';
        if (user.length !== 0) {
            const data = JSON.parse(user);
            dispatch(authAsync(data));
            let from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [])

    const dispatch = useAppDispatch();

    return (
        <div className='h-100 row'>
            <div className='col-12 col-md-8 col-lg-6 mx-auto border-1'>
                <h1 className='mb-5'>Login</h1>
                <Formik
                    initialValues={{ name: '', token: '' }}
                    validationSchema={validation}
                    // validate={

                    //     values => {
                    //     let errors = {};
                    //     if (!values.name) {
                    //         // errors.name = '';
                    //         errors = { ...errors, 'name': 'Required' };
                    //         // } else if (
                    //         //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(values.name)
                    //         // ) {
                    //         //     errors = { ...errors, 'name': 'Invalid email address.' };
                    //         //     //    errors.name = 'Invalid email address.';
                    //         // }
                    //     }
                    //     else if (!values.token) {
                    //         errors = { ...errors, 'token': 'Required' };
                    //         // } else if (
                    //         //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(values.name)
                    //         // ) {
                    //         //     errors = { ...errors, 'token': 'Invalid token.' };

                    //         // }
                    //     }
                    //     console.log(errors);
                    //     return errors;
                    // }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(authAsync(values))
                        let from = location.state?.from?.pathname || "/";
                        navigate(from, { replace: true });
                        localStorage.setItem('token', JSON.stringify({ ...values }))
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
                            <div className="input-group mb-3">
                                {/* <label> Kullanici Adi </label> */}
                                <input
                                    className={classNames('', { "input-invalid": errors.name && touched.name })}
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
                            <div className="input-group mb-3">
                                <input
                                    className={classNames('', { "input-invalid": errors.token && touched.token })}
                                    type={showPass ? "text" : "password"}
                                    placeholder='Token'
                                    name="token"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.token}
                                />
                                <Eye
                                    changePasswordType={() => setShowPass(prev => !prev)}
                                    show={showPass}
                                />
                                {errors.token && touched.token &&
                                    <div className="input-invalid-feedback" style={{ display: "block" }}>{errors.token}</div>}
                            </div>
                            <button type="submit"
                                disabled={isSubmitting || !touched.name || !touched.token || errors.name !== undefined || errors.token !== undefined}
                                className="btn btn-primary mt-5">
                                Giris
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
