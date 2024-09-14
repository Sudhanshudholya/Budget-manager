import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import config from '../Config/Config'
import { Link, useNavigate } from 'react-router-dom'
import toasts from '../Config/Toast'

const registerFormValidationSchema = yup.object().shape({
    name: yup.string().required().min(5),
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(5).transform(value => value.toLocaleLowerCase()),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'confirm password must be same as password')
})

const Register = () => {
    const navigate = useNavigate()
    return (
        <>
            <h1 style={{ textAlign: "center" }}> Register :</h1>
            <Formik
                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                validationSchema={registerFormValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(`${config.baseUrl}/user/register`, values)
                        .then(res => {
                            const { code, data, message } = res.data
                            if (code == "OK") {
                                toasts.successMsg(message)
                                navigate('/login')
                            } else {
                                toasts.errorMsg(message)
                            }

                        }).catch(err => {
                            console.log("error is : ", err);

                        }).finally(() => {
                            setSubmitting(false)
                        })
                }}
            >
                {({ values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit} className='d-flex'>
                        <div>
                            <label>Name :</label><br />
                            <input
                                type="text"
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            <span>{touched.name && errors.name}</span>
                        </div>

                        <div>
                            <label>Email : </label><br />
                            <input
                                type="text"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            <span>{touched.email && errors.email}</span>
                        </div>

                        <div>
                            <label>Password : </label><br />
                            <input
                                type="text"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            <span>{touched.password && errors.password}</span>
                        </div>

                        <div>
                            <label>Confirm Password : </label><br />
                            <input
                                type="text"
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            <span>{touched.confirmPassword && errors.confirmPassword}</span>
                        </div><br />

                        <button disabled={isSubmitting} className='button-feature' >Register</button><br /><br />

                        <p>Already Logged in : <Link to={'/login'} style={{ textDecoration: "none" }}>Click Here</Link></p>
                    </form>)}


            </Formik>
        </>
    )
}

export default Register



// import axios from 'axios';
// import { Formik } from 'formik';
// import React from 'react';
// import * as yup from 'yup';
// import config from '../Config/Config';
// import { Link, useNavigate } from 'react-router-dom';
// import toasts from '../Config/Toast';

// const registerFormValidationSchema = yup.object().shape({
//   name: yup.string().required('Name is required').min(5, 'Name must be at least 5 characters'),
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
//   confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
// });

// const Register = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

//       <Formik
//         initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
//         validationSchema={registerFormValidationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           axios.post(`${config.baseUrl}/user/register`, values)
//             .then(res => {
//               const { code, message } = res.data;
//               if (code === 'OK') {
//                 toasts.successMsg(message);
//                 navigate('/login');
//               } else {
//                 toasts.errorMsg(message);
//               }
//             })
//             .catch(err => console.error('Error:', err))
//             .finally(() => setSubmitting(false));
//         }}
//       >
//         {({ values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting }) => (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.name && errors.name && (
//                 <p className="text-red-500 text-sm">{errors.name}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.email && errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.password && errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={values.confirmPassword}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.confirmPassword && errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               {isSubmitting ? 'Registering...' : 'Register'}
//             </button>

//             <p className="text-center mt-4">
//               Already have an account?{' '}
//               <Link to="/login" className="text-blue-500 hover:underline">Login Here</Link>
//             </p>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Register;

