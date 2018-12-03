import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({ name, placeholder, value, error, info, onChange, rows, cols }) => {
  return (
    <div className="form-group m-0">
      <textarea
        className={classnames('form-control form-control-md', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback m-0">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
