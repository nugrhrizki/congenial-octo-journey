import axios from "axios";
import { useState } from "react";
import { BASEURL } from "../constants";

export default function Register() {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  function verifSubmission() {
    if (!email_regex.test(email)) {
      // todo: email not valid message
      console.log("not valid");
      return;
    }

    if (!username) {
      // todo: username cannot be empty message
      console.log("username empty");
      return;
    }

    if (!password) {
      // todo: password cannot be empty message
      console.log("password empty");
      return;
    }

    axios
      .post(BASEURL + "/register", {
        email: email,
        password: password,
        username: username,
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <h1>Register</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <br />
      <button onClick={verifSubmission}>Submit</button>
    </>
  );
}
