import React, { useState } from "react";
import useAdminUsers from "@/hooks/useAdminUsers";
import firebaseInstance from "@/services/firebase";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { displayActionMessage } from '@/helpers/utils';

const Users = () => {
  const { users, isLoading, error } = useAdminUsers();
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleEditUserRole = async (userId) => {
    if (newRole) {
      try {
        await firebaseInstance.updateUserRole(userId, newRole);
        displayActionMessage("User role updated successfully");
        setEditUserId(null); // Close the edit input
        setNewRole(""); // Clear the input field
      } catch (err) {
        console.error(err);
        displayActionMessage("Failed to update user role");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await firebaseInstance.deleteAdminUser(userId);
        displayActionMessage("User deleted successfully");
      } catch (err) {
        console.error(err);
        displayActionMessage("Failed to delete user");
      }
    }
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <>
      <div className="loader">
        <h2>Users</h2>
      </div>
      <div className="all_orders">
        <table width={"100%"}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User email</th>
              <th>User Contact</th>
              <th>User Role</th>
              <th>Modify User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile.value ? user.mobile.value : "not added yet"}</td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={newRole}
                      placeholder={user.role}
                      onChange={(e) => setNewRole(e.target.value)}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <>
                      <button onClick={() => handleEditUserRole(user.id)}>
                        Save
                      </button>
                      <button onClick={() => setEditUserId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditUserId(user.id)}>
                        <EditFilled />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        <DeleteFilled />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
