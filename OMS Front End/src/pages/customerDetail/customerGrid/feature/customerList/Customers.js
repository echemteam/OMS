/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import KeyCodes from "../../../../../utils/Enums/KeyCodesEnums";

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

  // const debouncedSearch = useDebounce(search, 300);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const getListApi = () => {
    handleStorePaginationObj();
  };

  useEffect(() => {
    setSearch("");
    setSelectedDrpvalues("");
    setShouldRerenderFormCreator((prevState) => !prevState);

    const tabConfigMap = {
      0: { config: AllCustomerGridConfig, setState: setAllManageData },
      1: { config: PendingCustomerGridConfig, setState: setPendingManageData },
      2: { config: SubmittedCustomerGridConfig, setState: setSubmittedManageData },
      3: { config: ApprovedCustomerGridConfig, setState: setApprovedManageData },
      4: { config: { columns: [] }, setState: setAllManageData },
      5: { config: RejectedCustomerGridConfig, setState: setRejectedCManageData }
    };
    const { config, setState } = tabConfigMap[activeTab] || { config: AllCustomerGridConfig, setState: setAllManageData };
    setState({
      ...config,
      columns: config.columns ? config.columns.filter(column => column.id !== ListSupplier.value) : []
    });

    getListApi();
  }, [activeTab]);


  const handleStorePaginationObj = () => {
    const pagination = location.state?.paginationObj;
    if (listRef.current) {
      if (pagination) {
        const tabIndex = location.state?.tabIndex;
        listRef.current.getListApi(pagination.pagination, pagination.sortString, true);
        handleTabClick(tabIndex);
      }
      else {
        listRef.current.getListApi();
      }
    }
  }

  const handleSearch = useCallback(() => {
    if (search.length >= 3 || selectedDrpvalues.length > 0) {
      handleStorePaginationObj();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage);
    }
  }, [search, selectedDrpvalues]);

  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === KeyCodes.ENTER) {
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
    if (search === "" && selectedDrpvalues === "") {
      handleStorePaginationObj();
    }
  }, [search, selectedDrpvalues]);

  const createCustomersList = (statusId, configFile, searchStatusFilter, tabIndex) => (
    <div className="mt-2 customer-list-all">
      <CustomersList
        statusId={statusId}
        configFile={configFile}
        search={search}
        handleChange={handleChange}
        statusOptions={statusOptions}
        selectedStatusOptions={selectedStatusOptions}
        handleChangeDropdown={handleChangeDropdown}
        selectedDrpvalues={selectedDrpvalues}
        searchStatusFilter={searchStatusFilter}
        handleSearch={handleSearch}
        handleClear={handleClear}
        shouldRerenderFormCreator={shouldRerenderFormCreator}
        handleKeyPress={handleKeyPress}
        tabIndex={tabIndex}
      />
    </div>
  );

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: createCustomersList(selectedDrpvalues, allManageData, true, 0),
    },
    {
      sMenuItemCaption: "PENDING",
      component: createCustomersList(StatusEnums.Pending, pendingManageData, false, 1),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: createCustomersList(StatusEnums.Submitted, submittedManageData, false, 2),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: createCustomersList(StatusEnums.Approved, approvedManageData, false, 3),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2 inactive-list-sec">
          <InActiveCustomerTab
            statusId={[StatusEnums.Freeze, StatusEnums.Block, StatusEnums.Disable]}
            tabIndex={4}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "REJECTED",
      component: createCustomersList(StatusEnums.Reject, rejectedCManageData, false, 5),
    },
  ];


  return (
    <BasicDetailContextProvider>
      <CustomerListContext.Provider value={{ listRef }}>
        <div className="main-customer-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab main-tab-header">
              <CardSection>
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
