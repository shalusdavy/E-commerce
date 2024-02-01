import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authPost } from "../Redux/authSlicer";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  console.log(inputValue);

  const dispatch = useDispatch();
  const postingData = useSelector((state) => state.user || []);

  useEffect(() => {
    authPost();
  }, [postingData]);
  console.log(postingData);

  // console.log(postingData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const logResult=  await dispatch(authPost(inputValue));
    const {success,message}=logResult.payload;
      if(success){
        navigate("/");
      }else{
       
      }
     
    } catch (error) {
      console.error("Error adding user", error.message);
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="form_container">
        <h2> Create account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Your name</label>
            <input
              type="text"
              name="username"
              value={inputValue.username}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inputValue.email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
