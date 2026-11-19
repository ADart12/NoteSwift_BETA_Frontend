import { useState, useEffect, useCallback } from "react";
import LeaveFilters from "../../components/leaveCompo/LeaveFilters";
import LeaveTable from "../../components/leaveCompo/LeaveTable";
import Pagination from "../../components/common/Pagination";
import Header from "../../components/common/Header";
import StatsCards from "../../components/common/StatsCards";
import { getLeaveStats } from "../../Data/statsCards";
import { approveLeave, getAllLeaves, getLeaveSummary, reject } from "../../services/leaveService";
import { getDepartments } from "../../services/invitationServices";
import toast from "react-hot-toast";

const Leaves = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [summary, setSummary] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search input to avoid unnecessary API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await getLeaveSummary();
      setSummary(data.summary);
    } catch (error) {
      console.error("Failed to fetch leave summary:", error);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await getDepartments();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  }, []);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllLeaves({
        search: debouncedSearch,
        department,
        leaveType,
        status,
        page: currentPage,
        limit: 10,
      });

      if (data.totalPages !== undefined) {
        setLeaves(data.leaves ?? []);
        setTotalPages(data.totalPages || 1);
        setTotalLeaves(data.totalLeaves || (data.leaves?.length ?? 0));
      } else {
        // Fallback in case of raw unpaginated response
        const allLeaves = data.leaves ?? [];
        setTotalLeaves(allLeaves.length);
        const pages = Math.ceil(allLeaves.length / 10) || 1;
        setTotalPages(pages);
        const startIdx = (currentPage - 1) * 10;
        setLeaves(allLeaves.slice(startIdx, startIdx + 10));
      }
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, department, leaveType, status, currentPage]);

  useEffect(() => {
    fetchSummary();
    fetchDepartments();
  }, [fetchSummary, fetchDepartments]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const stats = getLeaveStats(summary);

  const handleApproveLeave = async (_id) => {
    try {
      const data = await approveLeave(_id);
      toast.success(data.message || "Leave approved successfully");
      await fetchLeaves();
      await fetchSummary();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve leave"
      );
    }
  };

  const handleRejectLeave = async (_id) => {
    try {
      const data = await reject(_id);
      toast.success(data.message || "Leave rejected successfully");
      await fetchLeaves();
      await fetchSummary();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject leave"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      <Header
        title="Leave Management"
        subtitle={`Manage employee leave requests (${totalLeaves} total)`}
        titleClassName="text-5xl font-extrabold tracking-tight text-white"
        subtitleClassName="mt-2 text-lg text-blue-100/90 font-normal"
        rightContent={
          <button
            onClick={() => {
              window.print();
            }}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Export
          </button>
        }
      />

      <StatsCards stats={stats} />

      <LeaveFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        departments={departments}
        setDepartments={setDepartments}
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        status={status}
        setStatus={setStatus}
        setCurrentPage={setCurrentPage}
      />

      <LeaveTable
        leaves={leaves}
        loading={loading}
        ApproveTheLeave={handleApproveLeave}
        rejectLeave={handleRejectLeave}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Leaves;
