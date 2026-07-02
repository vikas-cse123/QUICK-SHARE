export const redirectToGoogleAuth = () => {
    console.log(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
    const params = new URLSearchParams({
        client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri:import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        response_type:"code",
        scope:"openid email profile"

    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  
};




export const fetchUser = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};


export const logoutUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,{
        method:"POST",
        credentials:"include"
    })
    const data = await response.json()
    return data
}