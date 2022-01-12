import React from "react";
import "./User.css";

const User = (props) => {
  return (
    <div className="User">
      <ul>
        <li>
          <strong>ID:</strong> {props.user.id}
        </li>
        <li>
          <strong>Nome:</strong> {props.user.name}
        </li>
        <li>
          <strong>Email:</strong> {props.user.email}
        </li>
      </ul>
      <button onClick={props.removeUser}>&times;</button>
    </div>
  );
};

export default User;
