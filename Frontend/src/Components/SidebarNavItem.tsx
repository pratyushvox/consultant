import { NavLink } from "react-router-dom"
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/Components/ui/sidebar"

interface SidebarNavItemProps {
  to: string
  icon: React.ElementType
  label: string
}

const SidebarNavItem = ({ to, icon: Icon, label }: SidebarNavItemProps) => {
  return (
    <SidebarMenuItem>
      <NavLink to={to} end={to === "/"}>
        {({ isActive }) => (
          <SidebarMenuButton
            className={`gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-500/10 text-emerald-700 font-semibold"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  )
}

export default SidebarNavItem
