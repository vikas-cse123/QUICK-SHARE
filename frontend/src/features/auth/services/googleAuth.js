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


