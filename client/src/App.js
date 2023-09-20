// import './App.css';
// import logo from './logo.jpg';
// import Home from './pages/Home';
// import axios from "axios";
// import { useEffect, useState } from "react";
// import CreatePost from './pages/CreatePost';
// import Post from './pages/Post';
// import Login from './pages/LoginPage';
// import Register from './pages/Registrationpage';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
// import { authcontext } from './ContextApiloginpage/authcontext';
// import { useNavigate } from 'react-router-dom';

// function App() {

//   const navigate= useNavigate();
//   const [authstate, setauthstate] = useState({
//     username:"",
//     id:0,
//     status:false,
//   });

//   useEffect(()=>{
//     axios.get("http://localhost:3002/auth/validuser", { headers:{
//       accessToken:localStorage.getItem("accessToken"),
//     },
//   })
//   .then((response)=>{
//       if(response.data.error){
//         setauthstate({...authstate, status: false});
//       }
//       else{
//         setauthstate({
//           username:response.data.username,
//           id:response.data.id,
//           status:true,
//         });
//       }
//     });   
//   },[authstate]);

//   const logoutbutt =()=>{

//     localStorage.removeItem("accessToken");

//     setauthstate({username:"",
//       id:0,
//       status:false,
//     });
//     navigate("/");
//   };


//   return (
//     <div className="App">
//       <authcontext.Provider value ={{authstate, setauthstate}}>
//         <Router>      
//           <div className="navbar">
//             <img src={logo} alt="teri"/>
//             <div className="links">

//               {! authstate.status ? (
//                 <>
//                   <Link to="/login"> Login</Link>
//                   <Link to="/registration"> Register</Link>
//                 </>
//               ):(
//                 <>
//                 <Link to="/">Home</Link>
//                 <Link to="/createpost">Create a Post</Link>
//                 </>
//               )}
//             </div>
//             <div className="loggedInContainer">
//               <h1>{authstate.username} </h1>
//               {authstate.status && <button onClick={logoutbutt}>Logout</button>}
//             </div>
//           </div>
//           <Routes>
//             <Route path="/" element={<Home/>} />
//             <Route path="/createpost" element={<CreatePost/>} />
//             <Route path="/post/:id" element={<Post/>} />
//             <Route path="/login" element={<Login/>} />
//             <Route path="/registration" element={<Register/>} />
//           </Routes>
//         </Router>
//       </authcontext.Provider>
//     </div>
//   );
// }

// export default App;


import './App.css';
import logo from './logo.jpg';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"; // Import from v6
import { useEffect, useState } from "react";
import axios from "axios";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/LoginPage';
import Register from './pages/Registrationpage';
import { authcontext } from './ContextApiloginpage/authcontext';

function App() {

  
  const [authstate, setauthstate] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3002/auth/validuser", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setauthstate({ ...authstate, status: false });
        }
        else {
          setauthstate({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, [authstate]);

  const logoutbutt = () => {

    localStorage.removeItem("accessToken");

    setauthstate({
      username: "",
      id: 0,
      status: false,
    });

    window.location.href = "/";
  }

  return (
    <div className="App">
      <authcontext.Provider value={{ authstate, setauthstate }}>
        <BrowserRouter>
          <div className="navbar">
            <img src={logo} alt="teri" />
            <div className="links">

              {!authstate.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Register</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/createpost">Create a Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authstate.username} </h1>
              {authstate.status && <button onClick={logoutbutt}>Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </authcontext.Provider>
    </div>
  );
}

export default App;