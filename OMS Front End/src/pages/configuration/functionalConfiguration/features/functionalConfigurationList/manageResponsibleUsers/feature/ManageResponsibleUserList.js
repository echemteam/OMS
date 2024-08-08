import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'; 
import MolGrid from '../../../../../../../components/Grid/MolGrid';
import { manageResponsibleUsersData } from '../config/ManageResponsibleUsers.data';
import { useDeleteFunctionalitiesResponsiblesUserMutation, useGetFunctionalitiesResponsiblesMutation } from '../../../../../../../app/services/configurationAPI';
import ToastService from '../../../../../../../services/toastService/ToastService';
import SwalAlert from '../../../../../../../services/swalService/SwalService';

const ManageResponsibleUserList = (props) => {

  const molGridRef = useRef();
  const { confirm } = SwalAlert();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);

  const [getFunctionalitiesResponsible, { isLoading: isGetFunctionalitiesResponsiblesLoading, isSuccess: isGetFunctionalitiesResponsiblesSuccess, data: isGetFunctionalitiesResponsiblesData }] = useGetFunctionalitiesResponsiblesMutation();
  const [deleteFunctionalitiesResponsiblesUser, { isSuccess: isDeleteFunctionalitiesResponsiblesUserSuccess, data: isDeleteFunctionalitiesResponsiblesUserData }] = useDeleteFunctionalitiesResponsiblesUserMutation();

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      functionalityId: props.functionalityId
    };
    getFunctionalitiesResponsible(request);
  };

  useEffect(() => {
    if (isDeleteFunctionalitiesResponsiblesUserSuccess && isDeleteFunctionalitiesResponsiblesUserData) {
      ToastService.success(isDeleteFunctionalitiesResponsiblesUserData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isDeleteFunctionalitiesResponsiblesUserSuccess, isDeleteFunctionalitiesResponsiblesUserData]);

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
    if (isGetFunctionalitiesResponsiblesSuccess && isGetFunctionalitiesResponsiblesData) {
      if (isGetFunctionalitiesResponsiblesData) {
        setListData(isGetFunctionalitiesResponsiblesData.dataSource);
      }
      if (isGetFunctionalitiesResponsiblesData.totalRecord) {
        setTotalRowCount(isGetFunctionalitiesResponsiblesData.totalRecord);
      }
    }
  }, [isGetFunctionalitiesResponsiblesSuccess, isGetFunctionalitiesResponsiblesData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteFunctionalitiesResponsiblesUser(data.functionalitiesResponsiblesId);
      }
    });
  };

  useEffect(() => {
    if (molGridRef.current) {
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      const currentsortingString = molGridRef.current.generateSortingString();
      const request = {
        pagination: {
          pageNumber: currentPageObject.pageNumber,
          pageSize: currentPageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: currentsortingString,
        functionalityId: props.functionalityId

      };
      getFunctionalitiesResponsible(request);
    }
  }, []);

  const actionHandler = {
    DELETE: handleDeleteClick,
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData,
  }));

  return (
    <div className="row">
      <div className="col-md-12 table-striped api-provider">
        <MolGrid
          ref={molGridRef}
          configuration={manageResponsibleUsersData}
          dataSource={listData}
          allowPagination={true}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isGetFunctionalitiesResponsiblesLoading}
          onActionChange={actionHandler}
        />
      </div>
    </div>
  )
}
ManageResponsibleUserList.propTypes = {
  functionalityId: PropTypes.number.isRequired,
  childRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildFunction: PropTypes.func,
    }),
  }),
};
export default ManageResponsibleUserList