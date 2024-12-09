import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";
import ErrorBoundary from "../utils/ErrorBoundary";
import "../styles/HomePage.css";

// const API_URL = "http://localhost:8080/api/v1/users/add-expense"; // Replace with your actual API endpoint
const API_URL =
  "https://expense-management-system-mern-api.onrender.com/api/v1/users/add-expense";

const HomePage = () => {
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [expname, setExpname] = useState("");
  const [expamount, setExpamount] = useState("");
  const [expamounttype, setExpamounttype] = useState("");
  const [expdate, setExpdate] = useState("");
  const submitIconRef = useRef(null); // Reference for About Lordicon

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const sendExpense = async () => {
    try {
      const response = await axios.post(API_URL, {
        userId,
        expname,
        expamount,
        expamounttype,
        expdate,
      });
      message.success("Expense added successfully!");
      console.log("Expense Response:", response.data);
      setExpname("");
      setExpamount("");
      setExpamounttype("");
      setExpdate("");
    } catch (error) {
      message.error("Failed to add expense. Please try again.");
      console.error(
        "Error while sending expense:",
        error.response?.data || error.message
      );
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      return message.error("User ID not found. Please log in.");
    }
    if (!expname || !expamount || !expamounttype || !expdate) {
      return message.warning("Please fill in all fields.");
    }
    setConfirmLoading(true);
    sendExpense();
  };

  const handleMouseEvent = (ref, eventType) => {
    if (ref.current) {
      ref.current.dispatchEvent(new MouseEvent(eventType)); // Dispatch event dynamically
    }
  };

  const titleMain = (
    <>
      <span className="text-green-500 font-serif">{`<`}</span>
      <span className="text-gray-500 font-serif">{`E/PENSE`}</span>
      <span className="text-green-500 font-serif">{`/>`}</span>
    </>
  );

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  return (
    <div className="home">
      {/* Modal for adding expense */}
      <Modal
        className="flex flex-col justify-center items-center"
        title={titleMain}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="expForm ">
          <input
            type="text"
            value={expname}
            placeholder="Expense Type"
            onChange={(e) => setExpname(e.target.value)}
            className="border-[1px] p-[0.7rem] w-full max-w-[90%] hover:shadow-md"
            required
          />
          <input
            type="number"
            value={expamount}
            placeholder="Expense Amount"
            onChange={(e) => setExpamount(e.target.value)}
            className="border-[1px] p-[0.7rem] w-full max-w-[90%] hover:shadow-md"
            required
          />
          <input
            type="text"
            value={expamounttype}
            placeholder="Amount Type"
            onChange={(e) => setExpamounttype(e.target.value)}
            className="border-[1px] p-[0.7rem] w-full max-w-[90%] hover:shadow-md"
            required
          />
          <input
            type="date"
            value={expdate}
            onChange={(e) => setExpdate(e.target.value)}
            className="border-[1px] p-[0.7rem] w-full max-w-[90%] hover:shadow-md"
            required
          />
          {/* <div className="flex flex-row items-center h-[50%] w-[50%]"> */}
          <Button
            // type="primary"
            htmlType="submit"
            className="flex flex-row justify-center items-center mt-[0.5rem] hover:border-green-600 w-full"
            loading={confirmLoading}
            onMouseEnter={() => handleMouseEvent(submitIconRef, "mouseenter")}
            onMouseLeave={() => handleMouseEvent(submitIconRef, "mouseleave")}
          >
            <div className="">
              <ErrorBoundary>
                <lord-icon
                  ref={submitIconRef}
                  src="https://cdn.lordicon.com/gluvzmuz.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#e83a30,tertiary:#9cf4a7,quaternary:#0a5c15"
                  style={{ width: "60px", height: "60px", cursor: "pointer" }}
                ></lord-icon>
              </ErrorBoundary>
            </div>
            <span className="text-gray-500 hover:text-black font-serif">
              Submit
            </span>
          </Button>
          {/* </div> */}
        </form>
      </Modal>

      {/* Add Expense button */}
      <div className="addExpense ">
        <ErrorBoundary>
          <lord-icon
            src="https://cdn.lordicon.com/mfdeeuho.json"
            trigger="loop"
            delay="1500"
            stroke="light"
            state="hover-swirl"
            colors="primary:#30e849,secondary:#0a5c15"
            style={{ width: "100px", height: "100px", cursor: "pointer" }}
            onClick={showModal}
          ></lord-icon>
        </ErrorBoundary>
        <br />
        <strong className="text-gray-500 font-serif">
          Add your <span className="text-green-500 font-serif">{`<`}</span>{" "}
          <span className="text-gray-500 font-serif">{`E/PENSE`}</span>{" "}
          <span className="text-green-500 font-serif">{`/>`}</span>
        </strong>
      </div>
    </div>
  );
};

export default HomePage;
