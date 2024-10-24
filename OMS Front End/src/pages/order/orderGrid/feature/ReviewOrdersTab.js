import { useState } from "react";
import Orders from "./Orders";
import CardSection from "../../../../components/ui/card/CardSection";
import { OrderItemStatusEnum } from "../../../../utils/Enums/StatusEnums";

const ReviewOrdersTab=({statusId})=>{
    const [activeTab, setActiveTab] = useState("0");
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex.toString());
      };
    
    const tabs = [
        {
          sMenuItemCaption: "PRICE VERIFICATION",
          component: (
            <div className="mt-2">
              <Orders  orderStatusId={statusId} orderItemStatusId={OrderItemStatusEnum.PriceVerification}
              
              />
            </div>
          ),
        },
        {
          sMenuItemCaption: "STOCK VERIFICATION",
          component: (
            <div className="mt-2">
              <Orders  orderStatusId={statusId} orderItemStatusId={OrderItemStatusEnum.StockVerifiaction}
                
              />
            </div>
          ),
        },
       
      ];
    
    return(     <div className="main-inactive-grid">
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
  </div>)
}
export default ReviewOrdersTab;