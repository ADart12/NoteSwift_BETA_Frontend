import { useEffect, useState, useCallback } from "react";
import ProfileHeader from "../../components/profileCompo/ProfileHeader";
import PersonalInfo from "../../components/profileCompo/PersonalInfo";
import ProfessionalInfo from "../../components/profileCompo/ProfessionalInfo";
import ProfileInfo from "../../components/profileCompo/ProfileInfo";
import { Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getProfile, updateProfile } from "../../services/profileServices";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(user || {});

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      if (data?.user) {
        setProfile(data.user);
        setUser((prev) => ({ ...prev, ...data.user }));
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  }, [setUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile();
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const data = await updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        city: profile.city,
        country: profile.country,
      });

      if (data?.user) {
        setProfile(data.user);
        setUser((prev) => ({ ...prev, ...data.user }));
      }
      toast.success(data.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full min-w-0 bg-gray-100 p-4 sm:p-6 space-y-6">
      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
        onEdit={handleEdit}
      />

      {/* Profile Information */}
      <div className="space-y-6">
        <PersonalInfo
          profile={profile}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <ProfessionalInfo
          profile={profile}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <ProfileInfo
          profile={profile}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-6">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <X size={17} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition disabled:opacity-50"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
