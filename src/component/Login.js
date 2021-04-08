import React, { useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
// import "./register.css";


export default function Login({history}) {
  useEffect(() => {
    if (localStorage.getItem("TOKEN_KEY") != null) {
      return history.goBack();
    }
    
  },)
  
  return(
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("logging in", values);
        setSubmitting(false);
        axios
        .post("http://localhost:5000/login", values)
        .then(res => {
          if (res.data.result === "success") {
            localStorage.setItem("TOKEN_KEY", res.data.token);
            console.log(res.data.token)
            swal("Success!", res.data.message, "success")
              history.push("/dashboard");
          } else if (res.data.message === "Invalid password") {
            swal("Invalid password!", res.data.message, "Invalid password");
          } else if (res.data.message === "Invalid email") {
            swal("Invalid email!", res.data.message, "Invalid email");
          }
        })
        .catch(error => {
          console.log(error);
          swal("Error!", error, "error");
        });
      }}

      validationSchema = {Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string().required("Password is required")
        .min(8, "Password is too short - must be at least 8 characters.")
      })}
    >

      {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
      } = props;
        
      
  return (
    <div className="container">
      <div className="formContainer">
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          
          <div className="formGroup">
            <input type="text" id="email" placeholder="Email"
            value={values.email} onChange={handleChange} required
            className={
              errors.email && touched.email && "error"}/>
            {errors.email && touched.email && (
              <small id="passwordHelp" className="text-danger">
                {errors.email}
              </small>
            )}
          </div> 
          <div className="formGroup">
            <input type="password" id="password" placeholder="Password"
            value={values.password} onChange={handleChange} required
            className={
              errors.password && touched.password && "error"}/>
            {errors.password && touched.password && (
              <small id="passwordHelp" className="text-danger">
                {errors.password}
              </small>
            )}
          </div>
          <p class="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
          <div className="ichceck">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember me</label>
          </div>
          <div className="btn btn-primary">
            <button type="submit" disabled={isSubmitting} >Sign In</button>
            <button
              type="button"
              onClick={() => {
                history.push("/register");
              }}
              className="btn btn-default btn-block btn-flat"
            >
              not yet registered?
            </button>
          </div>
          
        </form>
      </div>
      
    </div>
  );
}}
  </Formik>
  );
};
