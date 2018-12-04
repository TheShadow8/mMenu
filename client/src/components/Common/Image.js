import React from 'react';
import PropTypes from 'prop-types';

import './Image.css';

const Image = props => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center',
    }}
  />
);

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  contain: PropTypes.string,
  left: PropTypes.string,
};

export default Image;
