import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
// import { authcontext } from "../ContextApiloginpage/authcontext";
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  // const {authstate}= useContext(authcontext);
  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("gettoken")){
      navigate("/login");
    }
    else{
      axios.get("http://localhost:3002/posts" , { headers:{
        accessToken:localStorage.getItem("gettoken"),
      },}).then((response) => {
        setListOfPosts(response.data);
      });
    }
  }, []);
 
  return ( 
    <div id="photo">
      {listOfPosts.map((value, key) => {
        return (
          <div  key={key} className="post" onClick={()=>{navigate(`/post/${value.id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;