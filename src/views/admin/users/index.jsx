import React, { useState } from "react";
import useAdminUsers from "@/hooks/useAdminUsers";
import firebaseInstance from "@/services/firebase";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { displayActionMessage } from '@/helpers/utils';

const Users = () => {
  const { users, isLoading, error } = useAdminUsers();
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <>
      <div className="loader">
        <h2>Users</h2>
      </div>
      <div className="all_orders">
        <table width={"100%"}>
          <thead>
            <tr className="text-center">
              <th>User Name</th>
              <th>User email</th>
              <th>User Contact</th>
              <th>User Role</th>
              <th>Modify User</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ?
            (
              <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
              {isLoading ? <div class="order_loader"></div> :  "No Users found"}
              </td>
            </tr>
            ) :
            (
              currentUsers.map((user) => (
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
                        <button  className="btn btn-primary" onClick={() => setEditUserId(user.id)}>
                          <EditFilled />
                        </button>
                        <button className="btn btn-danger ms-1"  onClick={() => handleDeleteUser(user.id)}>
                          <DeleteFilled />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )
           }
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              padding: "5px 10px",
              margin: "5px"
            }}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              padding: "5px 10px",
              margin: "5px"
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
