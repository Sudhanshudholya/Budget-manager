import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../Config/Config'
import formateDate from '../Config/Date'
import Skeleton from '../Components/Skeleton'
import { Link } from 'react-router-dom'
import Logout from '../Components/Logout'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import toasts from '../Config/Toast'


const Transaction = () => {
  const [transaction, setTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")


  const MySwal = withReactContent(Swal)

  const [dateFilter, setDateFilter] = useState({
    "dateFilterKey": "createdAt",
    "startDate": "",
    "endDate": ""
  })

  const getTransaction = () => {
    setIsLoading(true)
    axios.post(`${config.baseUrl}/transaction/app`, {
      "limit": perPage,
      "searchValue": search,
      "params": ["remark", "transactionType"],
      "page": currentPage,
      "filterBy": [],
      "dateFilter": dateFilter,
      "orderBy": "createdAt",
      "orderByValue": -1,
      "isPaginationRequired": true
    }, { headers: config.getHeaders() })
      .then(res => {
        setTransaction(res.data)
      })
      .catch(err => {

      }).finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getTransaction()
  }, [perPage, currentPage, search, dateFilter])

  const deleteTxn = (txnId) => {
    axios.delete(`${config.baseUrl}/transaction/app/${txnId}`, { headers: config.getHeaders() })
      .then(res => {
        toasts.successMsg(res.data.message)
        getTransaction()
      }).catch(err => {
        toasts.errorMsg(err)
      })
  }

  const handleDelete = (txnId) => {

    Swal.fire({
      title: "Do you really want to delete",
      text: "This action can not be reverse",
      icon: "question",
      confirmButtonText: "Yes Delete",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then(result => {
      const { isConfirmed } = result
      if (isConfirmed) {
        deleteTxn(txnId)
      }
    })

  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Transaction : </h1><br />


      <div>
        <span style={{ fontSize: "20px" }}> Search : <input style={{ fontSize: "15px" }} type="text" value={search} onChange={e => setSearch(e.target.value)} /></span>

        <span style={{ fontSize: "20px" }}>
          Date Start :
          <input type="date"
            style={{ fontSize: "15px" }}
            value={dateFilter.startDate}
            onChange={e =>
              setDateFilter({ ...dateFilter, startDate: e.target.value })}
          />
        </span>

        <span style={{ fontSize: "20px" }}>
          Date End :
          <input type="date"
            style={{ fontSize: "15px" }}
            value={dateFilter.endDate}
            onChange={e =>
              setDateFilter({ ...dateFilter, endDate: e.target.value })}
          />
        </span>

        <button className='link'><Link to={'/add-transaction'} style={{ textDecoration: 'none' }}>Add Transaction</Link></button>
        <Logout />
      </div>


      {isLoading ? <Skeleton rows={perPage} cols={5} /> : (<table width={'100%'} border={'1'}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {transaction?.data?.length && transaction?.data?.map(txn => (
            <tr>
              <td>{formateDate(txn.createdAt)}</td>
              <td>{txn.amount}</td>
              <td>{txn.transactionType}</td>
              <td>{txn.remark}</td>
              <td>
                <Link to={`/update-transaction/${txn._id}?amount=${txn.amount}&type=${txn.transactionType}&remark=${txn.remark}`}><FaRegEdit /></Link>

                <button onClick={() => handleDelete(txn._id)}><MdOutlineDelete /></button>
              </td>
            </tr>
          ))}

        </tbody>

        {/* {transaction?.data?.length == null && (<tbody>
          <tr>
            <td colSpan={5}>No Data Found</td>
          </tr>
        </tbody>)} */}

      </table>)}

      <span className='show-span'>Show Records per page :
        <select value={perPage} onChange={e => {
          setCurrentPage(1)
          setPerPage(e.target.value)
        }}>
          <option>05</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
      </span>

      <span>
        {Array(transaction?.totalPage).fill().map((_, i) => {
          return (<button onClick={() => setCurrentPage(i + 1)} disabled={currentPage == i + 1}>{i + 1}</button>)
        })}
      </span>

      <div className='summary-footer'>
        <span>Total Income : {transaction?.totalIncome}</span>
        <span>Total Expense : {transaction?.totalExpense}</span>
        <span>Balance {transaction?.totalBalance}</span>
      </div>

    </>
  )
}

export default Transaction



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import config from '../Config/Config';
// import formateDate from '../Config/Date';
// import Skeleton from '../Components/Skeleton';
// import { Link } from 'react-router-dom';
// import Logout from '../Components/Logout';
// import { FaRegEdit } from "react-icons/fa";
// import { MdOutlineDelete } from "react-icons/md";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import toasts from '../Config/Toast';

// const Transaction = () => {
//   const [transaction, setTransaction] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const MySwal = withReactContent(Swal);

//   const [dateFilter, setDateFilter] = useState({
//     "dateFilterKey": "createdAt",
//     "startDate": "",
//     "endDate": ""
//   });

//   const getTransaction = () => {
//     setIsLoading(true);
//     axios.post(`${config.baseUrl}/transaction/app`, {
//       "limit": perPage,
//       "searchValue": search,
//       "params": ["remark", "transactionType"],
//       "page": currentPage,
//       "filterBy": [],
//       "dateFilter": dateFilter,
//       "orderBy": "createdAt",
//       "orderByValue": -1,
//       "isPaginationRequired": true
//     }, { headers: config.getHeaders() })
//       .then(res => setTransaction(res.data))
//       .catch(err => toasts.errorMsg(err))
//       .finally(() => setIsLoading(false));
//   };

//   useEffect(() => {
//     getTransaction();
//   }, [perPage, currentPage, search, dateFilter]);

//   const deleteTxn = (txnId) => {
//     axios.delete(`${config.baseUrl}/transaction/app/${txnId}`, { headers: config.getHeaders() })
//       .then(res => {
//         toasts.successMsg(res.data.message);
//         getTransaction();
//       })
//       .catch(err => toasts.errorMsg(err));
//   };

//   const handleDelete = (txnId) => {
//     MySwal.fire({
//       title: "Do you really want to delete?",
//       text: "This action cannot be undone.",
//       icon: "question",
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "No",
//       showCancelButton: true,
//     }).then(result => {
//       if (result.isConfirmed) deleteTxn(txnId);
//     });
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Transaction List</h1>

//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
//         <div className="flex items-center space-x-4">
//           <label className="text-lg">Search:</label>
//           <input 
//             type="text" 
//             value={search} 
//             onChange={e => setSearch(e.target.value)} 
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <label className="text-lg">Start Date:</label>
//           <input 
//             type="date" 
//             value={dateFilter.startDate} 
//             onChange={e => setDateFilter({ ...dateFilter, startDate: e.target.value })} 
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           />
//           <label className="text-lg">End Date:</label>
//           <input 
//             type="date" 
//             value={dateFilter.endDate} 
//             onChange={e => setDateFilter({ ...dateFilter, endDate: e.target.value })} 
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <Link to="/add-transaction" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//           Add Transaction
//         </Link>
//         <Logout />
//       </div>

//       {isLoading ? (
//         <Skeleton rows={perPage} cols={5} />
//       ) : (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">Date</th>
//               <th className="p-2 text-left">Amount</th>
//               <th className="p-2 text-left">Type</th>
//               <th className="p-2 text-left">Remark</th>
//               <th className="p-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transaction?.data?.map(txn => (
//               <tr key={txn._id} className="border-t border-gray-200">
//                 <td className="p-2">{formateDate(txn.createdAt)}</td>
//                 <td className="p-2">{txn.amount}</td>
//                 <td className="p-2">{txn.transactionType}</td>
//                 <td className="p-2">{txn.remark}</td>
//                 <td className="p-2 flex items-center space-x-2">
//                   <Link to={`/update-transaction/${txn._id}`} className="text-blue-500 hover:text-blue-700">
//                     <FaRegEdit />
//                   </Link>
//                   <button onClick={() => handleDelete(txn._id)} className="text-red-500 hover:text-red-700">
//                     <MdOutlineDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex justify-between items-center mt-4">
//         <span className="text-lg">Show Records per page:</span>
//         <select 
//           value={perPage} 
//           onChange={e => { setCurrentPage(1); setPerPage(e.target.value); }} 
//           className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>

//         <div className="flex space-x-2">
//           {Array(transaction?.totalPage).fill().map((_, i) => (
//             <button 
//               key={i} 
//               onClick={() => setCurrentPage(i + 1)} 
//               disabled={currentPage === i + 1}
//               className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-6 text-lg">
//         <p>Total Income: {transaction?.totalIncome}</p>
//         <p>Total Expense: {transaction?.totalExpense}</p>
//         <p>Balance: {transaction?.totalBalance}</p>
//       </div>
//     </div>
//   );
// };

// export default Transaction;


