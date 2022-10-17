import {useEffect} from 'react';
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../reuseable/InputField";
import { useLoginAuthUserMutation } from "../rtk/authRtk";
import { userToken } from "../slices/authSlice";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const stateToken = useSelector((state: any) => state?.authReducer?.userToken);
  const localStorageToken = JSON.parse(localStorage.getItem("token") || "{}");

  // const token=useSelector((state:any)=>state?.authReducer?.userToken);
  // console.log('useSelector',token);
  

  const [loginAuthUser, { isLoading, isError, isSuccess, data }] =
    useLoginAuthUserMutation();    

  const submitForm = async (values: any) => {
    try {
      const result = await loginAuthUser(values).unwrap();
      dispatch(userToken(result?.token));
      localStorage.setItem('token',JSON.stringify(result?.token));
      if(localStorageToken){
        console.log('qwe');
      navigate('/home')
      }
      navigate('/home');
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {    
  //   if(!localStorageToken){
  //     console.log('qwe');
  //   navigate('/')
  //   }
  // }, []);
  

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
          <Oval
            height={50}
            width={50}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : isError ? (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
          <h3>Something went wrong.</h3>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h3>Login Page</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitForm}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <InputField
                  name="email"
                  type="email"
                  label="Email Address"
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  value={values.email}
                  error={errors.email}
                  controlId="validationFormik01"
                />
                <InputField
                  name="password"
                  type="password"
                  label="Password"
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  value={values.password}
                  error={errors.password}
                  controlId="validationFormik02"
                />
                <Button
                  disabled={!isValid || isSubmitting}
                  className="w-100"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mt-3">Don't have an account?<a href="#">Signup</a></p>
        </div>
      )}
    </div>
  );
};

export default Login;
