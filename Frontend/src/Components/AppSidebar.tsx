import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive
                  className="gap-3 rounded-lg px-3 py-2 text-sm font-medium"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Applicants</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <CreditCard className="h-4 w-4" />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>Classes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <Contact className="h-4 w-4" />
                  <span>Contacts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Attendance</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <LogIn className="h-4 w-4" />
                  <span>Check-ins</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* MANAGEMENT */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 tracking-wide">
            MANAGEMENT
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {[
                [Briefcase, "Consultancies"],
                [UserCog, "Team"],
                [CheckSquare, "Tasks"],
                [Globe, "Countries"],
                [GraduationCap, "Teachers"],
                [GitBranch, "Workflow"],
                [Package, "Services"],
              ].map(([Icon, label], i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* OTHERS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 tracking-wide">
            OTHERS
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3 rounded-lg px-3 py-2 text-sm">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </ShadcnSidebar>
  )
}

export default AppSidebar
