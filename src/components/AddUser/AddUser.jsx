import React, { useState } from "react";

import "./AddUser.css";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const user = { name, surname, email };
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((info) => {
        setName("");
        setSurname("");
        setEmail("");
        props.addUser(info);
      });
  };

  return (
    <div className="AddUser">
      <h2>Adicionar Usuário</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="Row">
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label>Sobrenome</label>
          <input
            type="text"
            name="surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            required
          />
        </div>
        <div className="Row">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Usuário</button>
      </form>
    </div>
  );
};

export default AddUser;
