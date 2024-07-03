import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { CustomersList } from "./features/CustomersList";
import CustomerContext from "../../../utils/ContextAPIs/Customer/CustomerListContext";
import { StatusEnums } from "../../../common/features/Enums/StatusEnums";
import {
  AllCustomerGridConfig,
  ApprovedCustomerGridConfig,
  PendingCustomerGridConfig,
  RejectedCustomerGridConfig,
  SubmittedCustomerGridConfig,
} from "./config/CustomerData";
import InActiveCustomer from "./features/InActiveCustomer";
import { BasicDetailContextProvider } from "../../../utils/ContextAPIs/Customer/BasicDetailContext";

const Customers = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const listRef = useRef();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (listRef.current) {
      listRef.current.getListApi();
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
          <CustomersList
            statusId={StatusEnums.ALL}
            configFile={AllCustomerGridConfig}
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
            configFile={PendingCustomerGridConfig}
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
            configFile={SubmittedCustomerGridConfig}
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
            configFile={ApprovedCustomerGridConfig}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2 inactive-list-sec">
          <InActiveCustomer
            statusId={[
              StatusEnums.Freeze,
              StatusEnums.Block,
              StatusEnums.Disable,
            ]}
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
            configFile={RejectedCustomerGridConfig}
          />
        </div>
      ),
    },
  ];


  return (
    <BasicDetailContextProvider>
      <CustomerContext.Provider value={{ listRef }}>
        <div className="main-customer-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
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
      </CustomerContext.Provider>
    </BasicDetailContextProvider>
  );
};

export default Customers;
