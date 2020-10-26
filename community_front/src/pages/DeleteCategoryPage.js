import React from "react";
import { useData } from "../data/useData";
import { Link } from "react-router-dom";

export default function DeleteCategoryPage() {
  const { data } = useData();
  return (
    <body className="user-body">
      <div className="user-container">
        <div className="box">
          {data.users.map((user) => (
            <div className="profile-show" key={user.id}>
              <h1 className="profile-h1">
                Welcome
                <img className="profile-image" src={user.image} alt="profile" />
                , delete your own category here:
              </h1>
              <h2 className="profile-h2" style={{ marginTop: "50px" }}>
                Category
              </h2>
              <select className="profile-input">
                <option></option>
                <option>product</option>
                <option>service</option>
                <option>competence</option>
                <option>(your custom category)</option>
              </select>
              <br />
              <Link to="/my-item">
                <button
                  style={{ marginTop: "50px" }}
                  className="profile-button"
                >
                  Delete
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
}
