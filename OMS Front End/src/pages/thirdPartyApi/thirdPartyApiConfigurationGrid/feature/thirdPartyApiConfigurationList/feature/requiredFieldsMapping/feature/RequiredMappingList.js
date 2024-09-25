/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDeleteApiEventRequiredFieldsMappingMutation, useGetApiEventRequiredFieldsMappingsMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import SwalAlert from '../../../../../../../../services/swalService/SwalService';
import { AddEditRequiredMappingConfigurationData } from '../config/AddEditRequiredMapping.data';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import FinalMolGrid from '../../../../../../../../components/FinalMolGrid/FinalMolGrid';

const RequiredMappingList = (props) => {
  const molGridRef = useRef();
  const { confirm } = SwalAlert();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [getApiEventRequiredFieldsMappings, { isLoading: isGetApiEventRequiredFieldsMappingsLoading, isSuccess: isGetApiEventRequiredFieldsMappingsSuccess, data: iGetApiEventRequiredFieldsMappingsData }] = useGetApiEventRequiredFieldsMappingsMutation();
  const [deleteApiEventRequiredFieldsMapping, { isSuccess: isDeleteApiEventRequiredFieldsMappingSuccess, data: isDeleteApiEventRequiredFieldsMappingData },] = useDeleteApiEventRequiredFieldsMappingMutation();

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
    getApiEventRequiredFieldsMappings(request);
  };

  useEffect(() => {
    if (isDeleteApiEventRequiredFieldsMappingSuccess && isDeleteApiEventRequiredFieldsMappingData) {
      ToastService.success(isDeleteApiEventRequiredFieldsMappingData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [getLists,isDeleteApiEventRequiredFieldsMappingSuccess, isDeleteApiEventRequiredFieldsMappingData]);

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
    if (isGetApiEventRequiredFieldsMappingsSuccess && iGetApiEventRequiredFieldsMappingsData) {
      if (iGetApiEventRequiredFieldsMappingsData) {
        setListData(iGetApiEventRequiredFieldsMappingsData.dataSource);
      }
      if (iGetApiEventRequiredFieldsMappingsData.totalRecord) {
        setTotalRowCount(iGetApiEventRequiredFieldsMappingsData.totalRecord);
      }
    }
  }, [isGetApiEventRequiredFieldsMappingsSuccess, iGetApiEventRequiredFieldsMappingsData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteApiEventRequiredFieldsMapping(data.apiEventRequiredFieldsMappingId);
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
      getApiEventRequiredFieldsMappings(request);
    }
  }, []);

  const actionHandler = {
    DELETE: handleDeleteClick
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData,
  }));

  return (
    <div className="row">
      <div className="col-md-12 table-striped api-provider api-partner">
        <FinalMolGrid
          ref={molGridRef}
          configuration={AddEditRequiredMappingConfigurationData}
          dataSource={listData}
          allowPagination={false}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isGetApiEventRequiredFieldsMappingsLoading}
          onActionChange={actionHandler}
        />
      </div>
    </div>
  )
}

export default RequiredMappingList