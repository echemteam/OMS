import React, { useRef, useState } from 'react'

import CardSection from '../../../components/ui/card/CardSection';
import InApprovalOrdersTab from './feature/InApprovalOrdersTab';
import PendingOrdersTab from './feature/PendingOrdersTab';
import ReviewOrdersTab from './feature/ReviewOrdersTab';


const OrderList = () => {
    const listRef=useRef();
    const [activeTab, setActiveTab] = useState("0");

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex.toString());
      };
    const tabs = [
        {
          sMenuItemCaption: " Pending Order",
          component: (
            <div className="mt-2 customer-list-all">
            <PendingOrdersTab />
            </div>
          ),
        },
        {
          sMenuItemCaption: " Review Order ",
          component: (
            <div className="mt-2 customer-list-all">
                     <ReviewOrdersTab/>        
            </div>
          ),
        },
        {
          sMenuItemCaption: "In Approval ",
          component: (
            <div className="mt-2 customer-list-submitted customer-list-all">
             <InApprovalOrdersTab/>
              
            </div>
          ),
        },
      
      ];

    return (
        // <div>
        //     <Orders />
        // </div>
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
    )
}

export default OrderList