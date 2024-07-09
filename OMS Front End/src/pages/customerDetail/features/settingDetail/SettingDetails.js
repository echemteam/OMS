/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
//** Lib's */
import "./SettingDetails.scss"
import ShippingSettings from "./features/ShippingSetting/ShippingSettings";
import FinancialSettings from "./FinancialSettings";
import CardSection from "../../../../components/ui/card/CardSection";
import { securityKey } from "../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { useEffect } from "react";
import Unauthorize from "../../../unauthorize/Unauthorize";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const SettingDetails = ({ isEditablePage }) => {
  const [activeTab, setActiveTab] = useState("0");
  const [showFinacialTab, setShowFinacialTab] = useState(false);
  const [showShippingTab, setShowShippingTab] = useState(false);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };
  const { isResponsibleUser } = useContext(BasicDetailContext);

  const hasShippingPermission = hasFunctionalPermission(securityKey.CUSTOMERSHIPPINGSETTING);
  const hasFinacialPermission = hasFunctionalPermission(securityKey.CUSTOMERFINANCIALSETTING);

  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasShippingPermission.hasAccess === true) {
        setShowShippingTab(true);
      } else {
        setShowShippingTab(false);
      }
    } else {
      setShowShippingTab(true);
    }
  }, [hasShippingPermission]);

  useEffect(() => {
    if (!isResponsibleUser) {
      if (hasFinacialPermission.hasAccess === true) {
        setShowFinacialTab(true);
      } else {
        setShowFinacialTab(false);
      }
    }
    else {
      setShowFinacialTab(true);
    }
  }, [hasFinacialPermission]);

  const tabs = [
    {
      sMenuItemCaption: "Financial",
      component: (
        <div className="mt-2 financial-sec">
          {showFinacialTab ?
            <FinancialSettings isEditablePage={isEditablePage} /> :
            <Unauthorize />
          }
        </div>
      ),
    },
    {
      sMenuItemCaption: "Shipping",
      component: (
        <div className="mt-4 shipping-sec">
          {showShippingTab ?
            <ShippingSettings isEditablePage={isEditablePage} />
            : <Unauthorize />
          }
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="main-customer-grid setting-tab-sec">
        <CardSection>
          <div className="tab-section tab-2-section">
            {tabs && tabs.length > 0 && (
              <div className="row main-inactive-grid">
                <div className="col-12">
                  <div className="tab-sub-section mb-0">
                    <div className="tab-sub-header">
                      {tabs &&
                        tabs.map((tab, index) => (
                          <button
                            key={index}
                            className={
                              activeTab === index.toString() ? "active" : ""
                            }
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
            )}
          </div>
        </CardSection>
      </div>

    </>
  );
};

export default SettingDetails;
