import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './button.styles';

const noop = () => {};

const Button = ({ to, text, onClick, tabIndex }) => (
  <Link to={to}>
    <div
      className="button"
      role="button"
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {text}
    </div>
  </Link>
);

Button.propTypes = {
  onClick: PropTypes.func,

  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

Button.defaultProps = {
  onClick: noop,
};

export default Button;
