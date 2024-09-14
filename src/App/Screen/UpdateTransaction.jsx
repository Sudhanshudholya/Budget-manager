import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import config from '../Config/Config'
import toasts from '../Config/Toast'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'


const updateTransactionValidationSchema = yup.object().shape({
    amount: yup.string().min(1).required(),
    remark: yup.string().required(),
    transactionType: yup.string().oneOf(["CREDIT", "DEBIT"]).required()
})

const UpdateTransaction = () => {
    const navigate = useNavigate()
    const { txnId } = useParams()
    const [searchParam] = useSearchParams()

    const amount = searchParam.get("amount")
    const transactionType = searchParam.get("transactionType")
    const remark = searchParam.get("remark")

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Update Transaction :</h1>

            <Formik
                initialValues={{ amount: amount, remark: remark, transactionType: transactionType }}
                validationSchema={updateTransactionValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.put(`${config.baseUrl}/transaction/app/${txnId}`, values, { headers: config.getHeaders() })
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
                            <button disabled={isSubmitting} className='button-feature'>SAVE</button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    )
}

export default UpdateTransaction


// import axios from 'axios';
// import { Formik } from 'formik';
// import React from 'react';
// import * as yup from 'yup';
// import config from '../Config/Config';
// import toasts from '../Config/Toast';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// const updateTransactionValidationSchema = yup.object().shape({
//   amount: yup.string().min(1).required('Amount is required'),
//   remark: yup.string().required('Remark is required'),
//   transactionType: yup.string().oneOf(["CREDIT", "DEBIT"]).required('Transaction type is required'),
// });

// const UpdateTransaction = () => {
//   const navigate = useNavigate();
//   const { txnId } = useParams();
//   const [searchParam] = useSearchParams();

//   const amount = searchParam.get("amount");
//   const transactionType = searchParam.get("transactionType");
//   const remark = searchParam.get("remark");

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Update Transaction</h1>

//       <Formik
//         initialValues={{ amount: amount, remark: remark, transactionType: transactionType }}
//         validationSchema={updateTransactionValidationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           axios.put(`${config.baseUrl}/transaction/app/${txnId}`, values, { headers: config.getHeaders() })
//             .then(res => {
//               const { code, message } = res.data;
//               if (code === "OK") {
//                 toasts.successMsg(message);
//                 navigate('/transaction');
//               } else {
//                 toasts.errorMsg(message);
//               }
//             })
//             .catch(err => {
//               console.error(err);
//               toasts.errorMsg("Failed to update transaction");
//             })
//             .finally(() => setSubmitting(false));
//         }}
//       >
//         {({ values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting }) => (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium mb-2">Amount:</label>
//               <input
//                 type="text"
//                 name="amount"
//                 value={values.amount}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${touched.amount && errors.amount ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
//               />
//               {touched.amount && errors.amount && (
//                 <p className="text-red-500 text-sm">{errors.amount}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-lg font-medium mb-2">Remark:</label>
//               <input
//                 type="text"
//                 name="remark"
//                 value={values.remark}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${touched.remark && errors.remark ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
//               />
//               {touched.remark && errors.remark && (
//                 <p className="text-red-500 text-sm">{errors.remark}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-lg font-medium mb-2">Transaction Type:</label>
//               <select
//                 name="transactionType"
//                 value={values.transactionType}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${touched.transactionType && errors.transactionType ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
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
//                 className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
//               >
//                 {isSubmitting ? 'Saving...' : 'Save'}
//               </button>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UpdateTransaction;

