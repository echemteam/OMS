import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { InActiveCustomers } from "./InActiveCustomers";
import CustomerContext from "../../../../utils/ContextAPIs/Customer/CustomerListContext"
import { AllInActiveCustomerGridConfig, BlockedInActiveCustomerGridConfig, DisabledInActiveCustomerGridConfig, FreezedInActiveCustomerGridConfig } from "../config/CustomerData";
import useDebounce from "../../../../app/customHooks/useDebouce";
import { ListSupplier } from "../../../../utils/Enums/enums";
import { StatusEnums, StatusValue } from "../../../../utils/Enums/StatusEnums";

const InActiveCustomer = ({ statusId }) => {
  const [activeTab, setActiveTab] = useState("0");
  const DataRef = useRef();
  const [search, setSearch] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");

  const [allManageData, setAllManageData] = useState(AllInActiveCustomerGridConfig);
  const [freezeManageData, setFrezzeManageData] = useState(FreezedInActiveCustomerGridConfig);
  const [blockManageData, setBlockManageData] = useState(BlockedInActiveCustomerGridConfig);
  const [disableManageData, setDisableManageData] = useState(DisabledInActiveCustomerGridConfig);
  const debouncedSearch = useDebounce(search, 300);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (DataRef.current) {
      DataRef.current.getListApi();
    }
  };

  useEffect(() => {
    const updateManageData = () => {
      switch (activeTab) {
        case "0":
          setAllManageData({
            ...AllInActiveCustomerGridConfig,
            columns: AllInActiveCustomerGridConfig.columns.filter(column => column.id !== ListSupplier.value)
          });
          break;
        case "1":
          setFrezzeManageData({
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

  const handleChange = (event) => {
    const value = event.target.value;
    // if (value.length >= 3) {
    setSearch(value.trim());
    // }
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
    setSelectedDrpvalues(selectedValues);
    setSelectedStatusOptions(selectedValues);
  };

  const tabs = [
    {
      sMenuItemCaption: "All",
      component: (
        <div className="mt-2">
          <InActiveCustomers
            statusId={statusId}
            configFile={allManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={true}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Freezed",
      component: (
        <div className="mt-2">
          <InActiveCustomers
            statusId={StatusEnums.Freeze}
            configFile={freezeManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Block",
      component: (
        <div className="mt-2">
          <InActiveCustomers
            statusId={StatusEnums.Block}
            configFile={blockManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Disable",
      component: (
        <div className="mt-2">
          <InActiveCustomers
            statusId={StatusEnums.Disable}
            configFile={disableManageData}
            search={debouncedSearch}
            handleChange={handleChange}
            statusOptions={statusOptions}
            selectedStatusOptions={selectedStatusOptions}
            handleChangeDropdown={handleChangeDropdown}
            selectedDrpvalues={selectedDrpvalues}
            searchStatusFilter={false}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <CustomerContext.Provider value={{ DataRef }}>
        <div className="main-inactive-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
              <CardSection
              //   cardTitle="Other Information"
              >
                <>
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
                </>
              </CardSection>
            </div>
          </div>
        </div>
      </CustomerContext.Provider>
    </>
  );
};

export default InActiveCustomer;
