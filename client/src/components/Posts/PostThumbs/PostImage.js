import React from 'react';
import {Link} from 'react-router-dom';

function PostImage({post}) {
  return (
    <div className="box">
      <div className="imgBox">
        <Link to={`/post/${post._id}`}>
          <img src={post.imagePath} alt="" />
          <div className="details">
            <div className="content">
              <h2>{post.title}</h2>
              <p />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PostImage;
