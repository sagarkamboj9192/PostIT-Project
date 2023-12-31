import React , {useContext , useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { authcontext } from "../ContextApiloginpage/authcontext";

function CreatePost() {

  let navigate= useNavigate();
  const {authstate}= useContext(authcontext);
  const initialValues = {
    title: "",
    postText: "",
  }; 

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    // username: Yup.string().min(3).max(15).required(),
  });

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/login");
    }
  },[]);

  const onSubmit = (data) => {
    axios.post("http://localhost:3002/posts", data , { headers:{
      accessToken:localStorage.getItem("accessToken")},
    }).then((response) => {
      navigate("/");
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Add Title for Post: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Description of Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          {/* <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost" 
            name="username"
            placeholder="(Ex. John123...)"
          /> */}

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;