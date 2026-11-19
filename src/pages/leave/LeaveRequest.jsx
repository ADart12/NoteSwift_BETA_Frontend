import { useEffect, useState, useMemo, useCallback } from "react";
import LeaveRequestHeader from "../../components/leaveRequestCompo/LeaveRequestHeader";
import LeaveRequestStats from "../../components/leaveRequestCompo/LeaveRequestStats";
import LeaveRequestFilters from "../../components/leaveRequestCompo/LeaveRequestFilters";
import LeaveRequestTable from "../../components/leaveRequestCompo/LeaveRequestTable";
import LeaveRequestModal from "../../components/leaveRequestCompo/LeaveRequestModal";
import { applyForLeave, getMyLeaveRequest } from "../../services/leaveService";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "Casual",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const getLeaveRequest = useCallback(async () => {
    try {
      const data = await getMyLeaveRequest(currentPage);
      setLeaveRequests(data.leaves || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching my leave requests:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getLeaveRequest();
  }, [getLeaveRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fromDate || !formData.toDate || !formData.reason.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const data = await applyForLeave(formData);
      toast.success(data.message || "Leave request submitted successfully.");
      setShowModal(false);

      setFormData({
        leaveType: "Casual",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      await getLeaveRequest();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to submit leave request.");
    }
  };

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter((req) => {
      const matchSearch =
        search === "" ||
        req.leaveType?.toLowerCase().includes(search.toLowerCase()) ||
        req.reason?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "All" ||
        String(req.status).toLowerCase() === status.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [leaveRequests, search, status]);

  return (
    <div className="p-6 space-y-6">
      <LeaveRequestHeader onApplyLeave={() => setShowModal(true)} />

      <LeaveRequestStats leaveRequests={leaveRequests} />

      <LeaveRequestFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <LeaveRequestTable leaveRequests={filteredRequests} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      <LeaveRequestModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LeaveRequest;
