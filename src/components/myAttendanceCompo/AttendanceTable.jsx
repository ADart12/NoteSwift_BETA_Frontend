import { useState } from "react";
import AttendanceRow from "./AttendenceRow";
import { X } from "lucide-react";

const AttendanceTable = ({ attendance = [] }) => {
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const getStatusStyle = (status) => {
    if (status === "Present") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Absent") {
      return "bg-red-50 text-red-600";
    }

    if (status === "Late") {
      return "bg-yellow-50 text-yellow-600";
    }

    return "bg-gray-50 text-gray-600";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your daily attendance records with webcam photos and geo-location tags
            </p>
          </div>

          <span className="text-sm text-gray-400">
            {attendance.length} records
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                Date
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                Check In
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                Check Out
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                Working Hours
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attendance.length > 0 ? (
              attendance.map((record) => (
                <AttendanceRow
                  key={record._id}
                  record={record}
                  getStatusStyle={getStatusStyle}
                  onPhotoClick={(photoUrl, title) => setPreviewPhoto({ photoUrl, title })}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No attendance records found
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Snapshot Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-bold text-gray-800 text-sm">{previewPhoto.title}</h4>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 bg-slate-900">
              <img
                src={previewPhoto.photoUrl}
                alt="Webcam snapshot"
                className="w-full h-auto rounded-xl object-contain max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
