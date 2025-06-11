import { getUserInfo } from "../api/user";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import { isLoggedIn } from "./utils/auth";
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo().then((res) => {
        setUser(res);
      });
    }
  }, []);
  return (
    <div className="px-4 md:px-8  lg:px-16 xl:px-32 2xl:px-64">
      {/* Navbar */}
      <Navbar Navbar user={user} />
      {/* BREADCURM */}
      {/* INSTRUCTIONS */}
      {/* FEATER SECTION */}
      {/* POST LIST */}
    </div>
  );
};

export default App;
