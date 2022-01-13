import React, { useEffect, useState } from "react";

import AddUser from "../AddUser/AddUser";
import User from "../User/User";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("UseEffect...");
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
        setUsers(users);
      });
  }, []);

  const addUser = (user) => {
    setUsers((atualUsers) => [...atualUsers, user]);
  };

  const removeUser = (user) => {
    if (window.confirm(`Tem certeza que deseja remover "${user.name}"?`)) {
      fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setUsers(users.filter((x) => x.id !== user.id));
        }
      });
    }
  };

  return (
    <div className="Users">
      <div className="AddUser_container">
        <AddUser addUser={addUser} />
      </div>
      <div className="User_container">
        {users.map((user) => (
          <User key={user.id} user={user} removeUser={() => removeUser(user)} />
        ))}
      </div>
    </div>
  );
};

export default Users;
