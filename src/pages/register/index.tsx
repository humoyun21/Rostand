import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMask } from "@react-input/mask";

import { Button,  TextField } from "@mui/material";

import useRegisterStore from "@register"
import "./style.scss";

const index = () => {
  const {register}= useRegisterStore()
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const navigate = useNavigate();

  interface initialValues {
    username: string;
    password: string;
    phone: string;
  }
  const initialValues: initialValues = {
    username: "",
    password: "",
    phone: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username invalit ")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Posswod invalit ")
      .required("Password is required"),
    phone: Yup.string().min(19, "Phone invalit ").required("Phone is required"),
  });

  const handelSubmit = async (value: initialValues) => {
    const phone = value.phone.replace(/\D/g, "");
    const neWFormData = { ...value, phone: `+${phone}` };

    const respons = await register("/auth/register", neWFormData);
    if (respons.status === 201) {
      toast.success("User Added Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center">
        <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
          <h1 className="text-[24px] text-white mb-3">Form Registrator</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handelSubmit}
          >
            <Form className="flex flex-col items-center w-full">
              <Field
                as={TextField}
                label="Username"
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                type="text"
                name="username"
                className=" w-[90%] mb-3 text-white outline-none"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="mb-3 text-red-500"
              />

              <Field
                as={TextField}
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                label="Password"
                type="password"
                name="password"
                className=" w-[90%] mb-3  text-white  "
              />
              <ErrorMessage
                name="password"
                component="p"
                className="mb-3 text-red-500"
              />

              <Field
                as={TextField}
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                label="Phone"
                type="tel"
                name="phone"
                inputRef={inputRef}
                className=" w-[90%] mb-3  text-white"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="mb-3 text-red-500"
              />
              <Button
                sx={{color:"blue" , fontSize:"16px" , fontWeight:"500"}}
                variant="contained"
                type="submit"
                className="w-[90%] py-2  bg-white"
              >
                Submit
              </Button>
            </Form>
          </Formik>

          <Button
            sx={{color:"blue" , fontSize:"16px" , fontWeight:"500"}}
            onClick={() => navigate("/login")}
            variant="contained"
            type="submit"
            className="w-[90%] py-2 mt-3 bg-white "
          >
            Login
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default index;
