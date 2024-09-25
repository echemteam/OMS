/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useImperativeHandle, useRef } from "react";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";
import { EmailTemplateGridConfig } from "../config/EmailTemplate.data";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useGetEmailTemplatesListMutation } from "../../../../app/services/emailTemplateAPI";

const EmailTemplateList=({getDataRef,handleEditClick,handleSearch,handleChange, search,handleClear})=>{
    const molGridRef = useRef();
    const [listData, setListData] = useState([]);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [getEmailTemplatesList, { isLoading: isEmailTemplatesListLoading, isSuccess: isEmailTemplatesListSuccess, data: isEmailTemplatesListData },] = useGetEmailTemplatesListMutation();

    useEffect(() => {
        onGetData()
      }, []);
    
      useEffect(() => {
        if (isEmailTemplatesListSuccess && isEmailTemplatesListData) {
          if (isEmailTemplatesListData) {
            setListData(isEmailTemplatesListData.dataSource);
          }
          if (isEmailTemplatesListData.totalRecord) {
            setTotalRowCount(isEmailTemplatesListData.totalRecord);
          }
        }
      }, [isEmailTemplatesListSuccess, isEmailTemplatesListData]);

      const getLists = (pageObject, sortingString) => {
        const request = {
          pagination: {
            pageNumber: pageObject.pageNumber,
            pageSize: pageObject.pageSize,
          },
          filters: { searchText: search },
          sortString: sortingString,
        };
        getEmailTemplatesList(request);
      };
      
  useEffect (() => {
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
       
      };
    
      useImperativeHandle(getDataRef, () => ({
        callChildFunction: onGetData
      }));
    return(
        <div className="row">
          <div className="col-md-12 table-striped">
            <FinalMolGrid
              ref={molGridRef}
              configuration={EmailTemplateGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 25,
                currentPage: 1,
              }}
               onPageChange={handlePageChange}
              onSorting={handleSorting}
               isLoading={isEmailTemplatesListLoading}
           onActionChange={actionHandler}
           searchTitleButtonClick={handleSearch}
           handleChange={handleChange}
           handleClear={handleClear}
            />
          </div>
        </div>)
}
EmailTemplateList.propTypes = {
  getDataRef: PropTypes.shape({
      current: PropTypes.shape({
          callChildFunction: PropTypes.func
      })
  }).isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleClear: PropTypes.func.isRequired,
};
export default EmailTemplateList;