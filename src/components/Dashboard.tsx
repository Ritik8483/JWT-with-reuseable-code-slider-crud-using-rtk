import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Oval } from "react-loader-spinner";
import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetAllPostsQuery,
  useTotalNoOfPostsQuery,
} from "../rtk/postsRtk";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Pagination from "react-responsive-pagination";
import AddDetailsModal from "./AddDetailsModal";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [sortBtn, setSortBtn] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [value] = useDebounce(searchInput, 1000);

  const [deletePost] = useDeletePostMutation();

  const pageSize = 10;

  const qurrParams = {
    initialEntry:
      currentPage === 1 ? pageNo : currentPage * pageSize - pageSize,
    finalEntry: currentPage === 1 ? pageSize : pageSize * currentPage,
    sort: sortBtn && "id",
    order: sortBtn && "desc",
    search: value || "",
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllPostsQuery(qurrParams);
  const { data: totalData } = useTotalNoOfPostsQuery();

  const handlePagination = (page: any) => {
    setCurrentPage(page);
  };

  const onHideFunction = () => {
    setAddModal(false);
  };

  const handleDelete = async (id: any) => {
    try {
      await deletePost(id);
      toast.success("Delete post successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id: any) => {
    setAddModal(true);
    let filterData: any = data?.filter((datas: any) => datas.id === id);
    setEditData(filterData[0]);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 justify-content-center my-3">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="searchInput"
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
            placeholder="search.."
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => {
            setAddModal(true);
            setEditData({});
          }}
        >
          Add Details
        </Button>
      </div>

      {isLoading || isFetching ? (
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
          Something went wrong
        </div>
      ) : isSuccess && data?.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
          No data found!
        </div>
      ) : isSuccess && data?.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => setSortBtn(!sortBtn)}
            >
              <th>S.No.</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d: any, index: any) => {
              return (
                <tr key={d?.id}>
                  <td>
                    {sortBtn && currentPage === 1
                      ? totalData?.length - index
                      : sortBtn && currentPage
                      ? totalData?.length +
                        pageSize -
                        currentPage * pageSize -
                        index
                      : currentPage === 1
                      ? index + 1
                      : currentPage * pageSize - pageSize + index + 1}
                  </td>
                  <td>{d?.title}</td>
                  <td>{d?.body}</td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Action">
                      <Dropdown.Item onClick={() => handleEdit(d?.id)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(d?.id)}>
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : null}
      <Pagination
        current={currentPage}
        total={Math.ceil(totalData?.length / pageSize)}
        onPageChange={(page) => handlePagination(page)}
      />
      {addModal && (
        <AddDetailsModal
          editData={editData}
          addModal={addModal}
          onHide={onHideFunction}
        />
      )}
    </div>
  );
};

export default Dashboard;
