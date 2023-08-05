import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect , useState} from 'react';
import axios  from 'axios';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setcomments] = useState([]);
    const [newComment, setNewComment] = useState([])
  
    useEffect(() => {
      axios.get(`http://localhost:3002/posts/byid/${id}`).then((response) => {
        setPostObject(response.data);
      });


      axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
        setcomments(response.data);
      });
    }, [id]); 

    const addComment = ()=>{
      axios.post("http://localhost:3002/comments", {commentbody: newComment, PostId: id}, {
        headers:{
          accessToken:localStorage.getItem("gettoken"),
        },
      }).then((response)=>{
        if(response.data.error){
          console.log(response.data);
        }
        else{
          const commentadding = {commentbody: newComment, username:response.data.username};
          setcomments([...comments, commentadding]);
          setNewComment("");
        }
      });
    };
    return (
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title"> {postObject.title} </div>
            <div className="body">{postObject.postText}</div>
            <div className="footer">{postObject.username}</div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input 
            type="text" 
            placeholder="Any Comments" 
            autoComplete="off" 
            value={newComment}
            onChange={(event)=>{
              setNewComment(event.target.value)
            }}/>
            <button type="submit" onClick={addComment}>Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.map((comment, key)=>{
              return (
              <div key={key} className="comment">  {comment.commentbody}
                <label>Username: {comment.username}</label>
              </div>
              );
            })}
            
          </div>
        </div>
      </div>
    );
  }
  
  export default Post;
