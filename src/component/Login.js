import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./register.css";


export default function Login({history}) {
  return(
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("logging in", values);
        setSubmitting(false);
        history.push("/dashboard");
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
          
          <div className="btn btn-primary">
            <button type="submit" disabled={isSubmitting} >Submit</button>
          </div>
        </form>
      </div>
      
    </div>
  );
}}
  </Formik>
  );
};
