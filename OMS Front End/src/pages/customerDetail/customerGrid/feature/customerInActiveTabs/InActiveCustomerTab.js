import React, { useCallback, useEffect, useRef, useState } from "react";
import { ListSupplier } from "../../../../../utils/Enums/commonEnums";
import ToastService from "../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../data/appMessages";
import { StatusEnums, StatusValue } from "../../../../../utils/Enums/StatusEnums";
import InActiveCustomersList  from "../customerInActiveTabs/feature/InActiveCustomersList";
import CardSection from "../../../../../components/ui/card/CardSection";
import CustomerListContext from "../../../../../utils/ContextAPIs/Customer/CustomerListContext";
import { AllInActiveCustomerGridConfig, BlockedInActiveCustomerGridConfig, DisabledInActiveCustomerGridConfig, FreezedInActiveCustomerGridConfig } from "../../../../../common/features/component/CustomerSupplierListConfig/CustomerSupplierListConfig.data";
import PropTypes from 'prop-types';
import KeyCodes from "../../../../../utils/Enums/KeyCodesEnums";


const InActiveCustomerTab = ({ statusId }) => {
  const [activeTab, setActiveTab] = useState("0");
  const DataRef = useRef();
  const [search, setSearch] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [allManageData, setAllManageData] = useState(AllInActiveCustomerGridConfig);
  const [freezeManageData, setFreezeManageData] = useState(FreezedInActiveCustomerGridConfig);
  const [blockManageData, setBlockManageData] = useState(BlockedInActiveCustomerGridConfig);
  const [disableManageData, setDisableManageData] = useState(DisabledInActiveCustomerGridConfig);
  // const debouncedSearch = useDebounce(search, 300);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (DataRef.current) {
      DataRef.current.getListApi();
    }
  };

  useEffect(() => {
    setSearch("");
    setSelectedDrpvalues("");
    const updateManageData = () => {
      switch (activeTab) {
        case "0":
          setAllManageData({
            ...AllInActiveCustomerGridConfig,
            columns: AllInActiveCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "1":
          setFreezeManageData({
            ...FreezedInActiveCustomerGridConfig,
            columns: FreezedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "2":
          setBlockManageData({
            ...BlockedInActiveCustomerGridConfig,
            columns: BlockedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "3":
          setDisableManageData({
            ...BlockedInActiveCustomerGridConfig,
            columns: BlockedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        default:
          setAllManageData(AllInActiveCustomerGridConfig);
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
      const statusListData = StatusValue.filter((data) => data.value !== 1 && data.value !== 2 && data.value !== 3 && data.value !== 7).map((item) => ({
        value: item.value,
        label: item.label,
      }));
      setStatusOptions(statusListData);
    }
  }, []);

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
  }, [search , selectedDrpvalues]);

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2">
          <InActiveCustomersList
            statusId={statusId}
            configFile={allManageData}
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
      sMenuItemCaption: "FREEZED",
      component: (
        <div className="mt-2">
          <InActiveCustomersList
            statusId={StatusEnums.Freeze}
            configFile={freezeManageData}
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
      sMenuItemCaption: "BLOCK",
      component: (
        <div className="mt-2">
          <InActiveCustomersList
            statusId={StatusEnums.Block}
            configFile={blockManageData}
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
      sMenuItemCaption: "DISABLE",
      component: (
        <div className="mt-2">
          <InActiveCustomersList
            statusId={StatusEnums.Disable}
            configFile={disableManageData}
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
      <CustomerListContext.Provider value={{ DataRef }}>
        <div className="main-inactive-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
              <CardSection
              //   cardTitle="Other Information"
              >
                
                  {tabs && tabs.length > 0 &&
                    <div className="row">
                      <div className="col-12">
                        <div className="tab-sub-section mb-0">
                          <div className="tab-sub-header">
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
                            <div className="tab-sub-content">
                              <div className="tab-sub-body-section">
                                {tabs[activeTab].component}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                
              </CardSection>
            </div>
          </div>
        </div>
      </CustomerListContext.Provider>
    </>
  );
};

InActiveCustomerTab.propTypes = {
  statusId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InActiveCustomerTab;
