import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useAuth } from "../AuthContext"; // Import the context
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://expense-management-system-mern-api.onrender.com/api/v1/users/login",
        // "http://localhost:8080/api/v1/users/login", // Use your backend URL
        values
      );
      setLoading(false);
      message.success("Login successful");

      // Save JWT token in sessionStorage
      sessionStorage.setItem("token", data.token);

      // Save user data using context
      const userData = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        // Add other user data if needed
      };

      sessionStorage.setItem("_id", data.user._id);

      login(userData); // Use context's login function
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setLoading(false);
      message.error(
        error.response?.data?.message || "Something went wrong during login"
      );
    }
  };
  return (
    <>
      <div className="login-page min-h-[100vh] max-w-[100vw] flex flex-col justify-center items-center">
        {loading && <Spinner />}
        <strong className="text-3xl font-serif">Login</strong>
        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="login-form min-h-[50vh] min-w-[30vw] p-5"
        >
          <Form.Item label="Email" name="email" className="font-serif">
            <Input type="email" className="p-2 rounded hover:shadow-xl" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="font-serif">
            <Input type="password" className="p-2 rounded hover:shadow-xl" />
          </Form.Item>
          <div className="flex flex-col justify-between">
            <div className="flex flex-row justify-center items-center mb-3">
              <strong className="mr-2 font-serif">Not a user?</strong>
              <Link to="/register">
                <a
                  className="underline text-blue-700 hover:underline hover:text-blue-400 font-serif"
                  href="#"
                >
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
