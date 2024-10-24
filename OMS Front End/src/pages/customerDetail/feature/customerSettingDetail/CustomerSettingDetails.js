/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
//** Lib's */
import "./SettingDetails.scss"
import FinancialSettings from "./FinancialSettings";
import { securityKey } from "../../../../data/SecurityKey";
import Unauthorize from "../../../unauthorize/Unauthorize";
import CardSection from "../../../../components/ui/card/CardSection";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import ShippingSettings from "./features/ShippingSetting/ShippingSettings";
import PropTypes from "prop-types";

const CustomerSettingDetails = ({ isEditablePage, customerStatusId }) => {

  const [showFinacialTab, setShowFinacialTab] = useState(false);
  const [showShippingTab, setShowShippingTab] = useState(false);
  const { isResponsibleUser, activeSubTab, handleActiveSubTabClick } = useContext(BasicDetailContext);

  const hasShippingPermission = hasFunctionalPermission(securityKey.CUSTOMERSHIPPINGSETTING);
  const hasFinacialPermission = hasFunctionalPermission(securityKey.CUSTOMERFINANCIALSETTING);

  useEffect(() => {
    if (isEditablePage && !isResponsibleUser) {
      if (hasShippingPermission.hasAccess === true) {
        setShowShippingTab(true);
      } else {
        setShowShippingTab(false);
      }
    } else {
      setShowShippingTab(true);
    }
  }, [isEditablePage, hasShippingPermission]);

  useEffect(() => {
    if (isEditablePage && !isResponsibleUser) {
      if (hasFinacialPermission.hasAccess === true) {
        setShowFinacialTab(true);
      } else {
        setShowFinacialTab(false);
      }
    }
    else {
      setShowFinacialTab(true);
    }
  }, [isEditablePage, hasFinacialPermission]);

  const tabs = [
    {
      sMenuItemCaption: "Financial",
      component: (
        <div className="mt-2 financial-sec">
          {showFinacialTab ?
            <FinancialSettings isEditablePage={isEditablePage} customerStatusId={customerStatusId} /> :
            <Unauthorize />
          }
        </div>
      )
    },
    {
      sMenuItemCaption: "Shipping",
      component: (
        <div className="mt-2 shipping-sec">
          {showShippingTab ?
            <ShippingSettings isEditablePage={isEditablePage} customerStatusId={customerStatusId}/>
            : <Unauthorize />
          }
        </div>
      )
    },
  ];
  return (
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
                        <>
                          {isEditablePage ?
                            <button key={index} className={activeSubTab === index ? "active" : ""} onClick={() => handleActiveSubTabClick(index, tab.sPage)}>
                              {tab.sMenuItemCaption}
                            </button>
                            :
                            <button key={index} className={activeSubTab === index ? "active" : ""}>
                              {tab.sMenuItemCaption}
                            </button>
                          }
                        </>
                      ))}
                  </div>
                  {activeSubTab !== -1 && tabs[activeSubTab].component && (
                    <div className="tab-sub-content">
                      <div className="tab-sub-body-section">
                        {tabs[activeSubTab].component}
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
  );
};

CustomerSettingDetails.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
};

export default CustomerSettingDetails;
