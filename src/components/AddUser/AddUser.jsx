import React, { Component } from "react";

import "./AddUser.css";

const INITIAL_STATE = { user: { name: "", email: "" } };

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const user = this.state.user;
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((info) => {
        this.setState(INITIAL_STATE);
        this.props.addUser(info);
      });
  }

  render() {
    return (
      <div className="AddUser">
        <h2>Adicionar Usuário</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="Row">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={this.state.user.name}
              onChange={this.onChangeHandler}
              required
            ></input>
          </div>
          <div className="Row">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={this.state.user.email}
              onChange={this.onChangeHandler}
              required
            />
          </div>
          <button type="submit">Adicionar Usuário</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
