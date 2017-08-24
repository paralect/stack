import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './button.styles';


const noop = () => {};

const Button = ({ to, text, onClick }) => (
  <Link to={to}>
    <div className="button" onClick={onClick || noop}>
      {text}
    </div>
  </Link>
);

Button.propsTypes = {
  onClick: PropTypes.func,

  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Button;
