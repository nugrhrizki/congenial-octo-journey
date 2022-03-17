import axios from "axios";
import { useState } from "react";
import { BASEURL } from "../constants";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function verifSubmission() {
    if (!username) return;

    if (!password) return;

    axios
      .post(BASEURL + "/login", {
        password: password,
        username: username,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
      });
  }

  return (
    <>
      <h1>Login</h1>
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
