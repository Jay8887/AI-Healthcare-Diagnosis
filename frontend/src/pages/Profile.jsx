import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Heart,
  Edit,
  Save,
  X,
  Camera,
  MapPin,
  Activity,
} from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [user, setUser] = useState({
  name: "",
  email: "",
  role: "",
  phone: "",
  age: "",
  gender: "",
  bloodGroup: "",
  height: "",
  weight: "",
  address: "",
  allergies: "",
  emergencyContact: "",
  medicalHistory: "",
  memberSince: "",
  status: "Active",
});

useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    setUser(response.data);
  })
  .catch((error) => {
    console.error("Error loading profile:", error);
  });
}, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    setProfileImage(URL.createObjectURL(file));
  }
};

const saveProfile = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:8080/api/user/update",
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile Updated Successfully!");
    setIsEditing(false);

  } catch (error) {

    console.error(error);
    alert("Failed to update profile");

  }
};
 

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white">

          <div className="flex flex-col lg:flex-row items-center gap-8">

            {/* Avatar */}

<div className="relative">

  <div className="w-36 h-36 rounded-full overflow-hidden bg-white shadow-lg">

    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-blue-700">
        {user.name.charAt(0)}
      </div>
    )}

  </div>

  {isEditing && (
    <label className="absolute bottom-0 right-0 cursor-pointer bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">

      <Camera size={18} />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

    </label>
  )}

</div>

            {/* User Details */}

            <div className="flex-1 text-center lg:text-left">

              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <p className="text-lg mt-2">
                {user.email}
              </p>

              <span className="inline-block mt-4 bg-white text-blue-700 px-5 py-2 rounded-full font-semibold">
                {user.role}
              </span>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 flex-wrap">

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={saveProfile}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                  >
                    <Save size={18} />
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>

        </div>        
        {/* Personal Information */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="text-blue-600" />
              Personal Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

            </div>

          </div>

          {/* Health Information */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="text-red-500" />
              Health Information
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Blood Group
                </label>

                <input
                  type="text"
                  name="bloodGroup"
                  value={user.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Height
                </label>

                <input
                  type="text"
                  name="height"
                  value={user.height}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Weight
                </label>

                <input
                  type="text"
                  name="weight"
                  value={user.weight}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Allergies
                </label>

                <input
                  type="text"
                  name="allergies"
                  value={user.allergies}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

            </div>

          </div>

        </div>        {/* Health Summary */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Activity className="mx-auto text-blue-600 mb-3" size={35} />
            <h3 className="text-gray-500">Total Predictions</h3>
            <p className="text-3xl font-bold text-blue-600">152</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Heart className="mx-auto text-red-500 mb-3" size={35} />
            <h3 className="text-gray-500">Health Score</h3>
            <p className="text-3xl font-bold text-green-600">92%</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Shield className="mx-auto text-green-600 mb-3" size={35} />
            <h3 className="text-gray-500">Risk Level</h3>
            <p className="text-3xl font-bold text-yellow-500">Low</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Calendar className="mx-auto text-purple-600 mb-3" size={35} />
            <h3 className="text-gray-500">Last Checkup</h3>
            <p className="text-xl font-bold">18 Jul 2026</p>
          </div>

        </div>

        {/* Account Information */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border rounded-xl p-5">
              <h4 className="text-gray-500">Role</h4>
              <p className="text-xl font-bold mt-2">{user.role}</p>
            </div>

            <div className="border rounded-xl p-5">
              <h4 className="text-gray-500">Member Since</h4>
              <p className="text-xl font-bold mt-2">
                {user.memberSince}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <h4 className="text-gray-500">Account Status</h4>

              <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                {user.status}
              </span>
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 text-center">

          <h2 className="text-xl font-bold text-blue-700">
            AI Healthcare Diagnosis System
          </h2>

          <p className="text-gray-600 mt-2">
            Secure • Intelligent • Fast
          </p>

          <p className="text-gray-500 mt-4">
            © 2026 Devdutt Tripathi | United Institute of Technology
          </p>

        </div>

      </div>
    </div>
  );
}
export default Profile;