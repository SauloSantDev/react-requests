import React, { Component } from "react";

import AddUser from "../AddUser/AddUser";
import User from "../User/User";
import "./Users.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: "João",
          email: "joao@gmail.com",
        },
        {
          id: 2,
          name: "Maria",
          email: "maria@gmail.com",
        },
      ],
    };

    this.addUser = this.addUser.bind(this);
  }

  addUser(user) {
    const users = [...this.state.users, user];
    this.setState({ users });
  }

  removeUser(user) {
    if (window.confirm(`Tem certeza que deseja remover "${user.name}"?`)) {
      fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "DELETE",
      }).then((response) => {
        let users = this.state.users;
        users = users.filter((x) => x.id !== user.id);
        this.setState({ users });
      });
    }
  }

  componentDidMount() {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((info) => {
        const users = info.data.map((user) => {
          return {
            id: user.id,
            name: user.first_name,
            surname: user.last_name,
            email: user.email,
          };
        });
        this.setState({ users });
      });
  }

  render() {
    return (
      <div className="Users">
        <div className="AddUser_container">
          <AddUser addUser={this.addUser} />
        </div>
        <div className="User_container">
          {this.state.users.map((user) => (
            <User
              key={user.id}
              user={user}
              removeUser={this.removeUser.bind(this, user)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Users;
