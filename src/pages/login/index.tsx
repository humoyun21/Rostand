import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, TextField } from "@mui/material";

import useLoginStore from "@login"
import "./style.scss";

const index = () => {
  const navigate = useNavigate();

  const {login}= useLoginStore()
  // interface for users
  interface userInterface {
    username: string;
    password: string;
  }

  const initialValues: userInterface = {
    username: "",
    password: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username invalit ")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Posswod invalit ")
      .required("Password is required"),
  });

  const handelSubmit = async (value: userInterface) => {
    const respons = await login("/auth/login", value);
    if (respons.status === 201) {
      toast.success("User permission granted");
      localStorage.setItem("token", respons?.data?.accessToken);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };


  return (
    <>
      <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center">
        <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
          <h1 className="text-[24px] text-black mb-3">Form Login</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handelSubmit}
          >
            <Form className="flex flex-col items-center w-full">
              <Field
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                type="text"
                as={TextField}
                label="Username"
                name="username"
                className=" w-[90%] mb-3 "
              />
              <ErrorMessage
                name="username"
                component="p"
                className="mb-3 text-red-500"
              />

              <Field
                as={TextField}
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                type="password"
                label="Password"
                name="password"
                className=" w-[90%] mb-3 "
              />
              <ErrorMessage
                name="password"
                component="p"
                className="mb-3 text-red-500"
              />
              <Button type="submit"
              sx={{color:"blue" , fontSize:"16px" , fontWeight:"500"}}
              className="w-[90%]  bg-white py-2"
              >SUBMIT</Button>
            </Form>
          </Formik>
          <button
            onClick={() => navigate("/")}
            className=" mt-3 text-end text-sky-600 rounded-lg py-2 px-3 text-[18px] "
          >
            Forgot password?
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default index;
