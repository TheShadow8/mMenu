import React from 'react';
import { Link } from 'react-router-dom';

function UserPosts(props) {
  console.log(props);
  const { userPosts } = props;
  return userPosts.map(post => (
    <div className="col-4 align-self-center" key={post._id}>
      <Link to={`/post/${post._id}`}>
        <img className="img-thumbnail mx-auto d-block" src={post.imagePath} alt="" />
      </Link>

      <hr />
    </div>
  ));
}

export default UserPosts;
