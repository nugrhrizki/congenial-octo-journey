import { Link } from "react-router-dom";

export default function Header(setCurrPage) {
  return (
    <>
      <header>
        <h1>Checklist</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
