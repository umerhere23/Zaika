import React, { useState } from "react";
import { addApplicant } from "../Service/api";
import "./CSS/Signup.css";
import Footer from "./footer";
import { ToastContainer, toast } from "react-toastify";

const AddApplicant = () => {
  const [applicantData, setApplicantData] = useState({
    email: "",
    Username: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form is submitted

  const { email, Username, password, address, city, state, zip } =
    applicantData;

  const handleChange = (e) => {
    setApplicantData({ ...applicantData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!Username.trim()) {
      errors.address = "Username is required";
    }
    if (!city.trim()) {
      errors.city = "City is required";
    }

    if (!state.trim()) {
      errors.state = "State is required";
    }

    if (!zip.trim()) {
      errors.zip = "Zip code is required";
    } else if (!/^\d{5}$/.test(zip)) {
      errors.zip = "Invalid zip code format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const addDetails = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await addApplicant(applicantData);
        setIsSubmitted(true);
        toast.success("Applicant added successfully", response.data,{ autoClose: 500 });
      } catch (error) {
        if (error.response.status === 400) {
       toast.error("Email or username is already in use. Please use a different email or username.",{ autoClose: 500 });
        } else {
          alert("Failed to add applicant", error,{ autoClose: 500 });
        }
      }
    }
  };
  
  return (
    <>
      <hr />
      <div class="text-center ">
        Zaika Recipes: Your one-stop shop for delicious recipes from around the
        world. Sign up today and start exploring!
      </div>

      <div className="container1 mt-5">
        {isSubmitted ? ( // Display the greeting message if form is submitted
          <div className="text-center">
            <h2>Thank you for your submission!</h2>
            <p>Your application has been received.</p>
          </div>
        ) : (
          <form>
            <h1 class="text-center text-primary">Signup From</h1>

            {/* Email validation */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className={`form-control ${
                  errors.Username ? "is-invalid" : ""
                }`}
                name="Username"
                value={Username}
                onChange={(e) => handleChange(e)}
              />
              {errors.Username && (
                <div className="invalid-feedback">{errors.Username}</div>
              )}
            </div>
            {/* Password validation */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                name="address"
                value={address}
                onChange={(e) => handleChange(e)}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>
            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                name="city"
                value={city}
                onChange={(e) => handleChange(e)}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>
            {/* State */}
            <div className="mb-3">
              <label className="form-label">State</label>
              <select
                className={`form-select ${errors.state ? "is-invalid" : ""}`}
                name="state"
                value={state}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="KPK">KPK</option>
                <option value="Sindh">Sindh</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Bolachistan">Bolachistan</option>
                <option value="Punjab">Punjab</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania Rhode Island">
                  Pennsylvania Rhode Island
                </option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyomin">Wyomin</option>

                {/* Add more states here */}
              </select>
              {errors.state && (
                <div className="invalid-feedback">{errors.state}</div>
              )}
            </div>
            {/* Zip */}
            <div className="mb-3">
              <label className="form-label">Zip</label>
              <input
                type="text"
                className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                name="zip"
                value={zip}
                onChange={(e) => handleChange(e)}
              />
              {errors.zip && (
                <div className="invalid-feedback">{errors.zip}</div>
              )}
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary1"
                onClick={(e) => addDetails(e)}
              >
                Apply
              </button>
            </div>
          </form>
        )}
        <br></br>
      </div>
      <br></br>
      <ToastContainer />

      <Footer />
    </>
  );
};

export default AddApplicant;
