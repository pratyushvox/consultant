import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
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
    
  
    </>
  )
}

export default App
