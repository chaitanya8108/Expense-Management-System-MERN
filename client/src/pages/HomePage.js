import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import { BsPlusCircleDotted } from "react-icons/bs";
import axios from "axios";
import ErrorBoundary from "../utils/ErrorBoundary";

const API_URL = "http://localhost:8080/api/v1/users/add-expense"; // Replace with your actual API endpoint

const HomePage = () => {
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [expname, setExpname] = useState("");
  const [expamount, setExpamount] = useState("");
  const [expamounttype, setExpamounttype] = useState("");
  const [expdate, setExpdate] = useState("");

  useEffect(() => {
    // const storedUser = localStorage.getItem("_id");
    const storedUserId = localStorage.getItem("_id");
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

      // Handle response
      message.success("Expense added successfully!");
      console.log("Expense Response:", response.data);

      // Reset form fields
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

  const titleMain = (
    <>
      <span className="text-green-500 font-serif">{`<`}</span>
      <span className="text-gray-500 font-serif">{`E/PENSE`}</span>
      <span className="text-green-500 font-serif">{`/>`}</span>
    </>
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center flex-col h-svh">
      {/* Modal for adding expense */}
      <Modal
        className="flex flex-col justify-center items-center"
        title={titleMain}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <form
          method="post"
          onSubmit={handleSubmit}
          className="expForm flex flex-col justify-center items-center gap-12 mt-2 mb-2"
        >
          <input
            type="text"
            value={expname}
            placeholder="Expense Type"
            onChange={(e) => setExpname(e.target.value)}
            className="border-[1px] p-[0.7rem] min-w-[90%] lg:w-full  hover:shadow-md"
            required
          />
          <input
            type="number"
            value={expamount}
            placeholder="Expense Amount"
            onChange={(e) => setExpamount(e.target.value)}
            className="border-[1px] p-[0.7rem] min-w-[90%] lg:w-full hover:shadow-md"
            required
          />
          <input
            type="text"
            value={expamounttype}
            placeholder="Amount Type"
            onChange={(e) => setExpamounttype(e.target.value)}
            className="border-[1px] p-[0.7rem] min-w-[90%] lg:w-full hover:shadow-md"
            required
          />
          <input
            type="date"
            value={expdate}
            onChange={(e) => setExpdate(e.target.value)}
            className="border-[1px] p-[0.7rem] min-w-[90%] lg:w-full hover:shadow-md"
            required
          />
          <Button
            type="success"
            htmlType="submit"
            className="btn btn-success min-w-[50%] lg:w-[50%] rounded hover:bg-green-700 hover:border-green-700 hover:text-white font-serif"
            loading={confirmLoading}
          >
            Submit
          </Button>
        </form>
      </Modal>

      {/* Add Expense button */}
      <div className="addExpense flex flex-col justify-center items-center">
        {/* <BsPlusCircleDotted
          className="plusBtn w-[50px] h-[50px] cursor-pointer"
          onClick={showModal}
        /> */}
        <ErrorBoundary>
          <lord-icon
            src="https://cdn.lordicon.com/sbnjyzil.json"
            trigger="hover"
            state="hover-swirl"
            colors="primary:#0a5c49,secondary:#109121"
            style={{ width: "100px", height: "100px", cursor: "pointer"}}
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
