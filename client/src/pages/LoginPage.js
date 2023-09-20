import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authcontext } from '../ContextApiloginpage/authcontext';
import '../LoginpageCSS/style.css';
function LoginPage() {

    const { setauthstate } = useContext(authcontext);

    let navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3002/loginpage", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            else {
                localStorage.setItem("accessToken", response.data.token);
                setauthstate({ username: response.data.username, id: response.data.id, status: true });
                navigate("/");
            }
        });
    };
    return (
        // <div className="loginContainer">
        //     <label>Username:</label>
        //     <input type="text" onChange={(event) => { setusername(event.target.value) }} />
        //     <label>Password:</label>
        //     <input type="password"  onChange={(event) => { setpassword(event.target.value) }} />
        //     <button onClick={login}> Login </button>
        //     <button onClick={()=>{navigate("/registration")}}> Register </button>
        // </div>

        <section>
            <div className="colour"></div>
            <div className="colour"></div>
            <div className="colour"></div>
            <div className="box">
                <div className="square" style={{ "--i": 0 }}></div>
                <div className="square" style={{ "--i": 1 }}></div>
                <div className="square" style={{ "--i": 2 }}></div>
                <div className="square" style={{ "--i": 3 }}></div>
                <div className="square" style={{ "--i": 4 }}></div>
                <div className="container">
                    <div className="form">
                        <h2>Login Form</h2>
                        <form>
                            <div className="input__box">
                                <input type="text" placeholder="Username" onChange={(event) => { setusername(event.target.value) }}/>
                            </div>
                            <div className="input__box">
                                <input type="password" placeholder="Password" onChange={(event) => { setpassword(event.target.value) }}/>
                            </div>
                        </form>
                        <button className="buttonclass" onClick={login}>Login</button>
                        <div className="forget">
                            Don't have an account? <button onClick={()=>{navigate("/registration")}}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
