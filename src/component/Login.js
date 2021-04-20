import React, { useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import "./register.css";
import { useHistory } from "react-router-dom";
import ReCaptchaV2 from 'react-google-recaptcha';
import { Button } from 'react-bootstrap';


export default function Login(props) {
  let history = useHistory();

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
  
  return(
    <Formik
      initialValues={{
        email: '',
        password: '',
        recaptcha: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("logging in", values);
        setSubmitting(false);
        axios
        .post(process.env.REACT_APP_API_URL + "login", values)
        .then(res => {
          console.log(res.data.result)

          if (res.data.result === "success") {
            localStorage.setItem("TOKEN_KEY", res.data.token);
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
        recaptcha: Yup.string().required(),
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
        setFieldValue,
        setSubmitting,
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
          <p className='form-footer'>
              <a href="/reset-password">I forgot my password</a>
            </p>
          <div className="icheck">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember me</label>
          </div>
          <div>
            <Button type="submit" className="formButton" disabled={isSubmitting} >Login</Button>
          </div>
          <div className="form-footer">
            <span><a href="/register"> not yet registered? </a></span>
          </div>
          
        </form>
      </div>
      
    </div>
  );
}}
  </Formik>
  );
};
