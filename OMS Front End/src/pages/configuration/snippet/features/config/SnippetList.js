/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useImperativeHandle, useRef, useState } from 'react'
import FinalMolGrid from '../../../../../components/FinalMolGrid/FinalMolGrid';
import { SnippedGridConfig } from './SnippetFormData';
import { useDeleteSnippetByIdMutation, useGetSnippetsMutation } from '../../../../../app/services/snippetAPI';
import ToastService from '../../../../../services/toastService/ToastService';
import SwalAlert from '../../../../../services/swalService/SwalService';
import PropTypes from 'prop-types';

const SnippedList = ({getDataRef,handleEditClick,handleSearch,handleChange, search,handleClear})=> {
 
  const [listData, setListData] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const molGridRef = useRef();
  const [getSnippets, { isLoading: isGetSnippetsListLoading, isSuccess: isGetSnippetsListSuccess, data: isGetSnippetsListData }] =useGetSnippetsMutation(); 
  const [deleteSnippet, { isSuccess: isDeleteSnippetSuccess, data: isDeleteSnippetData },] = useDeleteSnippetByIdMutation();
 
  useEffect(() => {
    onGetData()
  }, []);

  useEffect(() => {
    if (isGetSnippetsListSuccess && isGetSnippetsListData) {
      if (isGetSnippetsListData) {
        setListData(isGetSnippetsListData.dataSource);
      }
      if (isGetSnippetsListData.totalRecord) {
        setTotalRowCount(isGetSnippetsListData.totalRecord);
      }
    }
  }, [isGetSnippetsListSuccess, isGetSnippetsListData]);

  useEffect(() => {
    if (isDeleteSnippetSuccess && isDeleteSnippetData) {
      ToastService.success(isDeleteSnippetData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      handlePageChange(currentPageObject)
    }
  }, [isDeleteSnippetSuccess, isDeleteSnippetData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel")
      .then((confirmed) => {
        if (confirmed) {
          deleteSnippet(data.snippetId);
        }
      });
  };

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: search },
      sortString: sortingString,
    };
    getSnippets(request);
  };
  
  useEffect(() => {
  if (search === "" ) {
    onGetData();
  }
  }, [search]);

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

  const actionHandler = {
    EDIT: handleEditClick,
    DELETE: handleDeleteClick,
  };

  useImperativeHandle(getDataRef, () => ({
    callChildFunction: onGetData
  }));


    return (
      <div>
        <div className="row">
          <div className="col-md-12 table-striped">
            <FinalMolGrid
              ref={molGridRef}
              configuration={SnippedGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 25,
                currentPage: 1,
              }}
               onPageChange={handlePageChange}
              onSorting={handleSorting}
               isLoading={isGetSnippetsListLoading}
           onActionChange={actionHandler}
           searchTitleButtonClick={handleSearch}
           handleChange={handleChange}
           handleClear={handleClear}
            />
          </div>
        </div>
      </div>
    )
  }

  SnippedList.propTypes = {
    getDataRef: PropTypes.shape({
      current: PropTypes.object,
    }),  
    handleEditClick: PropTypes.func.isRequired,  
    handleSearch: PropTypes.func.isRequired,  
    handleChange: PropTypes.func.isRequired, 
    search: PropTypes.string.isRequired,  
    handleClear: PropTypes.func.isRequired,  
  };

 export default SnippedList;