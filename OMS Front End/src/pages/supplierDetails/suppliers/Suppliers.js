import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { StatusEnums } from "../../../common/features/Enums/StatusEnums";
import SupplierList from "./features/SupplierList";
import InActiveSupplier from "./features/InActiveSupplier";
import { AllCustomerGridConfig, ApprovedCustomerGridConfig, PendingCustomerGridConfig, RejectedCustomerGridConfig, SubmittedCustomerGridConfig } from "../../../pages/customerDetail/customers/config/CustomerData";
import SupplierListContext from '../../../utils/ContextAPIs/Supplier/SupplierListContext'

const Suppliers = () => {
  const [activeTab, setActiveTab] = useState("0");
  const supplierListRef = useRef();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (supplierListRef.current) {
      supplierListRef.current.getListApi();
    }
  };

  useEffect(() => {
    getListApi();
  }, [activeTab]);

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2 customer-list-all">
          <SupplierList statusId={StatusEnums.ALL} configFile={AllCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "PENDING",
      component: (
        <div className="mt-2">
          <SupplierList statusId={StatusEnums.Pending} configFile={PendingCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: (
        <div className="mt-2 customer-list-submitted">
          <SupplierList statusId={StatusEnums.Submitted} configFile={SubmittedCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: (
        <div className="mt-2">
          <SupplierList statusId={StatusEnums.Approved} configFile={ApprovedCustomerGridConfig} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2">
          <InActiveSupplier statusId={[StatusEnums.Freeze, StatusEnums.Block, StatusEnums.Disable]} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "REJECTED",
      component: (
        <div className="mt-2">
          <SupplierList statusId={StatusEnums.Reject} configFile={RejectedCustomerGridConfig} />
        </div>
      ),
    },
  ];
  return (
    <>
      <SupplierListContext.Provider value={{ supplierListRef }}>
        <div className="main-customer-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
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
    </>
  );
};

export default Suppliers;
