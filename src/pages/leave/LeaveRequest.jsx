import LeaveRequestHeader from "../../components/leaveRequestCompo/LeaveRequestHeader";
import LeaveRequestStats from "../../components/leaveRequestCompo/LeaveRequestStats";
import LeaveRequestFilters from "../../components/leaveRequestCompo/LeaveRequestFilters";
import LeaveRequestTable from "../../components/leaveRequestCompo/LeaveRequestTable";
import LeaveRequestModal from "../../components/leaveRequestCompo/LeaveRequestModal";
import { applyForLeave, getMyLeaveRequest } from "../../services/leaveService";
import { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await applyForLeave(formData);

      console.log(data);

      setShowModal(false);

      setFormData({
        leaveType: "Casual Leave",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      getLeaveRequest();
    } catch (error) {
      console.log(error.message);
    }
  };


  const onApplyLeave = () => {
    setShowModal(true);
  };


  const getLeaveRequest = async () => {
    try {
      const data = await getMyLeaveRequest(currentPage);

      setLeaveRequests(data.leaves);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLeaveRequest();
  }, [currentPage]);

  return (
    <div className="p-6 space-y-6">

      <LeaveRequestHeader
        onApplyLeave={onApplyLeave}
      />

      <LeaveRequestStats
        leaveRequests={leaveRequests}
      />

      <LeaveRequestFilters

      />

      <LeaveRequestTable
        leaveRequests={leaveRequests}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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