import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormText } from "react-bootstrap";
import "./register.css";
import swal from "sweetalert";
import { Button } from 'react-bootstrap';


export default function ResetPassword() {
    const [fields, setFields] = useState({
        code: "",
        email: "",
        password: "",
        confirmPassword: "",
    }); 

    const handleChange = ((e) => {
        setFields({
            ...fields,
            [e.target.id]: e.target.value
        });
    })

    const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length >= 8 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);
    
      setCodeSent(true);
        swal("Please check your email for the confirmation code.")

    
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);
   
      setConfirmed(true); 
  }

  function renderRequestCodeForm() {
    return (
      <div className="container">
             <div className="reset-password-container">
                 <div className="formContainer">
                    <div className="text-center">
                    <h5>Request Password Reset</h5>
                    </div>

      <form onSubmit={handleSendCodeClick}>
      <div className="">

        <input className="reset-input"
            placeholder="Email address" 
            id="email"
            autoFocus
            type="email"
            // variant="outlined" fullWidth 
            value={fields.email}
            onChange={handleChange}
          />
        <Button className="formButton reset-button" 
        //   block
          type="submit"
          isLoading={isSendingCode}
          disabled={!validateCodeForm()}
        >
          Request Reset
        </Button>
        </div>

      </form>
      </div>
      </div>
      </div>
    );
  }

  function renderConfirmationForm() {
    return (
      <div className="container">
       <div className="">
         <div className="reset-password-container">
           <div className="formContainer">
             <div className="text-center">
               <h5>Reset password</h5>
               {/* <p>Hi {fields.email}, enter your new password to continue</p> */}
             </div>

      <form onSubmit={handleConfirmClick}>
        <div>
        <div>
        <input className="reset-input"
            placeholder="Confirmation Code"
            id="code"
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleChange}
          />

          <FormText className="form-text">
            Please check your email ({fields.email}) for the confirmation code.
          </FormText>
        <hr />
        </div>

        <div>
        <input className="reset-input"
            placeholder="New Password"
            type="password"
            id="password"
            variant="outlined"
             fullWidth
            value={fields.password}
            onChange={handleChange}
          />
        </div>
        <div>
        <input className="reset-input"
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            variant="outlined"
             fullWidth
            value={fields.confirmPassword}
            onChange={handleChange}
          />
        </div>
        </div>

        <Button className="formButton reset-button" 
        //   block
          type="submit"
          isLoading={isConfirming}
          disabled={!validateResetForm()}
        >
          Confirm
        </Button>
      </form>
      </div>
      </div>
      </div>
      </div>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="reset-password container-fluid">
       <div className="row justify-content-center">
         <div className="col-md-4 reset-password-container">
          <div className="form-container request-form">
      <div className="success">
        <FormText >
        <p>Your password has been reset.</p>
        </FormText>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

    return (
        <div className="ResetPassword">
          {!codeSent
            ? renderRequestCodeForm()
            : !confirmed
            ? renderConfirmationForm()
            : renderSuccessMessage()}
        </div>
    )
}
