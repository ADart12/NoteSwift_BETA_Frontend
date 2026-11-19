import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import { useAuth } from "../../context/AuthContext";
import { getOfficeSettings, updateOfficeSettings } from "../../services/settingsService";
import { Building, Clock, ShieldCheck, Save } from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "Noteswift Pvt. Ltd.",
    officeStartTime: "09:00",
    officeEndTime: "17:00",
    workingHours: 8,
    gracePeriod: 10,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getOfficeSettings();
        if (data?.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = await updateOfficeSettings(settings);
      toast.success(data?.message || "Settings updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      <Header
        title="System Settings"
        subtitle="Manage office work hours, grace periods and system preferences"
        titleClassName="text-4xl font-extrabold tracking-tight text-white"
        subtitleClassName="mt-2 text-base text-blue-100/90 font-normal"
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm">
          Loading settings...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <Clock className="text-blue-600" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Office Hours & Attendance Rules
                </h2>
                <p className="text-sm text-gray-500">
                  Configure working hours and late arrival policies
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName || ""}
                  onChange={handleChange}
                  disabled={!isAdmin}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Office Start Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Office Start Time
                  </label>
                  <input
                    type="time"
                    name="officeStartTime"
                    value={settings.officeStartTime || "09:00"}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Check-in expected time</p>
                </div>

                {/* Office End Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Office End Time
                  </label>
                  <input
                    type="time"
                    name="officeEndTime"
                    value={settings.officeEndTime || "17:00"}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Check-out expected time</p>
                </div>

                {/* Daily Working Hours */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Required Working Hours (per day)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    name="workingHours"
                    value={settings.workingHours ?? 8}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Grace Period (Minutes) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grace Period (Minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    name="gracePeriod"
                    value={settings.gracePeriod ?? 10}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Late status triggers after start time + grace period
                  </p>
                </div>
              </div>

              {isAdmin && (
                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition disabled:opacity-50"
                  >
                    <Save size={18} />
                    {saving ? "Saving Changes..." : "Save Office Settings"}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Side Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building className="text-blue-600" size={22} />
                <h3 className="font-bold text-gray-800">Organization Info</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="text-gray-700">Company:</strong> {settings.companyName}</p>
                <p><strong className="text-gray-700">Work Shift:</strong> {settings.officeStartTime} - {settings.officeEndTime}</p>
                <p><strong className="text-gray-700">Grace Margin:</strong> {settings.gracePeriod} mins</p>
                <p><strong className="text-gray-700">Standard Day:</strong> {settings.workingHours} hours</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-600" size={22} />
                <h3 className="font-bold text-gray-800">Access Level</h3>
              </div>
              <p className="text-sm text-gray-600">
                You are currently signed in as{" "}
                <span className="font-semibold text-blue-600 capitalize">
                  {user?.role}
                </span>.
                {!isAdmin && " Only System Administrators have permission to modify company work hours."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
