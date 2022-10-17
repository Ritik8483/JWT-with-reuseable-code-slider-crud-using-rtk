import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../reuseable/InputField";
import { useAddNewPostMutation, useEditPostMutation } from "../rtk/postsRtk";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  body: yup.string().min(5).required("Body is required"),
  title: yup.string().required("Title is Required"),
});
const initialValues = {
  body: "",
  title: "",
};
const AddDetailsModal = (props: any) => {
  const { addModal, onHide, editData } = props;

  const [addNewPost] = useAddNewPostMutation();
  const [editPost, { isLoading, isSuccess, isError }] = useEditPostMutation();

  const submitForm = async (values: any) => {
    let datas = {
      id: editData?.id,
      filterdata: values,
    };
    if (editData?.id) {
      try {
        await editPost(datas).unwrap();
        toast.success("Post updated successfully!");
        onHide();
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong!");
      }
    } else {
      try {
        await addNewPost(values);
        toast.success("Post added successfully!");
        onHide();
      } catch (error: any) {
        console.log("error", error);
      }
    }
  };

  return (
    <div>
      <Modal show={addModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{editData?.id ? "Edit Post" : "Add Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editData || initialValues}
            onSubmit={submitForm}
            validationSchema={schema}
            enableReinitialize={true}
          >
            {(props) => (
              <Form noValidate onSubmit={props.handleSubmit}>
                <InputField
                  name="title"
                  type="text"
                  controlId="validationFormik04"
                  placeholder="Enter your title"
                  value={props.values.title}
                  error={props.errors.title}
                  onChange={props.handleChange}
                  isValid={props.touched.title && !props.errors.title}
                  isInvalid={!!props.errors.title}
                  label="Title"
                />
                <InputField
                  name="body"
                  type="text"
                  controlId="validationFormik03"
                  placeholder="Enter your body"
                  value={props.values.body}
                  error={props.errors.body}
                  onChange={props.handleChange}
                  isValid={props.touched.body && !props.errors.body}
                  isInvalid={!!props.errors.body}
                  label="Body"
                />
                <div className="d-flex justify-content-end my-2 gap-3">
                  <Button variant="secondary" onClick={onHide}>
                    Close
                  </Button>
                  <Button
                    disabled={props.isSubmitting}
                    variant="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddDetailsModal;
