import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AllInActiveCustomerGridConfig, BlockedInActiveCustomerGridConfig, DisabledInActiveCustomerGridConfig, FreezedInActiveCustomerGridConfig } from "../../../../pages/customerDetail/customers/config/CustomerData";
import SupplierListContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext";
import { InActiveSuppliers } from "./InActiveSuppliers";
import { ListShowCustomer } from "../../../../utils/Enums/enums";
import { StatusEnums } from "../../../../utils/Enums/StatusEnums";


const InActiveSupplier = ({ statusId }) => {
  const [activeTab, setActiveTab] = useState("0");
  const DataRef = useRef();
  const [allManageData, setAllManageData] = useState(AllInActiveCustomerGridConfig);
  const [freezeManageData, setFrezzeManageData] = useState(FreezedInActiveCustomerGridConfig);
  const [blockManageData, setBlockManageData] = useState(BlockedInActiveCustomerGridConfig);
  const [disableManageData, setDisableManageData] = useState(DisabledInActiveCustomerGridConfig);

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
            columns: AllInActiveCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "1":
          setFrezzeManageData({
            ...FreezedInActiveCustomerGridConfig,
            columns: FreezedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "2":
          setBlockManageData({
            ...BlockedInActiveCustomerGridConfig,
            columns: BlockedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        case "3":
          setDisableManageData({
            ...BlockedInActiveCustomerGridConfig,
            columns: BlockedInActiveCustomerGridConfig.columns.filter(column => column.id !== ListShowCustomer.value)
          });
          break;
        default:
          setAllManageData(AllInActiveCustomerGridConfig);
      }
    };

    updateManageData(); // Initial update based on activeTab
    getListApi(); // Fetch data based on activeTab (if needed)
  }, [activeTab]);

  const tabs = [
    {
      sMenuItemCaption: "All",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={statusId} configFile={allManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Freezed",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Freeze} configFile={freezeManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Block",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Block} configFile={blockManageData} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Disable",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Disable} configFile={disableManageData} />
        </div>
      ),
    },
  ];

  return (
    <>
      <SupplierListContext.Provider value={{ DataRef }}>
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
      </SupplierListContext.Provider>
    </>
  );
};

export default InActiveSupplier;
