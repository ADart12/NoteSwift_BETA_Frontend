import React from "react";

const AttendanceRow = ({ record, getStatusStyle }) => {
  return (
    <tr
      key={record._id}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-5 py-4 text-sm font-medium text-gray-700">
        {record.dateBS}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {record.checkIn}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {record.checkOut}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {record.workingHours}
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
            record.status
          )}`}
        >
          {record.status}
        </span>
      </td>
    </tr>
  );
};

export default AttendanceRow;