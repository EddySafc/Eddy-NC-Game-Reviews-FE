import { getUsers } from "../requests";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const logInContext = createContext();

const Users = () => {
  const [users, setUsers] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <section>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.username}>
              <p>{user.username}</p>
              <p>{user.name}</p>
              <p>
                <button
                  onClick={() => {
                    setLoggedInUser(user.username);
                  }}
                >
                  LogIn
                </button>
              </p>

              <img src={user.avatar_url}></img>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
