import { useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import Orders from "./Orders";
import { OrderSubStatusEnums } from "../../../../utils/Enums/StatusEnums";

const PendingOrdersTab=({statusId})=>{
    const [activeTab, setActiveTab] = useState("0");
       const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex.toString());
      };
     
    const tabs = [
        {
          sMenuItemCaption: "Customer Not valid",
          component: (
            <div className="mt-2">
              <Orders orderStatusId={statusId}
                          orderSubStatusId={OrderSubStatusEnums.CustomerNotValid}
              />
            </div>
          ),
        },
        {
          sMenuItemCaption: "Review pending",
          component: (
            <div className="mt-2">
              <Orders  orderStatusId={statusId} orderSubStatusId={OrderSubStatusEnums.ReviewPending}
              />
            </div>
          ),
        },
        {
          sMenuItemCaption: "Billing Address Pending Approval",
          component: (
            <div className="mt-2">
              <Orders orderStatusId={statusId}  orderSubStatusId={OrderSubStatusEnums.BillingAddressPendingApproval}
              />
            </div>
          ),
        },
       
      ];
    
    return(     <div className="main-inactive-grid">
    <div className="row">
      <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab sub-tab-section">
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
  </div>)
    }
    export default PendingOrdersTab;