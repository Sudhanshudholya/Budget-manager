import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import config from '../Config/Config'
import toasts from '../Config/Toast'
import { Link, useNavigate } from 'react-router-dom'

const loginFormValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(5)
})

const Login = () => {
  const navigate = useNavigate()
  return (
    <>

      <h1 style={{ textAlign: "center" }}> Login  </h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.post(`${config.baseUrl}/user/login`, values, { headers: { "device-id": config.deviceId } })
            .then(res => {
              const { code, data, message } = res.data
              if (code == "OK") {
                //Login success
                toasts.successMsg(message)
                const { token } = data
                localStorage.setItem("token", token)
                navigate('/transaction')
              } else {
                toasts.errorMsg(message)
              }
            }).catch(err => {
              console.log(err);
            }).finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit} className='d-flex'>
           
              <div>
                <label>Email : </label><br />
                <input
                  type="text"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                  />
                <span>{touched.email && errors.email}</span>
              </div>

              <div>
                <label>Password : </label><br />
                <input
                  type="text"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                <span>{touched.password && errors.password}</span>
              </div><br />

              <button disabled={isSubmitting} className='button-feature'>Login</button><br /><br /><br />

              <p>Create new account: <Link to={'/register'} style={{textDecoration : "none"}}>Click Here</Link></p>
        

          </form>)}
      </Formik>
    </>
  )
}

export default Login



// import axios from 'axios';
// import { Formik } from 'formik';
// import React from 'react';
// import * as yup from 'yup';
// import config from '../Config/Config';
// import toasts from '../Config/Toast';
// import { Link, useNavigate } from 'react-router-dom';

// const loginFormValidationSchema = yup.object().shape({
//   email: yup.string().required('Email is required').email('Invalid email format'),
//   password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters')
// });

// const Login = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={loginFormValidationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           axios.post(`${config.baseUrl}/user/login`, values, { headers: { "device-id": config.deviceId } })
//             .then(res => {
//               const { code, data, message } = res.data;
//               if (code === "OK") {
//                 toasts.successMsg(message);
//                 const { token } = data;
//                 localStorage.setItem("token", token);
//                 navigate('/transaction');
//               } else {
//                 toasts.errorMsg(message);
//               }
//             })
//             .catch(err => {
//               console.log(err);
//             })
//             .finally(() => {
//               setSubmitting(false);
//             });
//         }}
//       >
//         {({ values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting }) => (
//           <form onSubmit={handleSubmit} className="space-y-4">
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

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               {isSubmitting ? 'Logging in...' : 'Login'}
//             </button>

//             <p className="text-center mt-4">
//               Create new account?{' '}
//               <Link to="/register" className="text-blue-500 hover:underline">
//                 Click Here
//               </Link>
//             </p>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;
