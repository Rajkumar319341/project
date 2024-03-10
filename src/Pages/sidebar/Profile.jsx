import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState('');
  const userId = localStorage.getItem('_id');
  console.log("UserId:", userId);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = btoa("admin:admin@1234");

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
        const response = await fetch(`https://money-xg9v.onrender.com/api/v1/admin/user/${userId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization:` Basic ${token}`,
          },
        });
        console.log("Response",response)
        console.log(response.data)

        if (response.status===200) {
          const userData = await response.json();
        console.log(userData);
        setUser(userData.user);
        }


        
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</p>
          <p><strong>Updated At:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
