import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <Link to="/"> Reviews -</Link>
      <Link to="/users">- LogIn</Link>
    </nav>
  );
};

export default Nav;
