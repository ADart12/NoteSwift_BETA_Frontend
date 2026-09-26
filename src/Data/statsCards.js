import {
  Users,
  UserCheck,
  CalendarDays,
  UserX,

  CircleCheckBig,
  Clock3,
  CircleX,
  CalendarCheck,
  Timer
} from "lucide-react";

export const getDashboardStats = (summary) => [
  {
    title: "Total Employees",
    value: summary?.totalEmployees ?? 0,
    subtitle: "Active employees",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-200",
    valueColor: "text-blue-600",
    subColor: "text-gray-500",
  },
  {
    title: "Present Today",
    value: summary?.presentToday ?? 0,
    subtitle: `${summary?.attendancePercentage ?? 0}% attendance today`,
    icon: UserCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-200",
    valueColor: "text-green-600",
    subColor: "text-green-600",
  },
  {
    title: "On Leave",
    value: summary?.onLeave ?? 0,
    subtitle: "Approved leave today",
    icon: CalendarDays,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    border: "border-orange-200",
    valueColor: "text-orange-500",
    subColor: "text-gray-500",
  },
  {
    title: "Absent Today",
    value: summary?.absentToday ?? 0,
    subtitle: "Not checked in today",
    icon: UserX,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    border: "border-red-200",
    valueColor: "text-red-500",
    subColor: "text-gray-500",
  },
];


export const getLeaveStats = (summary) => [
  {
    title: "Total Requests",
    value: summary?.total || 0,
    subtitle: "All leave requests",
    icon: CalendarDays,
    border: "border-blue-200",
    valueColor: "text-blue-600",
    subColor: "text-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  {
    title: "Approved",
    value: summary?.approved || 0,
    subtitle: "Approved requests",
    icon: CircleCheckBig,
    border: "border-green-200",
    valueColor: "text-green-600",
    subColor: "text-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },

  {
    title: "Pending",
    value: summary?.pending || 0,
    subtitle: "Waiting for approval",
    icon: Clock3,
    border: "border-orange-200",
    valueColor: "text-orange-600",
    subColor: "text-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },

  {
    title: "Rejected",
    value: summary?.rejected || 0,
    subtitle: "Rejected requests",
    icon: CircleX,
    border: "border-red-200",
    valueColor: "text-red-600",
    subColor: "text-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];


export const getAttendanceStats = (summary) => [
  {
    title: "Present",
    value: summary?.present ?? 0,
    subtitle: "Days present",
    icon: CircleCheckBig,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-gray-200",
    valueColor: "text-slate-900",
    subColor: "text-slate-400",
  },

  {
    title: "Absent",
    value: summary?.absent ?? 0,
    subtitle: "Days absent",
    icon: CircleX,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-gray-200",
    valueColor: "text-slate-900",
    subColor: "text-slate-400",
  },

  {
    title: "Late",
    value: summary?.late ?? 0,
    subtitle: "Days late",
    icon: Clock3,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-gray-200",
    valueColor: "text-slate-900",
    subColor: "text-slate-400",
  },

  {
    title: "Working Days",
    value: summary?.workingDays ?? 0,
    subtitle: "Total working days",
    icon: CalendarDays,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-gray-200",
    valueColor: "text-slate-900",
    subColor: "text-slate-400",
  },
];


export const employeeStats = (data = {}) => [
  {
    title: "Today's Status",
    value: data.todayStatus ?? "Present",
    subtitle: data.checkIn
      ? `Checked in at ${data.checkIn}`
      : "Not checked in",

    icon: CalendarCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-100",
    valueColor: "text-green-600",
    subColor: "text-gray-500",
  },

  {
    title: "Working Hours",
    value: data.workingHours ?? "0h 0m",
    subtitle: "as of now",

    icon: Clock3,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "border-purple-100",
    valueColor: "text-purple-600",
    subColor: "text-gray-500",
  },

  {
    title: "Late Today",
    value: data.lateMinutes != null
      ? `${data.lateMinutes} mins`
      : "0 mins",
    subtitle: data.officeStartTime
      ? `Office time: ${data.officeStartTime}`
      : "Office time",

    icon: Timer,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    border: "border-orange-100",
    valueColor: "text-orange-500",
    subColor: "text-gray-500",
  },

  {
    title: "This Month",
    value: data.monthlyPresent
      ? `${data.monthlyPresent} / ${data.workingDays}`
      : "0 / 0",
    subtitle: "Days Present",

    icon: CalendarDays,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    valueColor: "text-blue-600",
    subColor: "text-gray-500",
  },
];