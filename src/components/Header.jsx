import { useContext } from "react";
import { logInContext } from "./Users";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);
  if (loggedInUser === "") {
    return (
      <section>
        <h1>NC Game Reviews</h1>
        <p>You are not logged in!</p>
      </section>
    );
  }
  return (
    <section>
      <h1>NC Game Reviews</h1>
      <p>You are logged in as: {loggedInUser}</p>
    </section>
  );
};
export default Header;
