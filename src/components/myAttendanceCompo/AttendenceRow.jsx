import { MapPin } from "lucide-react";

const AttendanceRow = ({ record, getStatusStyle, onPhotoClick }) => {
  const hasCheckInLocation =
    record.checkInLocation?.latitude != null &&
    record.checkInLocation?.longitude != null;

  const hasCheckOutLocation =
    record.checkOutLocation?.latitude != null &&
    record.checkOutLocation?.longitude != null;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-4 text-sm font-medium text-gray-700">
        {record.dateBS || (record.dateAD ? new Date(record.dateAD).toLocaleDateString() : "--")}
      </td>

      {/* Check In */}
      <td className="px-5 py-4 text-sm text-gray-600 font-mono">
        <div className="flex items-center gap-2">
          <span>{record.checkIn || "--"}</span>
          {record.checkInPhoto && (
            <button
              type="button"
              onClick={() => onPhotoClick && onPhotoClick(record.checkInPhoto, "Check-In Snapshot")}
              className="p-0.5 rounded border border-emerald-200 hover:border-emerald-400 transition"
              title="View Check-In Webcam Photo"
            >
              <img
                src={record.checkInPhoto}
                alt="Check-in"
                className="w-6 h-6 rounded object-cover"
              />
            </button>
          )}
          {hasCheckInLocation && (
            <a
              href={`https://www.google.com/maps?q=${record.checkInLocation.latitude},${record.checkInLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-800"
              title={`GPS: ${record.checkInLocation.latitude}, ${record.checkInLocation.longitude}`}
            >
              <MapPin size={14} />
            </a>
          )}
        </div>
      </td>

      {/* Check Out */}
      <td className="px-5 py-4 text-sm text-gray-600 font-mono">
        <div className="flex items-center gap-2">
          <span>{record.checkOut || "--"}</span>
          {record.checkOutPhoto && (
            <button
              type="button"
              onClick={() => onPhotoClick && onPhotoClick(record.checkOutPhoto, "Check-Out Snapshot")}
              className="p-0.5 rounded border border-blue-200 hover:border-blue-400 transition"
              title="View Check-Out Webcam Photo"
            >
              <img
                src={record.checkOutPhoto}
                alt="Check-out"
                className="w-6 h-6 rounded object-cover"
              />
            </button>
          )}
          {hasCheckOutLocation && (
            <a
              href={`https://www.google.com/maps?q=${record.checkOutLocation.latitude},${record.checkOutLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              title={`GPS: ${record.checkOutLocation.latitude}, ${record.checkOutLocation.longitude}`}
            >
              <MapPin size={14} />
            </a>
          )}
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-gray-600 font-mono">
        {record.workingHours ? `${record.workingHours} hrs` : "--"}
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
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
