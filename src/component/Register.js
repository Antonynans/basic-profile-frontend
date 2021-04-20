import React, { useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./register.css";
import { useHistory } from "react-router-dom";
import ReCaptchaV2 from 'react-google-recaptcha';
import swal from "sweetalert";
import { Button } from 'react-bootstrap';

export default function Register(props) {
  const initializeRecaptcha = async => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };
  useEffect(() => {
    initializeRecaptcha();
    if (localStorage.getItem("TOKEN_KEY") != null) {
      return history.push("/dashboard");
    }
    let notify = props.match.params["notify"];
    if (notify !== undefined) {
      if (notify === "error") {
        swal("Activation failed. Please try again!", "", "error");
      } else if (notify === "success") {
        swal("Activation successful! You can login.", "", "success");
      }
    }
  },)

  let history = useHistory();

  return(
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        recaptcha: '',
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
        recaptcha: Yup.string().required(),
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
        setFieldValue,
        setSubmitting,
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
          <div className="g-recaptcha">
            <label>Recaptcha Validation</label>
            <ReCaptchaV2 
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            render="explicit"
            theme="light"
            
            // verifyCallback={response => {
            //   setFieldValue("recaptcha", response);
            // }}
            onChange={(value) => {
              // console.log("$$$$", isSubmitting, value);
              setFieldValue("recaptcha", value);
              setSubmitting(false);
            }}
            // onloadCallback={() => {
            //   console.log("done loading!");
            // }}
            />
            {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
          </div>          
          <div>
            <Button type="submit" className="formButton" disabled={isSubmitting} >Submit</Button>
          </div>
          <div className="form-footer">
            <span><a href="/login"> already registered? </a></span>
          </div>
        </form>
      </div>
      
    </div>
  );
}}
  </Formik>
  );
};
