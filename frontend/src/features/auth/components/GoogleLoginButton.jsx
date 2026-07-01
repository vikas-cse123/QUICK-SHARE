import { redirectToGoogleAuth } from "../services/googleAuth";

export const GoogleLoginButton = () => {
  return (
    
      <button onClick={redirectToGoogleAuth}>Continue with Google.</button>
    
  );
};
