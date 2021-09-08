import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostImage({ post }) {
  const path =
    post && post.imagePath && post.imagePath.charAt(0) === "h"
      ? post.imagePath
      : `/${post.imagePath}`;

  return (
    <div className="post-thumbnails__box">
      <div className="post-thumbnails__box--imgBox">
        <Link to={`/post/${post._id}`}>
          <img src={path} alt="" />
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
