import { redirectToGoogleAuth } from "../services/authService";

export const GoogleLoginButton = () => {
  return <button onClick={redirectToGoogleAuth}>Continue with Google</button>;
};
