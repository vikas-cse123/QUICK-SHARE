import { useEffect, useState } from 'react'
import { GoogleLoginButton } from '../features/auth/components/GoogleLoginButton'
import { Abc } from '../rough/a';
import { Header } from '../components/Header';

const fetchUser = async () => {
  console.log("Running fetch user fn");
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`,{credentials:"include"})
  const data = await response.json()
  return data
}


export const HomePage = () => {
  const [user,setUser] = useState(null)
  useEffect(() => {
   (async () => {
    const data = await fetchUser()
    setUser(data.data)
   })()
  },[])
  return (
    <Header user={user}></Header>
    // <div>
    //   {user ? <Abc data={user}/> : <GoogleLoginButton/>}
      
    // </div>
  )
}
