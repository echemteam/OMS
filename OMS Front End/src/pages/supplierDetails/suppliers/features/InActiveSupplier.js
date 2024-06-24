import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AllInActiveCustomerGridConfig, BlockedInActiveCustomerGridConfig, DisabledInActiveCustomerGridConfig, FreezedInActiveCustomerGridConfig } from "../../../../pages/customerDetail/customers/config/CustomerData";
import { StatusEnums } from "../../../../common/features/Enums/StatusEnums";
import SupplierListContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext";
import { InActiveSuppliers } from "./InActiveSuppliers";

const InActiveSupplier = ({ statusId }) => {
  const [activeTab, setActiveTab] = useState("0");
  const DataRef = useRef();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (DataRef.current) {
      DataRef.current.getListApi();
    }
  };

  useEffect(() => {
    getListApi();
  }, [activeTab]);

  const tabs = [
    {
      sMenuItemCaption: "All",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={statusId} configFile={AllInActiveCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Freezed",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Freeze} configFile={FreezedInActiveCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Block",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Block} configFile={BlockedInActiveCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Disable",
      component: (
        <div className="mt-2">
          <InActiveSuppliers statusId={StatusEnums.Disable} configFile={DisabledInActiveCustomerGridConfig} />
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
