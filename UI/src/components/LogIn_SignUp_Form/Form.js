import countryList from 'react-select-country-list';
import './Form.css';
import tick2 from './tick2.png';
import untick2 from './untick2.png';
import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import Footer from '../Footer/index'
//import Top from "../Home/Top";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Top from '../Home/Top';
import EditProductForm from '../EditProduct/editproductForm';
export default function Form() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [userAddress, setUserAddress] = useState();
  const [nameOfBusiness, setNameOfBusiness] = useState('');
  const [typeOfBusiness, setTypeOfBusiness] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [BusinessImage, setBusinessImage] = useState(null);
  const [emailReg, setemailReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setfiles] = useState('');
  const [userAddress, setUserAddress] = useState("");
  const handleImageUpload = async (files) => {
    let urlOfImages = '';
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "yxfpskz5");
      await Axios.post(
        "https://api.cloudinary.com/v1_1/djzsyzfre/image/upload",
        formData
      ).then((Response) => {
        urlOfImages = (Response.data.secure_url);
        console.log(urlOfImages)
      })
    }
    setfiles(urlOfImages);
  };
  function handleUserAddressChange(selected) {
    console.log("handleUser");
    console.log(selected);
    console.log(selected.label);
    setSelectedOption(selected);
    setUserAddress(selected.label);
  }
  async function RegBusiness() {
    const emailRegister = document.getElementById('RegEmail');
    const passwordRegister = document.getElementById('RegPassword');
    const firstNameRegister = document.getElementById('RegFname');
    const lastNameRegister = document.getElementById('RegLname');
    const phoneNumberRegister = document.getElementById('RegPhone');
    const genderRegister = document.querySelector('input[name="gender"]:checked').value
    const nameOfBusinessRegister = document.getElementById('RegNameOfB');
    const typeOfBusinessRegister = document.getElementById('RegTypeOfB');
    const businessAddressRegister = document.getElementById('selectTwo');
    const BusinessImageRegister = document.getElementById('BusinessImage');
    const data = [
      { value: 'Handmade', label: 'Handmade', id: 0, name: 'typeofb' },
      { value: 'Clothes', label: 'Clothes', id: 1, name: 'typeofb' },
      { value: 'Plants', label: 'Plants', id: 2, name: 'typeofb' }
    ];





    const map = new Map();

    data.forEach(item => {
      map.set(item.value, item.id);
    });

    // Accessing the values in the Map
    // console.log(map.get(0)); // Output: { value: 'Handmade', label: 'Handmade', id: 0, name: 'typeofb' }
    // console.log(map.get(1)); // Output: { value: 'Clothes', label: 'Clothes', id: 1, name: 'typeofb' }
    // console.log(map.get(2)); // Output: { value: 'Plants', label: 'Plants', id: 2, name: 'typeofb' }
    console.log("nameOfBusinessRegister")
    console.log(nameOfBusinessRegister)
    let addresS = userAddress;
    let BO_NAME = (nameOfBusinessRegister == null) ? "" : nameOfBusinessRegister.value
    const BusinessReg = {
      person: {
        First_Name: firstNameRegister.value,
        Last_Name: lastNameRegister.value,
        Email: emailRegister.value,
        PhoneNumber: phoneNumberRegister.value,
        Password: passwordRegister.value,
        Gender: (genderRegister === 'M' ? 'M' : 'F'),
        Flag_IsBusinessOwner: (nameOfBusinessRegister == null) ? false : true,
        Address:( addresS =="")? "Nablus":addresS,
        logo: files,
      },
      Business: {
        Business_Name: BO_NAME,
        business_type: typeOfBusiness,
        LocationOfBusiness: businessAddress,
      },
    };
    console.log("BusinessReg");
    console.log(BusinessReg);
    console.log("isBusinessOwner");
    console.log(isBusinessOwner);


    try {
      const finalResult = await Axios.post(
        "http://localhost:9999/businessOwner/Register", BusinessReg
      );

      const responseCode = finalResult.status;
      if (responseCode === 201) {
        console.log("Successful created");
        openPopUpTick();
      } else if (responseCode === 400) {
        console.log("Bad request register");
        openPopUpUnTick();
      } else if (responseCode === 500) {
        console.log("Error registeration");
        openPopUpUnTick();
      } else {
        console.log("Unknown error:", responseCode);
        openPopUpUnTick();
      }

      const finalResponse = finalResult.data;
      console.warn("result registeration is ", finalResponse);
    } catch (error) {
      console.error("Registration error:", error);
      openPopUpUnTick();
    }

  }

  //const history = useHistory();
  const navigate = useNavigate();
  const Location = useLocation();
  async function LogBusiness() {

    const emailInput = document.getElementById("emailforB");
    const passwordInput = document.getElementById("passwordforB");

    const BusinessLog = {
      Email: emailInput.value,
      Password: passwordInput.value,
    };

    try {
      const finalResult = await Axios.post(
        "http://localhost:9999/login",
        BusinessLog,
      );

      const responseCode = finalResult.status;
      console.log("finalResult");
      console.log(finalResult);
      if (responseCode === 200) {
        localStorage.setItem("access_token", finalResult.data.token);
        localStorage.setItem("user_type", finalResult.data.user_type);
        localStorage.setItem("username", finalResult.data.user_name);
        localStorage.setItem("logo", finalResult.data.logo);
        localStorage.setItem("user_email", finalResult.data.user_email);

        if(finalResult.data.user_type === "admin"){
          navigate("/MainSection");
        }
        else{
        navigate("Top");}

        console.log("Successful login");
      } else if (responseCode === 401) {
        console.log("Bad request login");
      } else if (responseCode === 500) {
        console.log("Error login");
      } else {
        console.log("Unknown error:", responseCode);
      }

      const finalResponse = finalResult.data;
      console.warn("result login is ", finalResponse);

    } catch (error) {
      console.log(error);
    }
  }



  const validateLoginForm = () => {
    let flagOne = true;
    if (Email === '' || Email === null) {
      flagOne = false;

    }
    if (Password === '' || Password === null) {
      flagOne = false;

    }
    return flagOne;
  }

  const ProceedLogin = (e) => {
    if (e) {
      e.preventDefault();
      if (validateLoginForm()) {
        console.log("processed");
      }
    }
  };
  let popup = document.getElementById("popup");
  let popup1 = document.getElementById("popup1");
  let tick = document.getElementById("tick");
  let untick = document.getElementById("untick");
  let tickClass = document.getElementsByClassName('tick');
  let untickClass = document.getElementsByClassName('untick');
  let Form_Container = document.getElementById("Form_Container");

  function openPopUpTick() {
    popup.classList.add("open-popup");
    tick.style.visibility = 'visible';
    popup1.classList.remove("open-popup1");
    Form_Container.style.opacity = "0.5";
  }
  function openPopUpUnTick() {
    popup1.classList.add("open-popup1");
    untick.style.visibility = 'visible';
    popup1.classList.remove("open-popup");
    Form_Container.style.opacity = "0.5";
  }
  function closePopUp1() {
    if (popup1) {
      Form_Container.style.opacity = "1";
      untick.style.visibility = 'hidden';
      popup1.classList.remove("open-popup1");
    }
  }

  function closePopUp() {
    if (popup) {
      Form_Container.style.opacity = "1";
      tick.style.visibility = 'hidden';
      popup.classList.remove("open-popup");
      handleLogInClick();
    }
  }

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    RegBusiness();
  };
  const handleButtonLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    LogBusiness();

  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("iam in image")
    console.log(file);
  };
  const optionsForBusiness = [
    { value: 'Nablus', label: 'Nablus', id: 0, name: 'Nablus', className: 'optionsForBusiness' },
    { value: 'Ramallah', label: 'Ramallah', id: 1, name: 'Ramallah', className: 'optionsForBusiness' },
    { value: 'Tulkarem', label: 'Tulkarem', id: 2, name: 'Tulkarem', className: 'optionsForBusiness' },
  ];

  const optionType = [
    { value: 'Handmade', label: 'Handmade', id: 2, name: 'Handmade' },
    { value: 'Clothes', label: 'Clothes', id: 1, name: 'Clothes' },
    { value: 'Plants', label: 'Plants', id: 3, name: 'Plants' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  function handleTypeOfBusinessChange(selected) {
    console.log("handletypeof");
    console.log(selected.id);
    setSelectedOption(selected);
    setTypeOfBusiness(selected.id);
  }

  function handleBusinessAddressChange(selected) {
    console.log("handlebusiness");
    console.log(selected.name);
    setSelectedOption(selected);
    setBusinessAddress(selected.name);
  }
  function handleBusinessImage() {
    const username = firstName + lastName;
    console.log("handlebusiness");
    setUsername(username);
    console.log(username);
  }



  const [options, setOptions] = useState([]);

  useEffect(() => {
    const countries = countryList().getData();
    setOptions(countries);

  }, []);

  const handleSignUpClick = () => {
    const container = document.getElementById('Form_Container');
    container.classList.add('right-panel-active');
  };

  const handleLogInClick = () => {
    const container = document.getElementById('Form_Container');
    container.classList.toggle('right-panel-active');
  };
  const handleChange = (selectedOption) => {
  };
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const handleRadioChange = (event) => {
    console.log("event")
    console.log(event)
    console.log("event.target")
    console.log(event.target)
    console.log()
    setIsChecked(!event.target.checked);
    setIsBusinessOwner(event.target.checked);

  }
  return (
    <>
      <div className='allComponent'>
        <div className="Form_Container" id="Form_Container">
          <div className="form-container sign-up-container">
            <form className="form">
              <h1 className="H1">Create Account</h1>
              <div className="infield">
                <input
                  name="fname"
                  type="text"
                  value={firstName}
                  id="RegFname"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="Fname text"
                  placeholder="First Name"
                />
                <input
                  name="lname"
                  type="text"
                  value={lastName}
                  id="RegLname"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="Lname text"
                  placeholder="Last Name"
                />
              </div>
              <div className="infield">
                <input
                  type="email"
                  id="RegEmail"
                  value={emailReg}
                  onChange={(e) => {
                    setemailReg(e.target.value);
                  }}
                  placeholder="Email"
                  name="Email"
                  className="text"
                />
              </div>
              <div className="infield">
                <input
                  name="phone"
                  type="tel"
                  id="RegPhone"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  placeholder="Phone Number"
                  className="text"
                />
              </div>
              <div className="infield">
                <input
                  type="password"
                  id="RegPassword"
                  value={passwordReg}
                  onChange={(e) => {
                    setpasswordReg(e.target.value);
                  }}
                  placeholder="Password"
                  className="text"
                />
              </div>
              {isChecked && (
                <div className="infield selectOne">
                  <label htmlFor="Address" className='addressLabel'>Address</label>
                  <Select
                    options={options}
                    onChange={handleUserAddressChange}
                    id="Address"
                    className="select"
                    classNamePrefix="select"
                  />
                </div>
              )}

              <div className="infield">
                <label htmlFor="gender"> Gender : </label>
                <input type="radio" className='gender' name="gender" id="M" value="M" onChange={(e) => {
                  setGender(e.target.value);
                }} />
                <label htmlFor="male"> Male </label>
                <input type="radio" className='gender' name="gender" id="F" value="F" onChange={(e) => {
                  setGender(e.target.value);
                }} />
                <label htmlFor="female"> Female</label>
              </div>
              <div className="infield">
                {/* <label htmlFor="businessImage">Upload Business Image: </label> */}
                <input type="file" multiple
                  onChange={(event) => {
                    handleImageUpload(event.target.files)
                  }}
                />
              </div>
              <div className="infield">
                <input
                  type="checkbox"
                  id="check"
                  onClick={handleRadioChange}
                  name='checkb'
                  value={isBusinessOwner}
                  onChange={(e) => {
                    handleRadioChange(e)
                    setIsBusinessOwner(e.target.value);
                  }}
                />

                <label htmlFor="check"> Business Owner ?</label>
              </div>
              {isBusinessOwner && !isChecked && (
                <div id="business-owner-fields">
                  <div className="infield">
                    <input name='nameofb' value={nameOfBusiness} type="text" className='text' id='RegNameOfB' placeholder="Name of Business" onChange={(e) => {
                      setNameOfBusiness(e.target.value);
                    }} />
                  </div>
                  <div className="infield">
                    <label htmlFor="optionType">Type of Business: </label>
                    <Select
                      options={optionType}
                      id='RegTypeOfB'

                      //value={typeOfBusiness}
                      onChange={handleTypeOfBusinessChange}
                      className='selectType'
                    />
                  </div>
                  <div className="infield selectTwo">
                    <label htmlFor="optionsForBusiness" className='selectAddress'>Address</label>
                    <Select
                      options={optionsForBusiness}
                      //value={businessAddress}
                      onChange={handleBusinessAddressChange}
                      getOptionValue={(option) => option.id}
                      id="selectTwo"
                      className="selecttwo"
                      classNamePrefix="select"
                    />
                  </div>
                  {/* <div className="infield">
                    <label htmlFor="businessImage">Upload Business Image: </label>
                    <input type='file' id="BusinessImage" name="businessImage" onChange={handleBusinessImage} />
                  </div> */}
                </div>
              )}

              <button className='button' onClick={handleButtonClick}
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form className='form'>
              <h1 className='H1'>Log in</h1>
              <div className="infield">
                <input type="email" placeholder="Email" id='emailforB' name="email" className='text' value={Email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="infield">
                <input type="password" placeholder="Password" id='passwordforB' className='text' value={Password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button id="LogIn" type='submit' className='button' onClick={handleButtonLogin}>
                Log In
              </button>
            </form>
          </div>

          <div className="overlay-container" id="overlayCon">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className='H1'>Welcome Back!</h1>
                <p className='p'>To keep connected with us please login with your personal info</p>
                <button id="SignUp" className='button' onClick={handleLogInClick}>Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className='H1'>Hello, Friend!</h1>
                <p className='p'>Enter your personal details and start journey with us</p>
                <button id="SignUp" className='button' onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
        <div className="popup" id="popup">
          <img src={tick2} alt="" id='tick' />
          <h2 className='tick'>Thank You!</h2>
          <p className='tick'>Your details has been submitted successfully</p>
          <button type='submit' onClick={closePopUp}>Ok</button>
        </div>
        <div className="popup1" id="popup1">
          <img src={untick2} alt="" id='untick' />
          <h2 className='untick'>Sorry!</h2>
          <p className='untick'>Your details has not submitted successfully</p>
          <button type='submit' onClick={closePopUp1}>Ok</button>
        </div>
      </div>
    </>
  );
}



