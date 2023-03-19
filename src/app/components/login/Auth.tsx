import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { authAsync, AuthData } from '../../../features/counter/authSlice';
import { useAppDispatch } from '../../hooks';

export default function Auth() {
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const user = localStorage.getItem('token') ?? '';
        if (user.length !== 0) {
            const data = JSON.parse(user);
            dispatch(authAsync(data));
            let from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [])

    // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();

    //     let formData = new FormData(event.currentTarget);
    //     let username = formData.get("user") as string;

    //     // auth.signin(username, () => {
    //     //   // Send them back to the page they tried to visit when they were
    //     //   // redirected to the login page. Use { replace: true } so we don't create
    //     //   // another entry in the history stack for the login page.  This means that
    //     //   // when they get to the protected page and click the back button, they
    //     //   // won't end up back on the login page, which is also really nice for the
    //     //   // user experience.
    //     //   navigate(from, { replace: true });
    //     // });
    // }

    const dispatch = useAppDispatch();

    return (
        <div className='h-100 row'>
            <div className='col-md-5 col-lg-4 mx-auto'>
                <h1 className='mb-5'>Login</h1>
                <Formik
                    initialValues={{ name: '', token: '' }}
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
                        else if (!values.token) {
                            errors = { ...errors, 'token': 'Required' };
                            // } else if (
                            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(values.name)
                            // ) {
                            //     errors = { ...errors, 'token': 'Invalid token.' };

                            // }
                        }
                        console.log(errors);
                        return errors;
                    }}
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
                                type="password"
                                placeholder='Token'
                                name="token"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.token}
                            />
                            {errors.token && touched.token && errors.token}
                            <button type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary">
                                Giris
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
