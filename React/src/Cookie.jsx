import React from 'react';
import axios from 'axios';

export default function Cookie() {
  const addCookie = (event) => {
    event.preventDefault();
    axios
      .get(`/cookies/setcookie/city/${event.target.city.value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form">
      <form onSubmit={addCookie}>
        <div>
          <b>Enter City:</b>
        </div>
        <input type="text" placeholder="enter city" name="city" />
        <br />
        <button type="submit">Add Cookie</button>
      </form>
      <a href="http://localhost:3000/cookies">
        <button type="button">View Cookies</button>
      </a>
    </div>
  );
}
