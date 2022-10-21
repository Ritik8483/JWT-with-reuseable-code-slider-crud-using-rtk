import React,{useEffect,useState} from "react";
import Button from "react-bootstrap/Button";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useViewMutationPostMutation, useViewPostQuery } from "../rtk/postsRtk";

const Details = ({ detailData }: any) => {
  const navigate = useNavigate();
  
  const [localData,setLocalData]=useState<any>();

  const userDatasId = useSelector(
    (state: any) => state?.authReducer?.viewUserId
  );
  console.log('StateValues',userDatasId);
  
  const ides = JSON.parse(localStorage.getItem("userId") || "{}");

  const data={
    id:userDatasId
  }

  const [viewMutationPost,{isLoading}] = useViewMutationPostMutation();

  
  
    const datas = {
      id: ides,
    };

    const userDetails=async()=>{
      try {
        const result: any = await viewMutationPost(datas);
        setLocalData(result?.data);
        console.log("rr", result);
      } catch (error) {
        console.log("error", error);
      }
    }

    useEffect(()=>{
      userDetails();
    },[]);

    console.log('localDataId',ides);

  return (
    <>
      {/* <div className="d-flex text-center flex-column justify-content-center align-items-center vh-100">
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
          </>
        )}
      </div> */}
      <div className="d-flex text-center flex-column justify-content-center align-items-center vh-100">
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
        ) : (
          <>
            <h3>Title : {localData?.title}</h3>
            <p className="w-75">Body : {localData?.body}</p>
            <Button onClick={() => navigate(-1)}>Go to dashboard</Button>
          </>
        )}
      </div>
    </>
  );
};

export default Details;
