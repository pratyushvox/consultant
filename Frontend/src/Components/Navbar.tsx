import { Search, ChevronDown } from "lucide-react" 
import { Input } from "@/Components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { SidebarTrigger } from "@/Components/ui/sidebar";


const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-16 flex items-center justify-between border-b bg-background pl-3 ">

      {/* left part */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-emerald-500"></div>

        <div>
          <h1 className="text-xl">CloveCMS</h1>
        </div>

 
        <div>
          <SidebarTrigger aria-label="Toggle sidebar" />
        </div>
      </div>

      {/* central part */}
      <div className="flex-1">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="search applicants, contacts ,tasks..."
            className="pl-9"
          />
        </div>
      </div>

      {/* right part */}
      <div className="flex items-center gap-4 mr-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
            Oil and Associates
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Oli And Associates</DropdownMenuItem>
            <DropdownMenuItem>oli And Associates</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* user */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://img.freepik.com/free-photo/designer-working-3d-model_23-2149371896.jpg?semt=ais_hybrid&w=740&q=80" />
            <AvatarFallback>PK</AvatarFallback>
          </Avatar>

          <div className="text-sm">
            <p className="font-medium text-sm">Nischal chaudhary</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
