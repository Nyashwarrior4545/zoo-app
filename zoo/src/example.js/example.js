//ManageUserPage

import React, { useEffect,  } from 'react';
import Layout from '../componets/Layout';
import { useAuthContext } from '../hooks/useAuthContext'
import { useUserContext } from '../hooks/useUserContext'


const ManageUsersPage = () => {
    const { users, dispatch } = useUserContext();
    const { user } = useAuthContext();
  
    // Fetch all users when the component mounts
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/zoo/user/getalluser', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          const json = await response.json();
    
          // console.log('Fetched Users:', json);
          // console.log('API Response:', json);

    
          if (response.ok) {
            const users = json; // Access json.users directly
            console.log('Users from API:', users);
            dispatch({ type: 'SET_USERS', payload: users });
          }
      
          // console.log('Users state:', users); // Log users after state update
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      
    
      fetchUsers();
    }, [dispatch, user.token]);
    
    return (
      <Layout>
        <div>
          <h1>Manage Users</h1>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
        </div>
      </Layout>
    );
  };
  
  export default ManageUsersPage;