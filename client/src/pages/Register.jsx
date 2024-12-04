import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
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
      <div className="register-page min-h-[100vh] max-w-[100vw] flex flex-col justify-center items-center">
        {loading && <Spinner />}
        <strong className=" text-3xl font-serif">Register</strong>
        <Form layout="vertical" onFinish={submitHandler}  className="min-h-[50vh] min-w-[30vw] p-5">
          <Form.Item label="Name" name="name" className="font-serif">
            <Input className="p-2 rounded hover:shadow-xl"/>
          </Form.Item>
          <Form.Item label="Email" name="email" className="font-serif">
            <Input type="email" className="p-2 rounded hover:shadow-xl"/>
          </Form.Item>
          <Form.Item label="Password" name="password" className="font-serif">
            <Input type="password" className="p-2 rounded hover:shadow-xl"/>
          </Form.Item>
          <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-center items-center mb-3">
              <strong className="mr-2 font-serif">Already a user ?</strong>
              <Link to="/login">
                {" "}
                <a className="underline text-blue-700 hover:underline hover:text-blue-400 font-serif">
                  SignIn
                </a>
              </Link>
            </div>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
