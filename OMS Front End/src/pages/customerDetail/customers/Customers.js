import React, { useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { useNavigate } from "react-router-dom";
import InActiveCustomer from "./features/InActiveCustomer";
import { AllCustomer } from "./features/AllCustomer";
import { PendingCustomer } from "./features/PendingCustomer";
import { SubmittedCustomer } from "./features/SubmittedCustomer";
import { ApprovedCustomer } from "./features/ApprovedCustomer";

const Customers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex, navigationPath) => {
    setActiveTab(tabIndex);
    navigate(navigationPath);
  };

  const tabs = [
    {
      sMenuItemCaption: "ALL",
      component: (
        <div className="mt-2">
          <AllCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "PENDING",
      component: (
        <div className="mt-2">
          <PendingCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "SUBMITTED",
      component: (
        <div className="mt-2">
          <SubmittedCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "APPROVED",
      component: (
        <div className="mt-2">
          <ApprovedCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "INACTIVE",
      component: (
        <div className="mt-2">
          <InActiveCustomer />
        </div>
      ),
    },

  ];
  return (
    <>
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
                              className={activeTab === index ? "active" : ""}
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
    </>
  );
};

export default Customers;
