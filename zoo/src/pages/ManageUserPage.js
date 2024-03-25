//ManageUserPage

import React, { useEffect, useState } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';
import { Table, Button } from 'react-bootstrap';
import './Manageuserpage.css'

const ManageUsersPage = () => {
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [editUser, setEditUser] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false // Set default value if needed
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/zoo/user/getalluser', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_USERS', payload: json });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [dispatch, user.token]);

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/zoo/user/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedUser)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User updated successfully:', data);
        if (data._id) {
          dispatch({ type: 'UPDATE_USER', payload: data });
        } else {
          console.error('Updated user data not found:', data);
        }
        setEditUser(null);
      } else {
        console.error('Failed to update user:', data.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/zoo/user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_USER', payload: userId });
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      const response = await fetch('/zoo/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newUserData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('User registered successfully:', data);
        // Add the newly registered user to the users state
        dispatch({ type: 'REGISTER_USER', payload: data });
        // Reset the form data after successful registration
        setNewUserData({
          name: '',
          email: '',
          password: '',
          isAdmin: false
        });
      } else {
        console.error('Failed to register user:', data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Manage Users</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditUser(user)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {editUser && (
          <div>
            <h2>Edit User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser(editUser);
            }}>
              <input type="text" value={editUser.name} onChange={(e) => setEditUser({...editUser, name: e.target.value})} />
              <input type="email" value={editUser.email} onChange={(e) => setEditUser({...editUser, email: e.target.value})} />
              <input type="password" value={editUser.password} onChange={(e) => setEditUser({...editUser, password: e.target.value})} />
              <select className="custom-select" value={editUser.isAdmin} onChange={(e) => setEditUser({...editUser, isAdmin: e.target.value === 'true'})}>
                <option value={true}>Admin</option>
                <option value={false}>Not Admin</option>
              </select>
              <Button variant="primary" type="submit">Update</Button>
            </form>
          </div>
        )}
        <div>
          <h2>Register New User</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleRegisterUser();
          }}>
            <input
              type="text"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              value={newUserData.password}
              onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
              placeholder="Password"
            />
            <select className="custom-select"
              value={newUserData.isAdmin}
              onChange={(e) => setNewUserData({ ...newUserData, isAdmin: e.target.value === 'true' })}
            >
              <option value={true}>Admin</option>
              <option value={false}>Not Admin</option>
            </select>
            <Button variant="success" type="submit">Register</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default ManageUsersPage;