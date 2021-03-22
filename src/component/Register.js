import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./register.css";


export default function Register({history}) {
  return(
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("logging in", values);
        setSubmitting(false);
        axios.post("http://localhost:5000/register", values)
        .then(res => {
          console.log(res.data.result);
          if (res.data.result === "success") {
            alert("Success!", res.data.message, "success")
            history.push("/login");
          } else if (res.data.result === "error") {
            alert("Email already exist!", res.data.message, "error");
            }
        }) 
        .catch(error => {
          console.log(error);
        });
      }}

      validationSchema = {Yup.object().shape({
        firstName: Yup.string()
          .min(2, "First Name is Too Short!")
          .max(50, "First Name is Too Long!")
          .required("First Name is Required"),
        lastName: Yup.string()
          .min(2, "Last Name is Too Short!")
          .max(50, "Last Name is Too Long!")
          .required("Last Name is Required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string().required("Password is required")
        .min(8, "Password is too short - must be at least 8 characters."),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Both passwords need to be the same"
        )
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
        <p>Registration Form</p>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <input type="text" id="firstName" placeholder="First Name"
            value={values.firstName} onChange={handleChange} required autoFocus
            className={
              errors.firstName && touched.firstName && "error"}/>
            {errors.firstName && touched.firstName && (
              <small id="passwordHelp" className="text-danger">
                {errors.firstName}
              </small>
            )}
          </div>
          <div className="formGroup">
            <input type="text" id="lastName" placeholder="Last Name"
            value={values.lastName} onChange={handleChange} required
            className={
              errors.lastName && touched.lastName && "error"}/>
            {errors.lastName && touched.lastName && (
              <small id="passwordHelp" className="text-danger">
                {errors.lastName}
              </small>
            )}
          </div>
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
          <div className="formGroup">
            <input type="password" id="confirmPassword" placeholder="Confirm Password"
            value={values.confirmPassword} onChange={handleChange} required
            className={
              errors.confirmPassword && touched.confirmPassword && "error"}/>
            {errors.confirmPassword && touched.confirmPassword && (
              <small id="passwordHelp" className="text-danger">
                {errors.confirmPassword}
              </small>
            )}
          </div>
          
          <div className="btn btn-primary">
            <button type="submit" disabled={isSubmitting} >Submit</button>
            <button type="button"
              onClick={() => {
                history.push("/login");
              }}
              className="btn btn-default btn-block btn-flat"
            >
              already registered?
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
