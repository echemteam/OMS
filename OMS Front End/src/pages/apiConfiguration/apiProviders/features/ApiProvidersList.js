/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect ,useImperativeHandle} from "react";
import PropTypes from "prop-types";
import SwalAlert from "../../../../services/swalService/SwalService";
import {useDeleteApiProviderMutation,useGetApiProvidersMutation} from "../../../../app/services/apiProviderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { ApiProvidersGridConfig } from "../config/ApiProviders.data";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";

const ApiProvidersList = ({ handleEditClick, childRef ,handleSearch,handleChange, search,handleClear}) => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const [getApiProviders,{isLoading: isApiProvidersLoading,isSuccess: isApiProvidersSuccess,data: isApiProvidersData, },] = useGetApiProvidersMutation();
  const [deleteApiProvider,{ isSuccess: isDeleteProviderSuccess, data: isDeleteProviderData },] = useDeleteApiProviderMutation();

  useEffect(() => {
    if (isDeleteProviderSuccess && isDeleteProviderData) {
      ToastService.success(isDeleteProviderData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isDeleteProviderSuccess, isDeleteProviderData]);

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: search },
      sortString: sortingString,
          };
    getApiProviders(request);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };
  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  };
  const onGetData = () => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject, molGridRef.current.generateSortingString());
    }
  };

  useEffect(() => {
    if (isApiProvidersSuccess && isApiProvidersData) {
      if (isApiProvidersData) {
        setListData(isApiProvidersData.dataSource);
      }
      if (isApiProvidersData.totalRecord) {
        setTotalRowCount(isApiProvidersData.totalRecord);
      }
    }
  }, [isApiProvidersSuccess, isApiProvidersData]);

  
  useEffect (() => {
    if (search === "" ) {
       onGetData();
    }
  }, [search]);

  const handleDeleteClick = (data) => {
    confirm( "Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteApiProvider(data.providerId);
      }
    });
  };
  const actionHandler = {
    EDIT: handleEditClick,
    DELETE: handleDeleteClick,
  };
  useImperativeHandle(childRef, () => ({
    callChildFunction: onGetData,
  }));
  return (
     
      <div className="row">
        <div className="col-md-12 table-striped api-provider">
          <FinalMolGrid
            ref={molGridRef}
            configuration={ApiProvidersGridConfig}
            dataSource={listData}
            allowPagination={true}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 25,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
            onSorting={handleSorting}
            isLoading={isApiProvidersLoading}
            onActionChange={actionHandler}
            searchTitleButtonClick={handleSearch}
            handleChange={handleChange}
            handleClear={handleClear}
            
          />
        </div>
      </div>
     
  );
};

ApiProvidersList.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  childRef: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleClear: PropTypes.func.isRequired,
   
};
export default ApiProvidersList;
