import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './App/Config/Routes'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
      {/* <CounterComponent/> */}
 
    </>
  )

}

export default App
