import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// =========================
// AUTH
// =========================
import Login from "../pages/auth/Login";
import RegisterInvitation from "../pages/auth/Register";

// =========================
// LAYOUT
// =========================
import DashboardLayout from "../components/common/DashboardLayout";

// =========================
// DASHBOARD
// =========================
import Dashboard from "../pages/dashboard/Dashboard";

// =========================
// EMPLOYEE
// =========================
import Employees from "../pages/employee/Employees";
import InviteEmployee from "../pages/employee/InviteEmployee";
import Profile from "../pages/employee/Profile";

// =========================
// ATTENDANCE
// =========================
import Attendance from "../pages/Attendance/Attendance";
import MyAttendance from "../pages/Attendance/MyAttendance";

// =========================
// LEAVE
// =========================
import Leaves from "../pages/leave/Leaves";
import LeaveRequest from "../pages/leave/LeaveRequest";

// =========================
// PAYROLL
// =========================
import Payroll from "../pages/payroll/Payroll";

// =========================
// DEPARTMENTS
// =========================
import Departments from "../pages/department/Departments";

// =========================
// SETTINGS
// =========================
import Settings from "../pages/settings/Settings";

// =========================
// FINANCE
// =========================
import BudgetPage from "../pages/finance/BudgetPage";
import ExpensesPage from "../pages/finance/ExpensesPage";
import InvoicesPage from "../pages/finance/InvoicesPage";

// =====================================================
// SMART EMPLOYEES WRAPPER (auto-detects dept context)
// =====================================================

/**
 * When an admin/CEO visits /employees they see ALL employees.
 * When a tech manager visits /employees (Engineering Team), only Technology is shown.
 */
const EmployeesWithDeptContext = () => {
  const { user } = useAuth();
  const role = (user?.role || "").toLowerCase();

  // Admins and CEOs see everyone
  if (role === "admin" || role === "super_admin" || role === "ceo") {
    return <Employees />;
  }

  // Tech manager → Engineering Team view (Technology only)
  const deptName = (user?.department?.name || "").trim().toLowerCase();
  const deptCode = (user?.department?.code || "").trim().toLowerCase();
  if (
    deptName === "technology" ||
    deptName === "software development" ||
    deptCode === "tech" ||
    deptCode === "sd"
  ) {
    return <Employees departmentFilter="Technology" />;
  }

  // Any other manager hitting /employees → all employees
  return <Employees />;
};

// =====================================================
// PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// =====================================================
// ROLE ROUTE (Hierarchical RBAC)
// =====================================================

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || "").toLowerCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

  // Super Admin, CEO, Admin possess universal managerial and staff access
  if (role === "admin" || role === "super_admin" || role === "ceo") {
    return children;
  }

  if (normalizedAllowed.includes(role)) {
    return children;
  }

  // C-Level officers possess manager-level access
  if (role === "c_level" && normalizedAllowed.includes("manager")) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

// =====================================================
// DEPARTMENT ROUTE (Hierarchical & Aliased ABAC)
// =====================================================

const DepartmentRoute = ({ department, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || "").toLowerCase();

  // Super Admin, CEO, Admin have access to all department views
  if (role === "admin" || role === "super_admin" || role === "ceo") {
    return children;
  }

  if (role !== "manager" && role !== "c_level") {
    return <Navigate to="/dashboard" replace />;
  }

  const departmentName = user.department?.name?.trim().toLowerCase();
  const departmentCode = user.department?.code?.trim().toLowerCase();
  const target = department.toLowerCase();

  if (
    departmentName === target ||
    departmentCode === target ||
    (target === "human resources" && (departmentCode === "hr" || departmentName === "hr")) ||
    (target === "finance" && (departmentCode === "fin" || departmentName === "finance")) ||
    (target === "academic" && (departmentCode === "acad" || departmentCode === "ada" || departmentName === "academics")) ||
    (target === "technology" && (departmentCode === "tech" || departmentCode === "sd" || departmentName === "technology")) ||
    (target === "operations" && (departmentCode === "ops" || departmentName === "operations")) ||
    (target === "sales" && (departmentCode === "sal" || departmentName === "sales")) ||
    (target === "marketing" && (departmentCode === "mkt" || departmentName === "marketing"))
  ) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

// =====================================================
// APP ROUTES
// =====================================================

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={<RegisterInvitation />}
      />

      {/* =================================================
          PROTECTED ROUTES
      ================================================= */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* =========================
            COMMON DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route
          path="/employees"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <EmployeesWithDeptContext />
            </RoleRoute>
          }
        />

        <Route
          path="/invite-employee"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <InviteEmployee />
            </RoleRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <Attendance />
            </RoleRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <Leaves />
            </RoleRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <Payroll />
            </RoleRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <Departments />
            </RoleRoute>
          }
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* =========================
            NORMAL EMPLOYEE
        ========================= */}

        <Route
          path="/my-attendance"
          element={
            <RoleRoute allowedRoles={["employee", "manager", "admin"]}>
              <MyAttendance />
            </RoleRoute>
          }
        />

        <Route
          path="/leave-request"
          element={
            <RoleRoute allowedRoles={["employee", "manager", "admin"]}>
              <LeaveRequest />
            </RoleRoute>
          }
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =================================================
            HR MANAGER
        ================================================= */}

        <Route
          path="/hr/employees"
          element={
            <DepartmentRoute department="Human Resources">
              <Employees departmentFilter="Human Resources" />
            </DepartmentRoute>
          }
        />

        <Route
          path="/hr/invite-employee"
          element={
            <DepartmentRoute department="Human Resources">
              <InviteEmployee />
            </DepartmentRoute>
          }
        />

        <Route
          path="/hr/attendance"
          element={
            <DepartmentRoute department="Human Resources">
              <Attendance />
            </DepartmentRoute>
          }
        />

        <Route
          path="/hr/leaves"
          element={
            <DepartmentRoute department="Human Resources">
              <Leaves />
            </DepartmentRoute>
          }
        />

        <Route
          path="/hr/payroll"
          element={
            <DepartmentRoute department="Human Resources">
              <Payroll />
            </DepartmentRoute>
          }
        />

        <Route
          path="/hr/departments"
          element={
            <DepartmentRoute department="Human Resources">
              <Departments />
            </DepartmentRoute>
          }
        />

        {/* =================================================
            FINANCE MANAGER
        ================================================= */}

        <Route
          path="/finance/attendance"
          element={
            <DepartmentRoute department="Finance">
              <Attendance />
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/employees"
          element={
            <DepartmentRoute department="Finance">
              <Employees departmentFilter="Finance" />
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/transactions"
          element={
            <DepartmentRoute department="Finance">
              <div className="p-6">Finance Transactions</div>
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/budget"
          element={
            <DepartmentRoute department="Finance">
              <BudgetPage />
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/expenses"
          element={
            <DepartmentRoute department="Finance">
              <ExpensesPage />
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/invoices"
          element={
            <DepartmentRoute department="Finance">
              <InvoicesPage />
            </DepartmentRoute>
          }
        />

        <Route
          path="/finance/reports"
          element={
            <DepartmentRoute department="Finance">
              <div className="p-6">Finance Reports</div>
            </DepartmentRoute>
          }
        />

        {/* =================================================
            ACADEMIC MANAGER
        ================================================= */}

        <Route
          path="/academic"
          element={
            <DepartmentRoute department="Academic">
              <div className="p-6">Academic Management</div>
            </DepartmentRoute>
          }
        />

        <Route
          path="/academic/attendance"
          element={
            <DepartmentRoute department="Academic">
              <Attendance />
            </DepartmentRoute>
          }
        />

        <Route
          path="/academic/performance"
          element={
            <DepartmentRoute department="Academic">
              <div className="p-6">Academic Performance</div>
            </DepartmentRoute>
          }
        />

        <Route
          path="/academic/faculty"
          element={
            <DepartmentRoute department="Academic">
              <Employees departmentFilter="Academic" />
            </DepartmentRoute>
          }
        />

        <Route
          path="/academic/reports"
          element={
            <DepartmentRoute department="Academic">
              <div className="p-6">Academic Reports</div>
            </DepartmentRoute>
          }
        />
      </Route>

      {/* =================================================
          FALLBACK
      ================================================= */}

      <Route
        path="*"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
