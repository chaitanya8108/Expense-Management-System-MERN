import React, { useState } from "react";
import "../styles/Contact.css";
import {
  // AutoComplete,
  Button,
  // Cascader,
  // Checkbox,
  // Col,
  Form,
  Input,
  // InputNumber,
  message,
  // Row,
  Select,
} from "antd";
import ErrorBoundary from "../utils/ErrorBoundary";
import emailjs from "emailjs-com"; // Import EmailJS
const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };
const Contact = () => {
  const [form] = Form.useForm();
  // const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state for button

  // Handle form submission
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    const updatedValues = {
      ...values,
      senderName: values.name, // This will be the name of the person sending the message
      receiverName: "Chaitanya", // Replace this with the name of the recipient (could be dynamic too)
    };

    console.log(updatedValues);

    // Set loading to true to disable the button
    setLoading(true);

    // Send updated form data to EmailJS
    emailjs
      .send(
        "service_54woewn", // Your EmailJS service ID
        "template_eyste5k", // Your EmailJS template ID
        updatedValues, // Send the updated values with senderName and receiverName
        "w9335XEBjhKqqSvHc" // Your EmailJS user ID (public API key)
      )
      .then(
        (result) => {
          console.log(result.text);
          message.success("Message sent successfully!");
          form.resetFields(); // Clear the form fields
          setLoading(false); // Reset loading state, enabling the button again
        },
        (error) => {
          console.error(error.text);
          message.error("Error sending message!");
          setLoading(false); // Reset loading state on error
        }
      );
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 100,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  // const onWebsiteChange = (value) => {
  //   if (!value) {
  //     setAutoCompleteResult([]);
  //   } else {
  //     setAutoCompleteResult(
  //       [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
  //     );
  //   }
  // };
  // const websiteOptions = autoCompleteResult.map((website) => ({
  //   label: website,
  //   value: website,
  // }));

  return (
    <div className="contact">
      <div className="contact-icon">
        <div className="contact-icon-bg">
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/xcxzayqr.json"
              trigger="in"
              state="in-reveal"
              delay="0"
              colors="primary:#109121,secondary:#eeca66"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>
          </ErrorBoundary>
        </div>
      </div>
      <div className="formDiv">
        <Form
          className="form shadow-xl"
          // {...formItemLayout}
          form={form}
          name="send"
          onFinish={onFinish}
          initialValues={{
            prefix: "+91",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <p className="contact-title font-serif mb-4">CONTACT</p>
          <Form.Item
            name="name"
            label="Name"
            tooltip="What others call you?"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
                whitespace: true,
              },
            ]}
          >
            <Input className="contact-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input className="contact-input" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
              className="contact-input"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[
              {
                required: true,
                message: "Please input your Message!",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              className="contact-input"
            />
          </Form.Item>

          <Form.Item
          // {...tailFormItemLayout}
          >
            <Button
              // type="primary"
              htmlType="submit"
              className="contactBtn mt-4"
              loading={loading} // Add loading state to button
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Contact;
