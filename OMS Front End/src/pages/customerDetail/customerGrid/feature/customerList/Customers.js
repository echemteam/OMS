/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import useDebounce from "../../../../../app/customHooks/useDebouce";
import { ListSupplier } from "../../../../../utils/Enums/commonEnums";
import ToastService from "../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../data/appMessages";
import { StatusEnums, StatusValue } from "../../../../../utils/Enums/StatusEnums";
import { CustomersList } from "./feature/CustomerList";
import CardSection from "../../../../../components/ui/card/CardSection";
import { BasicDetailContextProvider } from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import CustomerListContext from "../../../../../utils/ContextAPIs/Customer/CustomerListContext";
import { AllCustomerGridConfig, ApprovedCustomerGridConfig, PendingCustomerGridConfig, RejectedCustomerGridConfig, SubmittedCustomerGridConfig } from "../../../../../common/features/component/CustomerSupplierListConfig/CustomerSupplierListConfig.data";
import InActiveCustomerTab from "../customerInActiveTabs/InActiveCustomerTab";
import { useLocation } from "react-router-dom";

const Customers = () => {
  const listRef = useRef();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("0");
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");
  const [allManageData, setAllManageData] = useState(AllCustomerGridConfig);
  const [pendingManageData, setPendingManageData] = useState(PendingCustomerGridConfig);
  const [submittedManageData, setSubmittedManageData] = useState(SubmittedCustomerGridConfig);
  const [approvedManageData, setApprovedManageData] = useState(ApprovedCustomerGridConfig);
  const [rejectedCManageData, setRejectedCManageData] = useState(RejectedCustomerGridConfig);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    handleStorePaginationObj();
  };

  useEffect(() => {
    setSearch("");
    setSelectedDrpvalues("");
    setShouldRerenderFormCreator((prevState) => !prevState);
    // const selectedTab = getData("selectedTab");
    const tabIndex = activeTab;
    const updateManageData = () => {
      switch (activeTab) {
        case "0":
          setAllManageData({
            ...AllCustomerGridConfig,
            columns: AllCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "1":
          setPendingManageData({
            ...PendingCustomerGridConfig,
            columns: PendingCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "2":
          setSubmittedManageData({
            ...SubmittedCustomerGridConfig,
            columns: SubmittedCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "3":
          setApprovedManageData({
            ...ApprovedCustomerGridConfig,
            columns: ApprovedCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "4":
          setAllManageData({
            columns: []
          });
          break;
        case "5":
          setRejectedCManageData({
            ...RejectedCustomerGridConfig,
            columns: RejectedCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        default:
          setAllManageData(AllCustomerGridConfig);
      }
    };

    updateManageData(); // Initial update based on activeTab
    getListApi(); // Fetch data based on activeTab (if needed)
    // handleTabClick(tabIndex);
  }, [activeTab]);

  const handleStorePaginationObj = () => {
    const pagination = location.state?.paginationObj;
    if (listRef.current) {
      if (pagination) {
        const tabIndex = location.state?.tabIndex;
        listRef.current.getListApi(pagination.pagination, pagination.sortString, true);
        handleTabClick(tabIndex);
      } else {
        listRef.current.getListApi();
      }
    }
  }

  const handleSearch = () => {
    if (search.length >= 3 || selectedDrpvalues.length > 0) {
      handleStorePaginationObj();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage)
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      handleSearch();
    }
  }
  useEffect(() => {
    if (StatusValue) {
      const statusListData = StatusValue.map((item) => ({
        value: item.value,
        label: item.label,
      }));
      setStatusOptions(statusListData);
    }
  }, [StatusValue]);

  const handleChangeDropdown = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    if (selectedValues.length > 0) {
      setSelectedDrpvalues(selectedValues);
      setSelectedStatusOptions(selectedValues);
    } else {
      setSelectedDrpvalues("");
      setSelectedStatusOptions("");
    }
  }

  const handleClear = () => {
    setSelectedDrpvalues("");
    setSelectedStatusOptions("");
    setSearch("");
    setShouldRerenderFormCreator((prevState) => !prevState);
  };

  useEffect(() => {
    if (debouncedSearch === "" && selectedDrpvalues === "") {
      handleStorePaginationObj();
    }
  }, [debouncedSearch, selectedDrpvalues]);

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2 customer-list-all">
          <CustomersList
            statusId={selectedDrpvalues}
            configFile={allManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={true}
            handleSearch={handleSearch}
            handleClear={handleClear}
            shouldRerenderFormCreator={shouldRerenderFormCreator}
            handleKeyPress={handleKeyPress}
            tabIndex={0}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "PENDING",
      component: (
        <div className="mt-2 customer-list-all">
          <CustomersList
            statusId={StatusEnums.Pending}
            configFile={pendingManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
            handleSearch={handleSearch}
            handleClear={handleClear}
            shouldRerenderFormCreator={shouldRerenderFormCreator}
            handleKeyPress={handleKeyPress}
            tabIndex={1}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: (
        <div className="mt-2 customer-list-submitted customer-list-all">
          <CustomersList
            statusId={StatusEnums.Submitted}
            configFile={submittedManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
            handleSearch={handleSearch}
            handleClear={handleClear}
            shouldRerenderFormCreator={shouldRerenderFormCreator}
            handleKeyPress={handleKeyPress}
            tabIndex={2}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: (
        <div className="mt-2 customer-list-all">
          <CustomersList
            statusId={StatusEnums.Approved}
            configFile={approvedManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
            handleSearch={handleSearch}
            handleClear={handleClear}
            shouldRerenderFormCreator={shouldRerenderFormCreator}
            handleKeyPress={handleKeyPress}
            tabIndex={3}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2 inactive-list-sec">
          <InActiveCustomerTab
            statusId={[
              StatusEnums.Freeze,
              StatusEnums.Block,
              StatusEnums.Disable,
            ]}
            tabIndex={4}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "REJECTED",
      component: (
        <div className="mt-2 customer-list-all">
          <CustomersList
            statusId={StatusEnums.Reject}
            configFile={rejectedCManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
            handleSearch={handleSearch}
            handleClear={handleClear}
            shouldRerenderFormCreator={shouldRerenderFormCreator}
            handleKeyPress={handleKeyPress}
            tabIndex={5}
          />
        </div>
      ),
    },
  ];


  return (
    <BasicDetailContextProvider>
      <CustomerListContext.Provider value={{ listRef }}>
        <div className="main-customer-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab main-tab-header">
              <CardSection
              // cardTitle="Other Information"
              >
                <>
                  {tabs && tabs.length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="tab-section mb-0">
                          <div className="tab-header">
                            {tabs &&
                              tabs.map((tab, index) => (
                                <button
                                  key={index}
                                  className={
                                    activeTab === index.toString()
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleTabClick(index, tab.sPage)
                                  }
                                >
                                  {tab.sMenuItemCaption}
                                </button>
                              ))}
                          </div>
                          {activeTab !== -1 && tabs[activeTab].component && (
                            <div className="tab-content">
                              <div className="tab-body-section">
                                {tabs[activeTab].component}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </CardSection>
            </div>
          </div>
        </div>
      </CustomerListContext.Provider>
    </BasicDetailContextProvider>
  );
};

export default Customers;
