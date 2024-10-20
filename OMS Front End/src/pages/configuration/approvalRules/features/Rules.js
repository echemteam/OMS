/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useGetApprovalConfigurationRulesMutation } from "../../../../app/services/configurationAPI";
import { rulesListData } from "./config/RulesForm.data";
import FinalMolGrid from "../../../../components/FinalMolGrid/FinalMolGrid";

const Rules = (props) => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [getApprovalConfigurationRules, { isLoading: isGetApprovalConfigurationRulesLoading, isSuccess: isGetApprovalConfigurationRulesSuccess, data: isGetApprovalConfigurationRulesData }] = useGetApprovalConfigurationRulesMutation();

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: props.search },
      sortString: sortingString,
       functionalityId: props.selectedDrpvalues ? props.selectedDrpvalues :0
    
    };
    getApprovalConfigurationRules(request);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };

  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  };

  useEffect(() => {
    if (isGetApprovalConfigurationRulesSuccess && isGetApprovalConfigurationRulesData) {
      if (isGetApprovalConfigurationRulesData) {
        setListData(isGetApprovalConfigurationRulesData.dataSource);
      }
      if (isGetApprovalConfigurationRulesData.totalRecord) {
        setTotalRowCount(isGetApprovalConfigurationRulesData.totalRecord);
      }
    }
  }, [isGetApprovalConfigurationRulesSuccess, isGetApprovalConfigurationRulesData]);

  useEffect(() => {
    if (molGridRef.current) {
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      const currentsortingString = molGridRef.current.generateSortingString();
      const request = {
        pagination: {
          pageNumber: currentPageObject.pageNumber,
          pageSize: currentPageObject.pageSize,
        },
        filters: { searchText: props.search },
        sortString: currentsortingString,
        functionalityId: props.selectedDrpvalues ? props.selectedDrpvalues :0
      };
      getApprovalConfigurationRules(request);
    }
  }, []);


  const onGetData = () => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject, molGridRef.current.generateSortingString());
    }
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData,
  }));


  const handleEditClick = (data) => {
    if (props.onEdit) {
      props.onEdit(data);
    }
  }
  useEffect (() => {
    if (props.selectedDrpvalues === "" ) {
       onGetData();
    }
  }, [props.selectedDrpvalues]);

  const actionHandler = {
    EDIT: handleEditClick
  }
  useEffect (() => {
    if (props.search === "" ) {
       onGetData();
    }
  }, [props.search]);

  return (
     
      <div className="row">
        <div className="col-md-12 table-striped api-provider">
          <FinalMolGrid
            ref={molGridRef}
            configuration={rulesListData}
            dataSource={listData}
            allowPagination={true}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 25,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
            onSorting={handleSorting}
            isLoading={isGetApprovalConfigurationRulesLoading}
            onActionChange={actionHandler}
            searchTitleButtonClick={props.handleSearch}
            handleChange={props.handleChange}
            handleClear={props.handleClear}
          />
        </div>
      </div>
     
  );
};
Rules.propTypes = {
  childRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildFunction: PropTypes.func,
    }),
  }),
  onEdit: PropTypes.func,
};
export default Rules;
