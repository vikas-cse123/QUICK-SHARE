import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { fetchUser } from "../features/auth/services/authService";



export const HomePage = () => {
  const [user, setUser] = useState(null);
  const [showDetailsDropdown, setShowDetailsDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchUser();
      if (data.success) {
        setUser(data.data);
      }
    })();

    document.addEventListener("click", () => {
      setShowDetailsDropdown(false);
    });
  }, []);

  return (
    <Header
      user={user}
      setUser={setUser}
      showDetailsDropdown={showDetailsDropdown}
      setShowDetailsDropdown={setShowDetailsDropdown}
    ></Header>
  );
};
