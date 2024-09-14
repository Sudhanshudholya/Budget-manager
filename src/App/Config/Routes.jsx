// import { createBrowserRouter } from "react-router-dom";
// import Auth from "../Components/Auth";
// import WithoutLogin from "../Components/WithoutLogin";
// import Register from "../Screen/Register";
// import Login from "../Screen/Login";
// import Transaction from "../Screen/Transaction";
// import AddTransaction from "../Screen/AddTransaction";
// import UpdateTransaction from "../Screen/UpdateTransaction";


// const routes = createBrowserRouter([

//         {

//             path: '/',
//             children: [

//         {
//             path: '/login',
//             element:<WithoutLogin> <Login/></WithoutLogin>
//         },

//         {
//             path: '/register',
//             element: <WithoutLogin> <Register/></WithoutLogin>
//         },

//         {
//             path: '/transaction',
//             element: <Auth><Transaction/></Auth>
//         },

//         {
//             path : '/add-transaction',
//             element: <Auth><AddTransaction/></Auth>
//         },

//         {
//             path : '/update-transaction/:txnId',
//             element: <Auth><UpdateTransaction/></Auth>
//         }
//     ]
// }])

// export default routes



import { createBrowserRouter } from "react-router-dom";
import Auth from "../Components/Auth";
import WithoutLogin from "../Components/WithoutLogin";
import Register from "../Screen/Register";
import Login from "../Screen/Login";
import Transaction from "../Screen/Transaction";
import AddTransaction from "../Screen/AddTransaction";
import UpdateTransaction from "../Screen/UpdateTransaction";

const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: 'login', element: <WithoutLogin><Login /></WithoutLogin> },
      { path: 'register', element: <WithoutLogin><Register /></WithoutLogin> },
      { path: 'transaction', element: <Auth><Transaction /></Auth> },
      { path: 'add-transaction', element: <Auth><AddTransaction /></Auth> },
      { path: 'update-transaction/:txnId', element: <Auth><UpdateTransaction /></Auth> },
    ]
  }
]);

export default routes;
