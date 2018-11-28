import React from 'react';
import User from './User';
import UserPostList from './UserPostList';

function Profile() {
  return (
    <div className="row">
      <User />
      <UserPostList />
    </div>
  );
}

export default Profile;
