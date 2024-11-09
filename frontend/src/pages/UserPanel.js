import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHistory,
  faEdit,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

// Import your components
import EditProfile from "../components/EditProfile";
import HistoryOrder from "../components/HistoryOrder";
import ChangePassword from "../components/ChangePassword";

import "./UserPanel.css";
const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // State to track active component (default to 'profile')
  const [activeComponent, setActiveComponent] = useState("profile");

  // State to manage edit profile modal

  // Update this effect to ensure correct access control
  useEffect(() => {
    if (user?.role !== ROLE.GENERAL) {
      navigate("/");
    }
  }, [user, navigate]);

  // Function to render the active component

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "editProfile":
        return <EditProfile userData={user} />;
      case "historyOrder":
        return <HistoryOrder userId={user?._id} />;
      case "change-password":
        return <ChangePassword userData={user} />;
      default:
        return (
          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Bio Graph</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b pb-6">
        <div>
          <p className="text-lg font-semibold text-gray-600">Full Name:</p>
          <p className="text-xl text-gray-800">{user?.name || "No name available"}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Email:</p>
          <p className="text-xl text-gray-800">{user?.email || "No email available"}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Country:</p>
          <p className="text-xl text-gray-800">VIET NAM</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Joined On:</p>
          <p className="text-xl text-gray-800">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No date available"}
          </p>
        </div>
      </div>
    </div>
        );
    }
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round">
              <a href="#">
                <img
                  src={user?.profilePic || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
              </a>
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
            </div>

            <div className="row">
              <div className="w-full">
                <div className="list-group" id="list-tab" role="tablist">
                  <a
                    className={`list-group-item list-group-item-action ${
                      activeComponent === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("profile")}
                    role="tabpanel"
                    aria-controls="list-profile"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Profile
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${
                      activeComponent === "historyOrder" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("historyOrder")}
                    role="tabpanel"
                    aria-controls="list-history"
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    History Order
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${
                      activeComponent === "editProfile" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("editProfile")}
                    role="tabpanel"
                    aria-controls="list-edit"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Edit Profile
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${
                      activeComponent === "change-password" ? "active" : ""
                    }`}
                    onClick={() => setActiveComponent("change-password")}
                    role="tabpanel"
                    aria-controls="list-change"
                  >
                    <FontAwesomeIcon
                      icon={faCog}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Change Password
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 mt-5">
          <div className="">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
