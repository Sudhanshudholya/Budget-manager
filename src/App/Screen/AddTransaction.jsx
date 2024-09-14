import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import config from '../Config/Config'
import toasts from '../Config/Toast'
import { useNavigate } from 'react-router-dom'

const addTransactionValidationSchema = yup.object().shape({
    amount: yup.string().min(1).required(),
    remark: yup.string().required(),
    transactionType: yup.string().oneOf(["CREDIT", "DEBIT"]).required()
})

const AddTransaction = () => {
    const navigate = useNavigate()
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Add Transaction :</h1>

            <Formik
                initialValues={{ amount: "", remark: "", transactionType: "" }}
                validationSchema={addTransactionValidationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    axios.post(`${config.baseUrl}/transaction/app/add`, values, { headers: config.getHeaders() })
                        .then(res => {
                            const { code, message } = res.data
                            if (code == "OK") {
                                toasts.successMsg(message)
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
                            <label>Amount : </label>
                            <input
                                type="text"
                                name='amount'
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span>{touched.amount && errors.amount}</span>
                        </div>

                        <div>
                            <label>Remark : </label>
                            <input
                                type="text"
                                name='remark'
                                value={values.remark}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span>{touched.remark && errors.remark}</span>
                        </div>

                        <div>
                            <label>Type : </label>
                            <select
                                type="text"
                                name='transactionType'
                                value={values.transactionType}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>SELECT</option>
                                <option>CREDIT</option>
                                <option>DEBIT</option>
                            </select>
                            <span> {touched.transactionType && errors.transactionType}</span>
                        </div>

                        <div>
                            <button disabled = {isSubmitting} className='button-feature'>SAVE</button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    )
}

export default AddTransaction


// import axios from 'axios';
// import { Formik } from 'formik';
// import React from 'react';
// import * as yup from 'yup';
// import config from '../Config/Config';
// import toasts from '../Config/Toast';
// import { useNavigate } from 'react-router-dom';

// const addTransactionValidationSchema = yup.object().shape({
//   amount: yup.string().min(1).required('Amount is required'),
//   remark: yup.string().required('Remark is required'),
//   transactionType: yup
//     .string()
//     .oneOf(["CREDIT", "DEBIT"], 'Select a valid transaction type')
//     .required('Transaction type is required')
// });

// const AddTransaction = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-semibold text-center mb-4">Add Transaction</h1>

//       <Formik
//         initialValues={{ amount: "", remark: "", transactionType: "" }}
//         validationSchema={addTransactionValidationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           axios
//             .post(`${config.baseUrl}/transaction/app/add`, values, { headers: config.getHeaders() })
//             .then((res) => {
//               const { code, message } = res.data;
//               if (code === "OK") {
//                 toasts.successMsg(message);
//                 navigate('/transaction');
//               } else {
//                 toasts.errorMsg(message);
//               }
//             })
//             .catch((err) => {
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
//               <label className="block text-sm font-medium">Amount</label>
//               <input
//                 type="text"
//                 name="amount"
//                 value={values.amount}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.amount && errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Remark</label>
//               <input
//                 type="text"
//                 name="remark"
//                 value={values.remark}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {touched.remark && errors.remark && <p className="text-red-500 text-sm">{errors.remark}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Transaction Type</label>
//               <select
//                 name="transactionType"
//                 value={values.transactionType}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="mt-1 p-2 w-full border rounded-md"
//               >
//                 <option value="">SELECT</option>
//                 <option value="CREDIT">CREDIT</option>
//                 <option value="DEBIT">DEBIT</option>
//               </select>
//               {touched.transactionType && errors.transactionType && (
//                 <p className="text-red-500 text-sm">{errors.transactionType}</p>
//               )}
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 {isSubmitting ? 'Saving...' : 'SAVE'}
//               </button>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddTransaction;

