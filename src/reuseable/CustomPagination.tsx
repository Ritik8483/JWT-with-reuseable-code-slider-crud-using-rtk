import * as React from "react";
import Pagination from "react-responsive-pagination";

export interface PropsPaginate{
    currentPage: any,
    setCurrentPage:Function,
    pageSize:number,
    totalData:number | any,
    sortBtn:boolean,
    // current:number | any
}

const CustomPagination = (props:PropsPaginate) => {
  const { totalData, sortBtn, setCurrentPage, pageSize, currentPage } = props;

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>
            {sortBtn
              ? `Showing ${
                  currentPage === 1
                    ? totalData?.length
                    : totalData?.length + pageSize - currentPage * pageSize
                } to ${totalData?.length - currentPage * pageSize + 1} of ${
                  totalData?.length
                } enteries`
              : `Showing ${
                  currentPage === 1
                    ? currentPage
                    : currentPage * pageSize + 1 - pageSize
                } to ${currentPage * pageSize} of ${
                  totalData?.length
                } enteries`}
          </h5>
        </div>
        <div>
          <Pagination
            current={currentPage}
            total={Math.ceil(totalData?.length / pageSize)}
            onPageChange={(page:number) => handlePagination(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
