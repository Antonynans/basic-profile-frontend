import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from 'sweetalert';

export default function Profile({history}) {
  const [state, setState] = useState({
    response: {},
    error_message: null,
    avatars: ''
  })

  const FILE_SIZE = 160 * 1024
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

  let result = state.response
    console.log(result)

  // form submission
  const submitForm = async formData => {
    await axios
      .put('http://localhost:5000/profile', formData)
      .then(res => {
        console.log(res.data.result)
        if (res.data.result === 'success') {
          swal('Success!', res.data.message, 'success')
        } else if (res.data.result === 'error') {
          swal('Error!', res.data.message, 'error')
        }
      })
      .catch(error => {
        console.log(error)
        swal('Error!', 'Unexpected error', 'error')
      })
  }

  const showPreviewImage = values => {
    return (
      <div className='text-center'>
        <img alt="preview"
          id='avatars'
          src={
            values.file_obj != null
              ? values.file_obj
              : 'http://localhost:5000/images/user.png'
          }
          className='profile-user-img img-fluid img-circle'
          width={100}
        />
      </div>
    )
  }

//   Decoding the jwt token to get user Id
  const parseJwt = () => {
    let token = localStorage.getItem('TOKEN_KEY');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    );

     return JSON.parse(jsonPayload);
  };

//   a function to store the user id 
  const getData = async id => {
    await axios
      .get('http://localhost:5000/profile/id/' + id)
      .then(response => {
        console.log(response.data)
        document.getElementById('avatars').src =
          'http://localhost:5000/images/' + response.data.avatars
        setState({ response: response.data })
      })
      .catch(error => {
        setState({ error_message: error.message })
      })
  }

//   retrieve the user id and get the user
  useEffect(() => {
    let { id } = parseJwt();
    return getData(id);
    
  },[])

  return(
    <Formik
      enableReinitialize={true}
    initialValues={
      result
        ? result
        : {
            id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: ''
          }
    }
    onSubmit={(values, { setSubmitting }) => {
      console.log("logging in", values);
      let formData = new FormData()
      formData.append('id', values._id)
      formData.append('username', values.username)
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('phoneNumber', values.phoneNumber)
      formData.append('address', values.address)
      formData.append('email', values.email)
      if (values.avatars) {
        formData.append('avatars', values.avatars)
      }
      console.log(values.avatars)
      setSubmitting(false)
      submitForm(formData)
    }}

      validationSchema = {Yup.object().shape({
        avatars: Yup.mixed()
        .required('A file is required')
        // .test(
        //   'fileSize',
        //   'File too large',
        //   value => value.size <= FILE_SIZE
        // )
        .test(
          'fileFormat',
          'Unsupported Format',
          value => value && SUPPORTED_FORMATS.includes(value.type)
        ),
        username: Yup.string()
        .min(2, 'username is Too Short!')
        .max(50, 'username is Too Long!')
        .required('username is Required'),
        firstName: Yup.string()
          .min(2, "First Name is Too Short!")
          .max(50, "First Name is Too Long!")
          .required("First Name is Required"),
        lastName: Yup.string()
          .min(2, "Last Name is Too Short!")
          .max(50, "Last Name is Too Long!")
          .required("Last Name is Required"),
          phoneNumber: Yup.string()
          .matches(/[0-9]\d{10}$/, "Phone number is not valid.")
          .min(10, 'Phone number is too short!')
          .max(11, "Too Long!")
          .required('Phone number is Required'),
          address: Yup.string()
          .min(12, 'address is Too Short!')
          .max(100, 'address is Too Long!')
          .required('address is Required'),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
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
      } = props;
        
      
  return (
    <div className="">
        <div className=''>
      <section className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='oet-md-3 col-sm-8'>
              <h1>Profile</h1>
            </div>
          </div>
        </div>
      </section>

      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='oet-md-3 col-md-6'>
              <div className='card card-primary'>
                <div className='card-header'>
                  <h3 className='card-title'>update profile</h3>
                </div>
                </div>
            </div>
          </div>
          </div>
        </section>
      </div>
      
    <div className="form-container">
    <form onSubmit={handleSubmit}>
  {showPreviewImage(values)}
  <div className='card-body'>
    <span style={{ color: '#00B0CD', marginLeft: 10 }}>Add Picture</span>
    <div className='form-group'>
      <label htmlFor='exampleInputFile'>Avatars upload</label>
      <div className='input-group'>
        <div className='custom-file'>
          <input
            type="file"

            onChange={e => {
              e.preventDefault()
              setFieldValue('avatars', e.target.files[0]) // for upload
              setFieldValue(
                'file_obj',
                URL.createObjectURL(e.target.files[0])
              ) // for preview image
            }}
            name='avatars' 
            className={
              errors.avatars && touched.avatars
                ? 'form-control is-invalid'
                : 'form-control'
            }
            accept='image/*'
            id='avatars exampleInputFile'
            className='custom-file-input'
          />
          <label className='custom-file-label' htmlFor='exampleInputFile'>
            Choose file
          </label>
        </div>
      </div>
    </div>

    
  <input type='hidden' name='id' value={values._id} />
  <div className='form-group  has-feedback'>
    <label htmlFor='email'>Email address</label>
    <input
      onChange={handleChange}
      value={values.email}
      type='text'
      className={
        errors.email && touched.email
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='email'
      placeholder='Enter email'
    />
    {errors.email && touched.email ? (
      <small id='passwordHelp' className='text-danger'>
        {errors.email}
      </small>
    ) : null}
  </div>
  <div className='form-group has-feedback'>
    <label htmlFor='username'>Username</label>
    <input
      onChange={handleChange}
      value={values.username}
      type='text'
      className={
        errors.username && touched.username
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='username'
      placeholder='Enter UserName'
    />
    <label htmlFor='username'>First Name</label>
    <input
      onChange={handleChange}
      value={values.firstName}
      type='text'
      className={
        errors.firstName && touched.firstName
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='firstName'
      placeholder='Enter First Name'
    />
    {errors.firstName && touched.firstName ? (
      <small id='passwordHelp' className='text-danger'>
        {errors.firstName}
      </small>
    ) : null}
  </div>
  <div className='form-group has-feedback'>
    <label htmlFor='lastName'>Last Name</label>
    <input
      onChange={handleChange}
      value={values.lastName}
      type='text'
      className={
        errors.lastName && touched.lastName
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='lastName'
      placeholder='Enter Last Name'
    />
    {errors.lastName && touched.lastName ? (
      <small id='passwordHelp' className='text-danger'>
        {errors.lastName}
      </small>
    ) : null}
  </div>
  <div className='form-group has-feedback'>
    <label htmlFor='phone Number'>Phone number</label>
    <input
      onChange={handleChange}
      value={values.phoneNumber}
      type='text'
      className={
        errors.phoneNumber && touched.phoneNumber
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='phoneNumber'
      placeholder='Enter phone number'
    />
    {errors.phoneNumber && touched.phoneNumber ? (
      <small id='passwordHelp' className='text-danger'>
        {errors.phoneNumber}
      </small>
    ) : null}
  </div>
  <div className='form-group has-feedback'>
    <label htmlFor='address'>Address</label>
    <textarea
      onChange={handleChange}
      value={values.address}
      className={
        errors.address && touched.address
          ? 'form-control is-invalid'
          : 'form-control'
      }
      id='address'
      placeholder='Address'
    />
    {errors.address && touched.address ? (
      <small id='passwordHelp' className='text-danger'>
        {errors.address}
      </small>
    ) : null}
  </div>
</div> 
<div className='card-footer'>
<div className="btn btn-block btn-primary">
  <button type="submit" disabled={isSubmitting} >Save</button> 
 </div>
</div>
</form>
</div>
</div>
  );
}}
  </Formik>
  );
};
