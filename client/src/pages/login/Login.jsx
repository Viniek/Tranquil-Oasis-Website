import React, { useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ handleLogin, toggleLoginPopup }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      emailaddress: "",
      password: "",
    },
    onSubmit: async (formState) => {
      const endpoint = isLogin ? 'http://localhost:7000/api/users/login' : 'http://localhost:7000/api/users/register';
      try {
        const response = await axios.post(endpoint, formState, {
          headers: {
            'Content-Type': 'application/json'
          },
        });

        console.log('Backend response:', response.data); // Log the response from the backend

        if (response.data.success) {
          console.log('You Submitted:', response.data);
          if (isLogin) {
            handleLogin(response.data.data); // Pass the user data for login
            console.log("Login Successful");
          } else {
            console.log("Signup Successful");
            setIsLogin(true); // Switch to login form
            navigate('/'); // Redirect to home page or login page


          }
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
      }
    },
    validate: (formValues) => {
      let errors = {};
      if (!isLogin && formValues.firstname === "") {
        errors.firstname = "First Name required.";
      } else if (!isLogin && formValues.firstname.length < 3) {
        errors.firstname = "Must have 3 characters or more.";
      }

      if (!isLogin && formValues.lastname === "") {
        errors.lastname = "Last Name required.";
      } else if (!isLogin && formValues.lastname.length < 3) {
        errors.lastname = "Must have 3 characters or more.";
      }

      if (formValues.emailaddress === "") {
        errors.emailaddress = "Email Address required.";
      } else if (!/\S+@\S+\.\S+/.test(formValues.emailaddress)) {
        errors.emailaddress = "Enter a valid email.";
      }

      if (formValues.password === "") {
        errors.password = "Password required.";
      } else if (formValues.password.length < 6) {
        errors.password = "Must have 6 characters or more.";
      }

      return errors;
    }
  });

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={toggleLoginPopup}>X</button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <>
              <div className='formfield'>
                <input
                  type='text'
                  name="firstname"
                  id="firstname"
                  placeholder="First name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname && <p className="errorp">{formik.errors.firstname}</p>}
              </div>

              <div className='formfield'>
                <input
                  type='text'
                  name="lastname"
                  id="lastname"
                  placeholder='Last name'
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && <p className="errorp">{formik.errors.lastname}</p>}
              </div>
            </>
          )}

          <div className='formfield'>
            <input
              type='text'
              name="emailaddress"
              id="emailaddress"
              placeholder='Email address'
              value={formik.values.emailaddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.emailaddress && formik.errors.emailaddress && <p className="errorp">{formik.errors.emailaddress}</p>}
          </div>

          <div className='formfield'>
            <input
              type='password'
              name="password"
              id="password"
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && <p className="errorp">{formik.errors.password}</p>}
          </div>

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to="#" onClick={toggleForm}>
            {isLogin ? "Sign up here" : "Login here"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;