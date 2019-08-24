import React from 'react';
import PropTypes from 'prop-types';
import css from './Login.module.css';

const Login = ({ isOpen, handleFormSubmit, handleInputChange, name }) =>
  isOpen && (
    <div className={css.overlay}>
      <form onSubmit={handleFormSubmit} className={css.form}>
        <input
          value={name}
          type="text"
          name="userName"
          onChange={handleInputChange}
          className={css.loginInput}
        />
        <button type="submit" className={css.submitButton}>
          Get started!
        </button>
      </form>
    </div>
  );

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Login;
