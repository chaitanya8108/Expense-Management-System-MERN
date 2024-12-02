import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful");

      // Save the user's _id and other data (excluding password) to localStorage
      const userData = {
        _id: data.user._id, // Store the _id directly
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        // Add any other user data you need to store
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("_id", data.user._id); // Save _id separately for easier access

      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong during login");
    }
  };
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="login-page min-h-[100vh] max-w-[100vw] flex flex-col justify-center items-center">
        {loading && <Spinner />}
        <strong className=" text-3xl font-serif">Login</strong>
        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="min-h-[50vh] min-w-[30vw] p-5"
        >
          <Form.Item label="Email" name="email" className="font-serif">
            <Input type="email" className="p-2 rounded hover:shadow-xl" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="font-serif">
            <Input type="password" className="p-2 rounded hover:shadow-xl" />
          </Form.Item>
          <div className="flex flex-col justify-between">
            <div className="flex flex-row justify-center items-center mb-3">
              <strong className="mr-2 font-serif">Not a user ?</strong>
              <Link to="/register">
                {" "}
                <a className="underline text-blue-700 hover:underline hover:text-blue-400 font-serif">
                  SignUp
                </a>
              </Link>
            </div>
            <button className="btn btn-primary font-serif">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
