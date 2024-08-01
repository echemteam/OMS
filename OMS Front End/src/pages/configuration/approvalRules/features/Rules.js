import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useGetApprovalConfigurationRulesMutation } from "../../../../app/services/configurationAPI";
import MolGrid from "../../../../components/Grid/MolGrid";
import { rulesListData } from "./config/RulesForm.data";

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
      filters: { searchText: "" },
      sortString: sortingString,
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
        filters: { searchText: "" },
        sortString: currentsortingString,
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

  const actionHandler = {
    EDIT: handleEditClick
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12 table-striped api-provider">
          <MolGrid
            ref={molGridRef}
            configuration={rulesListData}
            dataSource={listData}
            allowPagination={true}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 20,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
            onSorting={handleSorting}
            isLoading={isGetApprovalConfigurationRulesLoading}
            onActionChange={actionHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Rules;
