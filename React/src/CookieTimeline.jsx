import React from 'react';
import axios from 'axios';

export default function CookieTimeline() {
  const addCookie = (event) => {
    event.preventDefault();
    axios
      .get(
        `/cookies/cookieWithTime/${event.target.cookie.value}/${event.target.value.value}/${event.target.time.value}`
      )
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
          <b>Enter cookie:</b>
        </div>
        <input type="text" placeholder="enter cookie" name="cookie" />
        <br />
        <div>
          <b>Enter Value:</b>
        </div>
        <input type="text" placeholder="enter cookie value" name="value" />
        <br />
        <div>
          <b>Enter Time in Minutes:</b>
        </div>
        <input type="number" placeholder="enter time" name="time" />
        <br />
        <button type="submit">Add Cookie</button>
      </form>
      <a href="http://localhost:3000/cookies">
        <button type="button">View Cookies</button>
      </a>
    </div>
  );
}
