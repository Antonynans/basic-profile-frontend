import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
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
        password: Yup.string().required("Password is required"),
        confirm_password: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Both password need to be the same"
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
        handleBlur,
        handleSubmit,
      } = props;
        
      
  return (
    <div className="container">
      <div className="formContainer">
        <p>Registration Form</p>
        <div className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <input type="text" id="firstName" placeholder="First Name"
            value={values.firstName} onChange={handleChange}/>
          </div>
          <div className="formGroup">
            <input type="text" id="lastName" placeholder="Last Name"
            value={values.lastName} onChange={handleChange}/>
          </div>
          <div className="formGroup">
            <input type="text" id="email" placeholder="Email"
            value={values.email} onChange={handleChange}/>
          </div>
          <div className="formGroup">
            <input type="password" id="password" placeholder="Password"
            value={values.password} onChange={handleChange}/>
          </div>
          <div className="formGroup">
            <input type="password" id="confirmPassword" placeholder="Confirm Password"
            value={values.confirmPassword} onChange={handleChange}/>
          </div>
          <div className="button">
            <button disabled={isSubmitting} type="submit">Submit</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}}
  </Formik>
  );
};
