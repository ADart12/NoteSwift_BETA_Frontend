import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Building2,
  BarChart3,
  Settings,
  User,
  Wallet,
  GraduationCap,
  ClipboardCheck,
  Trophy,
  UserRound,
  UserPlus,
  UserCheck,
  FolderKanban,
  CheckSquare,
  Package,
  Boxes,
  TrendingUp,
  Megaphone,
  CreditCard,
} from "lucide-react";

export const menus = {
  // =========================
  // ADMIN & EXECUTIVE (CEO / SUPER_ADMIN)
  // =========================
  admin: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Users,
      label: "Employees",
      path: "/employees",
    },
    {
      icon: UserPlus,
      label: "Add Employees",
      path: "/invite-employee",
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      path: "/attendance",
    },
    {
      icon: FileText,
      label: "Leaves",
      path: "/leaves",
    },
    {
      icon: Wallet,
      label: "Payroll",
      path: "/payroll",
    },
    {
      icon: Building2,
      label: "Departments",
      path: "/departments",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // FINANCE MANAGER (CFO)
  // =========================
  financeManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: CalendarDays,
      label: "Budgets",
      path: "/finance/budget",
    },
    {
      icon: CreditCard,
      label: "Expenses",
      path: "/finance/expenses",
    },
    {
      icon: FileText,
      label: "Invoices",
      path: "/finance/invoices",
    },
    {
      icon: Wallet,
      label: "Payroll",
      path: "/payroll",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/finance/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // ACADEMIC MANAGER (CAO)
  // =========================
  academicManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: GraduationCap,
      label: "Academic",
      path: "/academic",
    },
    {
      icon: Trophy,
      label: "Performance",
      path: "/academic/performance",
    },
    {
      icon: UserRound,
      label: "Faculty",
      path: "/academic/faculty",
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      path: "/academic/attendance",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/academic/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // HR MANAGER (CHRO)
  // =========================
  hrManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Users,
      label: "Employees",
      path: "/hr/employees",
    },
    {
      icon: UserPlus,
      label: "Add Employees",
      path: "/hr/invite-employee",
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      path: "/hr/attendance",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: FileText,
      label: "Leaves",
      path: "/hr/leaves",
    },
    {
      icon: Wallet,
      label: "Payroll",
      path: "/hr/payroll",
    },
    {
      icon: Building2,
      label: "Departments",
      path: "/hr/departments",
    },
    {
      icon: ClipboardCheck,
      label: "Performance",
      path: "/hr/performance",
    },
    {
      icon: UserCheck,
      label: "Recruitment",
      path: "/hr/recruitment",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/hr/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // TECHNOLOGY MANAGER (CTO)
  // =========================
  techManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: FolderKanban,
      label: "Projects & Sprints",
      path: "/engineering/projects",
    },
    {
      icon: CheckSquare,
      label: "Dev Tasks",
      path: "/engineering/tasks",
    },
    {
      icon: Users,
      label: "Engineering Team",
      path: "/employees",
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      path: "/attendance",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // OPERATIONS MANAGER (COO)
  // =========================
  opsManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Boxes,
      label: "Asset Inventory",
      path: "/operations/assets",
    },
    {
      icon: Package,
      label: "Vendors & Suppliers",
      path: "/operations/vendors",
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      path: "/attendance",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // SALES MANAGER (CCO)
  // =========================
  salesManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Users,
      label: "Clients & Accounts",
      path: "/commercial/clients",
    },
    {
      icon: TrendingUp,
      label: "Deals & Pipeline",
      path: "/commercial/deals",
    },
    {
      icon: FileText,
      label: "Sales Orders",
      path: "/commercial/orders",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // MARKETING MANAGER (CMO)
  // =========================
  marketingManager: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Megaphone,
      label: "Campaigns",
      path: "/marketing/campaigns",
    },
    {
      icon: Users,
      label: "Inbound Leads",
      path: "/marketing/leads",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],

  // =========================
  // NORMAL EMPLOYEE / STAFF
  // =========================
  employee: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: CalendarDays,
      label: "My Attendance",
      path: "/my-attendance",
    },
    {
      icon: FileText,
      label: "Leave Request",
      path: "/leave-request",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ],
};

// =====================================================
// GET MENU BASED ON USER ROLE & DEPARTMENT
// =====================================================

export const getMenu = (user) => {
  if (!user) {
    return [];
  }

  const role = (user.role || "").toLowerCase();

  // =========================
  // SUPER ADMIN, CEO & GLOBAL ADMIN
  // =========================
  if (role === "admin" || role === "super_admin" || role === "ceo") {
    return menus.admin;
  }

  // =========================
  // MANAGERS & C-LEVEL OFFICERS
  // =========================
  if (role === "manager" || role === "c_level") {
    const departmentName = (user.department?.name || "").trim().toLowerCase();
    const departmentCode = (user.department?.code || "").trim().toLowerCase();

    if (departmentName === "finance" || departmentCode === "fin") {
      return menus.financeManager;
    }

    if (
      departmentName === "academics" ||
      departmentName === "academic" ||
      departmentCode === "acad" ||
      departmentCode === "ada"
    ) {
      return menus.academicManager;
    }

    if (
      departmentName === "human resources" ||
      departmentName === "hr" ||
      departmentCode === "hr"
    ) {
      return menus.hrManager;
    }

    if (
      departmentName === "technology" ||
      departmentName === "software development" ||
      departmentCode === "tech" ||
      departmentCode === "sd"
    ) {
      return menus.techManager;
    }

    if (departmentName === "operations" || departmentCode === "ops") {
      return menus.opsManager;
    }

    if (departmentName === "sales" || departmentCode === "sal") {
      return menus.salesManager;
    }

    if (departmentName === "marketing" || departmentCode === "mkt") {
      return menus.marketingManager;
    }

    // Default fallback for any unlisted managerial department
    return menus.admin;
  }

  // =========================
  // NORMAL EMPLOYEE / INDIVIDUAL CONTRIBUTOR
  // =========================
  return menus.employee;
};
