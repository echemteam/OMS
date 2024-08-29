/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState , useImperativeHandle} from "react";
import PropTypes from "prop-types";
import { ApiAuthenticationtGridConfig, } from "../config/ApiAuthentication.data";
import ToastService from "../../../../../../services/toastService/ToastService";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import { useDeleteApiAuthenticationMutation, useGetApiAuthenticationsMutation } from "../../../../../../app/services/apiAuthenticationAPI";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

const ApiAuthenticationList = ({ handleEditClick, getDataRef, providerId , handleListData }) => {

  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const [deleteApiAuthentication, { isSuccess: isDeleteApiAuthenticationSuccess, data: isDeleteApiAuthenticationData },] = useDeleteApiAuthenticationMutation();

  const [getApiAuthentications, { isLoading: isApiAuthenticationLoading, isSuccess: isApiAuthenticationSuccess, data: isApiAuthenticationeData },] = useGetApiAuthenticationsMutation();

  useEffect(() => {
    onGetData()
  }, []);

  useEffect(() => {
    if (isApiAuthenticationSuccess && isApiAuthenticationeData) {
      
      if (isApiAuthenticationeData) {
        setListData(isApiAuthenticationeData.dataSource);
        handleListData(isApiAuthenticationeData.dataSource.length)

      }
      if (isApiAuthenticationeData.totalRecord) {
        setTotalRowCount(isApiAuthenticationeData.totalRecord);
      }
    }
  }, [isApiAuthenticationSuccess, isApiAuthenticationeData]);

  useEffect(() => {
    if (isDeleteApiAuthenticationSuccess && isDeleteApiAuthenticationData) {
      ToastService.success(isDeleteApiAuthenticationData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      handlePageChange(currentPageObject)
    }
  }, [isDeleteApiAuthenticationSuccess, isDeleteApiAuthenticationData]);


  const getLists = (pageObject, sortingString) => {

    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      providerId: providerId,
    };
    getApiAuthentications(request);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };

  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  }
  const onGetData = () => {

    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject, molGridRef.current.generateSortingString());
    }
  }

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel")
      .then((confirmed) => {
        if (confirmed) {
          deleteApiAuthentication(data.authId);
        }
      });
  };

  const actionHandler = {
    EDIT: handleEditClick,
    DELETE: handleDeleteClick,
  };


  useImperativeHandle(getDataRef, () => ({
    callChildFunction: onGetData
  }));
  return (

    <div className="row">
      <div className="col-md-12 table-striped api-provider pagination-none first-word-break api-management">
        <FinalMolGrid
          ref={molGridRef}
          configuration={ApiAuthenticationtGridConfig}
          dataSource={listData}
          allowPagination={true}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isApiAuthenticationLoading}
          onActionChange={actionHandler}
        />
      </div>
    </div>
  )
}
ApiAuthenticationList.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  getDataRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildFunction: PropTypes.func,
    }),
  }),
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleListData: PropTypes.func,
};
export default ApiAuthenticationList;