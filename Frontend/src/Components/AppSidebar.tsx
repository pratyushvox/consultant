import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/Components/ui/sidebar"

import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  Contact,
  Clock,
  LogIn,
  Briefcase,
  UserCog,
  CheckSquare,
  Globe,
  GraduationCap,
  GitBranch,
  Package,
  Settings,
} from "lucide-react"

import SidebarNavItem from "./SidebarNavItem"

const AppSidebar = () => {
  return (
    <ShadcnSidebar className="bg-background border-r">
      <SidebarContent className="px-2 py-4">

        {/* OPERATIONS */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 tracking-wide">
            OPERATIONS
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarNavItem
                to="/"
                icon={LayoutDashboard}
                label="Dashboard"
              />

              <SidebarNavItem
                to="/applicants"
                icon={Users}
                label="Applicants"
              />

              <SidebarNavItem
                to="/payments"
                icon={CreditCard}
                label="Payments"
              />

              <SidebarNavItem
                to="/classes"
                icon={BookOpen}
                label="Classes"
              />

              <SidebarNavItem
                to="/contacts"
                icon={Contact}
                label="Contacts"
              />

              <SidebarNavItem
                to="/attendance"
                icon={Clock}
                label="Attendance"
              />

              <SidebarNavItem
                to="/check-ins"
                icon={LogIn}
                label="Check-ins"
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*  MANAGEMENT  */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 tracking-wide">
            MANAGEMENT
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarNavItem to="/consultancies" icon={Briefcase} label="Consultancies" />
              <SidebarNavItem to="/team" icon={UserCog} label="Team" />
              <SidebarNavItem to="/tasks" icon={CheckSquare} label="Tasks" />
              <SidebarNavItem to="/countries" icon={Globe} label="Countries" />
              <SidebarNavItem to="/teachers" icon={GraduationCap} label="Teachers" />
              <SidebarNavItem to="/workflow" icon={GitBranch} label="Workflow" />
              <SidebarNavItem to="/services" icon={Package} label="Services" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*  OTHERS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 tracking-wide">
            OTHERS
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarNavItem
                to="/settings"
                icon={Settings}
                label="Settings"
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </ShadcnSidebar>
  )
}

export default AppSidebar
