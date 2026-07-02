import logo from "../assets/logo.png";
import { GoogleLoginButton } from "../features/auth/components/GoogleLoginButton";
import { UserMenu } from "./UserMenu";
export const Header = ({
  user,
  setUser,
  showDetailsDropdown,
  setShowDetailsDropdown,
}) => {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} />
      </div>
      <div>
        <button>Create Paste</button>
      </div>
      <div>
        {user ? (
          <UserMenu
            user={user}
            setUser={setUser}
            showDetailsDropdown={showDetailsDropdown}
            setShowDetailsDropdown={setShowDetailsDropdown}
          />
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </header>
  );
};
