import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../slices/authSlice";
import ChartModal from "./ChartModal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const divRef = useRef();
  const countRef = useRef(0);

  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const[inputValue, setInputValue] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
  };
  const focusInput = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    countRef.current=countRef.current+1;
  });

  console.log('divRef',divRef?.current );

  return (
    <div>
      <div ref={divRef} className="d-flex w-100 gap-3 justify-content-center mt-5">
        <Button
          onClick={() => {
            setModal(true);
            setModalType("TopTagModal");
          }}
        >
          Top Tag Modal
        </Button>
        <Button
          onClick={() => {
            setModal(true);
            setModalType("TopIntelModal");
          }}
        >
          Top Intel Modal
        </Button>
        <Button
          onClick={() => {
            setModal(true);
            setModalType("TopSearchedModal");
          }}
        >
          Top Searched Modal
        </Button>
      </div>
      <div className="w-100 flex-column d-flex justify-content-center align-items-center">
        <Form.Group className="my-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="email"
            className="w-100"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <h3>RenderCounts : {countRef.current}</h3>
        </Form.Group>
        <Button onClick={() => handleLogout()}>Logout</Button>
        <Button onClick={focusInput} className="mt-3">
          Focus Email
        </Button>
        <Button onClick={()=>navigate('/home/dashboard')}  variant="secondary" className="mt-3">
          Dashboard
        </Button>
      </div>
      {modal && (
        <ChartModal
          modal={modal}
          modalType={modalType}
          onHide={() => setModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
