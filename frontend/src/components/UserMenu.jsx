import { useState } from "react";
import { logoutUser } from "../features/auth/services/authService";

export const UserMenu = ({
  user,
  setUser,
  showDetailsDropdown,
  setShowDetailsDropdown,
}) => {
  const { avatarUrl, name, email } = user;
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
    }
  };
  const toggleDetailsDropdown = (e) => {
    e.stopPropagation();
    setShowDetailsDropdown((prevState) => !prevState);
  };
  return (
    <div>
      <div>
        <img
          src={avatarUrl}
          referrerPolicy="no-referrer"
          onClick={toggleDetailsDropdown}
        />
      </div>
      {showDetailsDropdown && (
        <div>
          <p>{name}</p>
          <p>{email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};
