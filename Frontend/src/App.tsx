import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Mainlayout from './Layout/Mainlayout'
import Dashboard from './Pages/Dashboard'
import Applicants from './Pages/Applicants'




const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    children: [
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path: "/Applicants",
        element : <Applicants/>

      }
    ]
  }
])

function App() {
  
  return (
    <>
    <main>
    <RouterProvider router={appRouter}/>
    </main>

     <ToastContainer
        position="top-right"
        autoClose={3000}      // 3 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    
  
    </>
  )
}

export default App
