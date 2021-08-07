import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostImage({ post }) {
  return (
    <div className="post-thumbnails__box">
      <div className="post-thumbnails__box--imgBox">
        <Link to={`/post/${post._id}`}>
          <img src={`/${post.imagePath}`} alt="" />
          <div className="post-thumbnails__box--details">
            <div className="post-thumbnails__box--details---content">
              <h2>{post.title}</h2>
              <p />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

PostImage.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostImage;
