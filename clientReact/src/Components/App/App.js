import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import 'react-toastify/dist/ReactToastify.css';
import { socket } from '../../helpers/socketFunc';

class App extends Component {
  state = {
    users: [],
    userName: '',
    isOpen: true,
  };

  handleShowTotal = users => this.setState({ users });

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleFormSubmit = e => {
    const { userName } = this.state;
    e.preventDefault();
    socket.emit('showTotalUsers');
    socket.emit('login', userName);
    return toast.warn(`User ${userName} connected to our amazing chat :D`);
  };

  handleDisconnect = () => socket.emit('disconnected', this.state.userName);

  render() {
    socket.on('login', this.handleUserJoin);
    socket.on('showTotalUsers', this.handleShowTotal);
    console.log('rerender');
    const { users, userName, isOpen } = this.state;
    // socket.on('disconnect', this.handleDisconnect);
    return (
      <div>
        <Login
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          name={userName}
          isOpen={isOpen}
        />
        <Chat users={users} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
