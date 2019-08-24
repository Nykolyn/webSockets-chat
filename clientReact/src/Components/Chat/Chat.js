import React from 'react';
import PropTypes from 'prop-types';

const Chat = ({ users }) => (
  <div>
    <p>Total users online: {users.length}</p>
  </div>
);

Chat.defaultProps = {
  users: [],
};

Chat.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
};

export default Chat;
