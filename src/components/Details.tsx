import React from "react";
import Button from "react-bootstrap/Button";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useViewPostQuery } from "../rtk/postsRtk";

const Details = ({detailData}:any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const datas = {
    id: id,
  };
  const { data, isLoading,isFetching, isSuccess, isError } = useViewPostQuery(datas);
  console.log("detailData", detailData);


  return (
    <>
      <div className="d-flex text-center flex-column justify-content-center align-items-center vh-100">
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
        ) : (
          <>
            <h3>Title : {data?.title}</h3>
            <p className="w-75">Body : {data?.body}</p>
            <Button onClick={() => navigate(-1)}>Go to dashboard</Button>
            {/* <h3>Title : {data?.title}</h3>
            <p className="w-75">Body : {data?.body}</p>
            <Button onClick={() => navigate(-1)}>Go to dashboard</Button> */}
          </>
        )}
      </div>
    </>
  );
};

export default Details;
