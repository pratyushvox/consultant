import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Mainlayout from './Layout/Mainlayout'
import Dashboard from './Pages/Dashboard'




const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    children: [
      {
        path:"/",
        element:<Dashboard/>
      },
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
