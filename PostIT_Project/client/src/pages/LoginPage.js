import React, { useState , useContext} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authcontext } from '../ContextApiloginpage/authcontext';
function LoginPage() {

    const {setauthstate}= useContext(authcontext);

    let navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const login=()=>{
        const data = { username: username, password: password };
        axios.post("http://localhost:3002/loginpage",data).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("gettoken",response.data.token);
                setauthstate({username:response.data.username, id:response.data.id, status:true});
                navigate("/");
            }
        });
    };
    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input type="text" onChange={(event) => { setusername(event.target.value) }} />
            <label>Password:</label>
            <input type="text" onChange={(event) => { setpassword(event.target.value) }} />
            <button onClick={login}> Login </button>
        </div>
    )
}

export default LoginPage
