/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDeleteApiEventParameterMutation, useGetApiEventParametersMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditParameterConfigurationData } from '../config/AddEditParameter.data';
import SwalAlert from '../../../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import MolGrid from '../../../../../../../../components/Grid/MolGrid';

const EventParameterList = (props) => {
  const molGridRef = useRef();
  const { confirm } = SwalAlert();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [getApiEventParameters, { isLoading: isGetApiEventParametersLoading, isSuccess: isGetApiEventParametersSuccess, data: isGetApiEventParametersData }] = useGetApiEventParametersMutation();
  const [deleteApiEventParameter, { isSuccess: isDeleteApiEventParameterSuccess, data: isDeleteApiEventParameterData },] = useDeleteApiEventParameterMutation();

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      apiEventId: props.keyId
    };
    getApiEventParameters(request);
  };

  useEffect(() => {
    if (isDeleteApiEventParameterSuccess && isDeleteApiEventParameterData) {
      ToastService.success(isDeleteApiEventParameterData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isDeleteApiEventParameterSuccess, isDeleteApiEventParameterData]);

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
    if (isGetApiEventParametersSuccess && isGetApiEventParametersData) {
      if (isGetApiEventParametersData) {
        setListData(isGetApiEventParametersData.dataSource);
      }
      if (isGetApiEventParametersData.totalRecord) {
        setTotalRowCount(isGetApiEventParametersData.totalRecord);
      }
    }
  }, [isGetApiEventParametersSuccess, isGetApiEventParametersData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        let request = {
          apiEventParametersId: data.apiEventParametersId,
          parameterId: data.parameterId
        }
        deleteApiEventParameter(request);
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
        apiEventId: props.keyId

      };
      getApiEventParameters(request);
    }
  }, []);

  const handleEditClick = (data) => {
    props.handleDataToggleModal(data)
  };


  const actionHandler = {
    DELETE: handleDeleteClick,
    EDIT: handleEditClick,
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData,
  }));

  return (
    <div className="row">
      <div className="col-md-12 table-striped api-provider">
        <MolGrid
          ref={molGridRef}
          configuration={AddEditParameterConfigurationData}
          dataSource={listData}
          allowPagination={true}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isGetApiEventParametersLoading}
          onActionChange={actionHandler}

        />
      </div>
    </div>
  )
}

export default EventParameterList