/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
//** Lib's */
import { ErrorMessage } from "../../../../../data/appMessages";
import { ListShowCustomer } from "../../../../../utils/Enums/commonEnums";

import CardSection from "../../../../../components/ui/card/CardSection";
import { StatusEnums, StatusValue } from "../../../../../utils/Enums/StatusEnums";
import SupplierListContext from '../../../../../utils/ContextAPIs/Supplier/SupplierListContext'
import { AddSupplierContextProvider } from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";

//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { AllCustomerGridConfig, ApprovedCustomerGridConfig, PendingCustomerGridConfig, RejectedCustomerGridConfig, SubmittedCustomerGridConfig } from "../../../../../common/features/component/CustomerSupplierListConfig/CustomerSupplierListConfig.data";
import KeyCodes from "../../../../../utils/Enums/KeyCodesEnums";
//** Component's */
const SupplierList = React.lazy(() => import("./feature/SupplierList"));
const InActiveSupplierTab = React.lazy(() => import("../InActiveTabs/InActiveSupplierTab"));

const Suppliers = () => {
  const [activeTab, setActiveTab] = useState("0");
  const supplierListRef = useRef();
  const [search, setSearch] = useState("");
  const [allManageData, setAllManageData] = useState(AllCustomerGridConfig);
  const [pendingManageData, setPendingManageData] = useState(PendingCustomerGridConfig);
  const [submittedManageData, setSubmittedManageData] = useState(SubmittedCustomerGridConfig);
  const [approvedManageData, setApprovedManageData] = useState(ApprovedCustomerGridConfig);
  const [rejectedCManageData, setRejectedCManageData] = useState(RejectedCustomerGridConfig);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  //const debouncedSearch = useDebounce(search, 300);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (supplierListRef.current) {
      supplierListRef.current.getListApi();
    }
  };

  useEffect(() => {
    setSearch("");
    setSelectedDrpvalues("");
    const updateManageData = () => {
      switch (activeTab) {
        case "0":
          setAllManageData({
            ...AllCustomerGridConfig,
            columns: AllCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "1":
          setPendingManageData({
            ...PendingCustomerGridConfig,
            columns: PendingCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "2":
          setSubmittedManageData({
            ...SubmittedCustomerGridConfig,
            columns: SubmittedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "3":
          setApprovedManageData({
            ...ApprovedCustomerGridConfig,
            columns: ApprovedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
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
            columns: RejectedCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        default:
          setAllManageData(AllCustomerGridConfig);
      }
    };

    updateManageData(); // Initial update based on activeTab
    getListApi(); // Fetch data based on activeTab (if needed)
  }, [activeTab]);

  const handleSearch = useCallback(() => {
    if (search.length >= 3 || selectedDrpvalues.length > 0) {
      getListApi();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage);
    }
  }, [search, selectedDrpvalues]);

  const handleChange = (event) => {
   
    setSearch(event.target.value.trim());
  
  };
  const handleKeyPress=(event)=>{   
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
  };

  const handleClear = () => {
    setSelectedDrpvalues("");
    setSelectedStatusOptions("");
    setSearch("");
    setShouldRerenderFormCreator((prevState) => !prevState);
  };

  useEffect(() => {
    if (search === "" && selectedDrpvalues === "") {
      getListApi();
    }
  }, [search, selectedDrpvalues]);

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={selectedDrpvalues} configFile={allManageData}
            search={search}
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
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "PENDING",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Pending} configFile={pendingManageData}
            search={search}
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
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: (
        <div className="mt-2 customer-list-submitted customer-list-all">
          <SupplierList statusId={StatusEnums.Submitted} configFile={submittedManageData}
            search={search}
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

          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Approved} configFile={approvedManageData}
            search={search}
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

          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2 inactive-list-sec">
          <InActiveSupplierTab statusId={[StatusEnums.Freeze, StatusEnums.Block, StatusEnums.Disable]} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "REJECTED",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.Reject} configFile={rejectedCManageData}
            search={search}
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

          />
        </div>
      ),
    },
  ];
  return (
    <>
      <AddSupplierContextProvider>
        <SupplierListContext.Provider value={{ supplierListRef }}>
          <div className="main-customer-grid">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab main-tab-header">
                <CardSection
                // cardTitle="Other Information"
                >
                  <>
                    {tabs && tabs.length > 0 &&
                      <div className="row">
                        <div className="col-12">
                          <div className="tab-section mb-0">
                            <div className="tab-header">
                              {tabs && tabs.map((tab, index) => (
                                <button
                                  key={index}
                                  className={activeTab === index.toString() ? "active" : ""}
                                  onClick={() => handleTabClick(index, tab.sPage)}
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
                    }
                  </>
                </CardSection>
              </div>
            </div>
          </div>
        </SupplierListContext.Provider>
      </AddSupplierContextProvider>
    </>
  );
};

export default Suppliers;
