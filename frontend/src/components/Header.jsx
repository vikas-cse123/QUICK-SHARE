import logo from "../assets/logo.png"
import { GoogleLoginButton } from "../features/auth/components/GoogleLoginButton";
import { Abc } from "../rough/a";
export const Header = ({user}

) => {
    console.log(user);
    return <header>
        <div className="logo-container">
            <img src={logo} alt="" />
        </div>
        <div>
            <button>Create Paste</button>

        </div>
        <div>
            {
                user ? <Abc user={user}/>: <GoogleLoginButton/>

            }

        </div>

    </header>
}