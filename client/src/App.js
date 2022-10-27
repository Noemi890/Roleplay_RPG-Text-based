import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import RegisterPage from "./components/user/Register";
import LoginPage from "./components/user/Login";
import Profile from "./components/profile/ProfileForm";
import "./app.css";
import Main from "./components/main/Main";
import SelectProfile from "./components/profile/SelectProfile";
import Game from "./components/game/Game";
import RoleView from "./components/roles/RoleView";
import AddProfilesFromPlatform from "./components/platform/AddProfilesFromPlatform";
import client from "./client/client";

export const loggedInUser = createContext();

const App = () => {
  const [user, setUser] = useState(undefined);

  const onLogin = (user) => {
    setUser(user);
  };

  const onLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    client
      .get("/user")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        if (!error.code || error.code !== "ERR_BAD_REQUEST") {
          throw error;
        }

        setUser(null);
      });
  }, []);

  if (user === undefined) {
    return null;
  }

  return (
    <div className="App">
      <loggedInUser.Provider value={{ user, onLogin, onLogout }}>
        <Routes>
          <Route path={"/"} element={<RegisterPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/profile/create"} element={<Profile />} />

          {user !== null ? (
            <>
              <Route path={"/profile/select"} element={<SelectProfile />} />
              <Route path={"/main"} element={<Main />} />
              <Route path={"/game"} element={<Game />} />
              <Route path={"/role"} element={<RoleView />} />
              <Route path={"/profiles"} element={<AddProfilesFromPlatform />} />
            </>
          ) : null}
        </Routes>
      </loggedInUser.Provider>
    </div>
  );
};

export default App;
