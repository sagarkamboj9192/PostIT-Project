import React  from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import { authcontext } from "../ContextApiloginpage/authcontext";
function Home() {
  const [listofall, setlistofall] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  // const {authstate}= useContext(authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      
        axios.get("http://localhost:3002/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          console.log("Response data:", response.data);
          setlistofall(response.data.listofall);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
      
    }
  }, []);
  


  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3002/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setlistofall(
          listofall.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };


  return (
    <>
      <div className="blockdivide">
        <div className="backgroundImage">
          <div id="photo">
            {listofall.map((value, key) => {
              return (
                <div key={key} className="post" >
                  <div className="title">Title: {value.title} </div>
                  <div className="body" onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                  <div className="footer">
                    <div className="username">
                      {value.username}
                    </div>
                    <div className="buttons">
                      <ThumbUpAltIcon
                        onClick={() => {
                          likeAPost(value.id);
                        }}
                        className={
                          likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                        }
                      />
                      <label> {value.Likes.length}</label>
                      <button onClick={() => { navigate(`/post/${value.id}`) }}>Comment</button>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
        <div className="rightcontainterHomepage">
          <h1>vasu ye block h</h1>
        </div>
      </div>
    </>
  );
}

export default Home;



