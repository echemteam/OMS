/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import SwalAlert from '../../../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { useDeleteApiEventRequiredFieldMutation, useGetApiEventRequiredFieldsMutation} from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditRequireConfigurationData } from '../config/AddEventRequiredFields.data';
import FinalMolGrid from '../../../../../../../../components/FinalMolGrid/FinalMolGrid';

const EventRequiredFieldsList = (props) => {
  const molGridRef = useRef();
  const { confirm } = SwalAlert();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [getApiEventRequiredFields, { isLoading: isGetApiEventRequiredFieldsLoading, isSuccess: isGetApiEventRequiredFieldsSuccess, data: isGetApiEventRequiredFieldsData }] = useGetApiEventRequiredFieldsMutation();
  const [deleteApiEventRequiredField, { isSuccess: isDeleteApiEventRequiredFieldSuccess, data: isDeleteApiEventRequiredFieldData },] = useDeleteApiEventRequiredFieldMutation();

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
    getApiEventRequiredFields(request);
  };

  useEffect(() => {
    if (isDeleteApiEventRequiredFieldSuccess && isDeleteApiEventRequiredFieldData) {
      ToastService.success(isDeleteApiEventRequiredFieldData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isDeleteApiEventRequiredFieldSuccess, isDeleteApiEventRequiredFieldData]);

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
    if (isGetApiEventRequiredFieldsSuccess && isGetApiEventRequiredFieldsData) {
      if (isGetApiEventRequiredFieldsData) {
        setListData(isGetApiEventRequiredFieldsData.dataSource);
      }
      if (isGetApiEventRequiredFieldsData.totalRecord) {
        setTotalRowCount(isGetApiEventRequiredFieldsData.totalRecord);
      }
    }
  }, [isGetApiEventRequiredFieldsSuccess, isGetApiEventRequiredFieldsData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteApiEventRequiredField(data.apiEventRequiredFieldId);
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
      getApiEventRequiredFields(request);
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
      <div className="col-md-12 table-striped api-provider api-partner">
        <FinalMolGrid
          ref={molGridRef}
          configuration={AddEditRequireConfigurationData}
          dataSource={listData}
          allowPagination={true}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isGetApiEventRequiredFieldsLoading}
          onActionChange={actionHandler}
        />
      </div>
    </div>
  )
}

export default EventRequiredFieldsList