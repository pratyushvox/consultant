import Navbar from "@/Components/Navbar"
import AppSidebar from "@/Components/AppSidebar"
import {
  SidebarProvider,
  SidebarInset,
} from "@/Components/ui/sidebar"
import {Outlet} from "react-router-dom"

const Mainlayout = () => {
  return (
    <SidebarProvider>
      
      <AppSidebar />

      
      <SidebarInset>
        <header>
          <Navbar />
        </header>

        <main className="p-4">
            <Outlet/>
         
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Mainlayout
