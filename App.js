import React, { useState,useEffect } from 'react';
import './App.css'; // Import the CSS file

const UserDetailsPage = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { name, mobile, email };
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      const newUser = {
        name: name,
        mobile: mobile,
        email: email,
      };
      setUsers([...users, newUser]);
    }
    setShowPopup(false);
    setName('');
    setMobile('');
    setEmail('');
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setName(userToEdit.name);
    setMobile(userToEdit.mobile);
    setEmail(userToEdit.email);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div class="headerContainer">
      <h1 class="header">CRUD Operation</h1>
   </div>
      <div class="bodyContainer">
      <button  class="addUserButton"onClick={handleAddUser}>Add User</button>
      {showPopup && (
        <div class="userEntry">
        <div className="popup-container">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {editIndex !== null ? 'Update' : 'Submit'}
          </button>
        </div>
        </div>
        
      )}
      <div>
       </div>
        <table className="user-details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td class="buttonContainer">
                  <button  class="editButton"onClick={() => handleEditUser(index)}>Edit</button>
                  <button class="deleteButton" onClick={() => handleDeleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailsPage;
