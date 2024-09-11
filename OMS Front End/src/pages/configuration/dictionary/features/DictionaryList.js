/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState , useImperativeHandle} from "react";
import { DictionaryGridConfig } from "../config/Dictionary.Data";
import ToastService from "../../../../services/toastService/ToastService";
import SwalAlert from "../../../../services/swalService/SwalService";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";
import { useDeleteDictionaryMutation, useGetAllDictionaryMutation } from "../../../../app/services/dictionaryAPI";
import PropTypes from 'prop-types';

const DictionaryList = ({ handleEditClick, getDataRef  }) => {

  const molGridRef = useRef();
  const [listData, setListData] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const [deleteDictionary, { isSuccess: isDeleteDictionarySuccess, data: isDeleteDictionaryData },] = useDeleteDictionaryMutation();
  const [GetAllDictionary, { isLoading: isDictionaryLoading, isSuccess: isDictionarySuccess, data: isDictionaryData },] = useGetAllDictionaryMutation();

  useEffect(() => {
    onGetData()
  }, []);

  useEffect(() => {
    if (isDictionarySuccess && isDictionaryData) {
      if (isDictionaryData) {
        setListData(isDictionaryData.dataSource);
      }
      if (isDictionaryData.totalRecord) {
        setTotalRowCount(isDictionaryData.totalRecord);
      }
    }
  }, [isDictionarySuccess, isDictionaryData]);

  useEffect(() => {
    if (isDeleteDictionarySuccess && isDeleteDictionaryData) {
      ToastService.success(isDeleteDictionaryData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      handlePageChange(currentPageObject)
    }
  }, [isDeleteDictionarySuccess, isDeleteDictionaryData]);


  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
    };
    GetAllDictionary(request);
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
          deleteDictionary(data.dictionaryId);
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
      <div className="col-md-12 table-striped">
        <FinalMolGrid
          ref={molGridRef}
          configuration={DictionaryGridConfig}
          dataSource={listData}
          allowPagination={true}
          pagination={{
            totalCount: totalRowCount,
            pageSize: 20,
            currentPage: 1,
          }}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
          isLoading={isDictionaryLoading}
          onActionChange={actionHandler}
        />
      </div>
    </div>
  )
}

DictionaryList.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  getDataRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  handleListData: PropTypes.func.isRequired,
};
export default DictionaryList;