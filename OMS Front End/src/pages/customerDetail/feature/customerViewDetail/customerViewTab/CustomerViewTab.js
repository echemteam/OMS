import React, { useContext } from "react";
//** Lib's */
import { securityKey } from "../../../../../data/SecurityKey";
import RenderTabs from "../../../../../components/ui/tabs/RenderTabs";
import { CustomerHistory } from "../../customerHistoryDetail/CustomerHistoryDetail";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import PropTypes from 'prop-types';
//** Component's */
const CustomerContactDetail = React.lazy(() => import("../../customerContactDetail/CustomerContactDetail"));
const CustomerDocumentDetail = React.lazy(() => import("../../customerDocumentDetail/CustomerDocumentDetail"));
const CustomerNoteDetail = React.lazy(() => import("../../customerNoteDetail/CustomerNoteDetail"));
const CustomerAddressDetail = React.lazy(() => import("../../customerAddressDetail/CustomerAddressDetail"));
const CustomerSettingDetails = React.lazy(() => import("../../customerSettingDetail/CustomerSettingDetails"));
const CustomerSubCustomerDetail = React.lazy(() => import("../../customerSubCustomerDetail/CustomerSubCustomerDetail"));

const CustomerViewTab = ({ customerId, isBuyingForThirdParty, contryIdCode, customerStatus }) => {

  const { isResponsibleUser } = useContext(BasicDetailContext);

  const hasNotePermission = hasFunctionalPermission(securityKey.CUSTOMERNOTES);
  const hasAddressPermission = hasFunctionalPermission(
    securityKey.CUSTOMERADDRESS
  );
  const hasContactPermission = hasFunctionalPermission(
    securityKey.CUSTOMERCONTACT
  );
  const hasSettingPermission = hasFunctionalPermission(
    securityKey.CUSTOMERSETTING
  );
  const hasHistoryPermission = hasFunctionalPermission(
    securityKey.CUSTOMERHISTORY
  );
  const hasDocumentPermission = hasFunctionalPermission(
    securityKey.CUSTOMERDOCUMENT
  );
  const hasSubCustomerPermission = hasFunctionalPermission(
    securityKey.CUSTOMERSUBCUSTOMER
  );

  const tabs = [
    {
      sMenuItemCaption: "Address",
      icon: "fa fa-address-book-o",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll">
          <CustomerAddressDetail isEditablePage={true} customerStatus={customerStatus} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasAddressPermission?.hasAccess,
    },
    {
      sMenuItemCaption: "Contact",
      icon: "fa fa-phone",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll contact-card-section-new">
          <CustomerContactDetail isEditablePage={true} isSearchFilterShow={true} contryIdCode={contryIdCode} customerStatusId={customerStatus} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasContactPermission?.hasAccess,
    },
    {
      sMenuItemCaption: "Settings",
      icon: "fa fa-cog",
      component: (
        <div className="mt-2">
          <CustomerSettingDetails isEditablePage={true} customerStatusId={customerStatus} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasSettingPermission?.hasAccess,
    },
    {
      sMenuItemCaption: "Documents",
      icon: "fa fa-file-text-o",
      component: (
        <div className="mt-2">
          <CustomerDocumentDetail isEditablePage={true} customerStatusId={customerStatus} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasDocumentPermission?.hasAccess,
    },
    {
      sMenuItemCaption: "Link Customer",
      icon: "fa fa-link",
      component: (
        <div className="mt-2">
          <CustomerSubCustomerDetail />
        </div>
      ),
      isVisible: isResponsibleUser ? isBuyingForThirdParty : isBuyingForThirdParty && hasSubCustomerPermission?.hasAccess
    },
    {
      sMenuItemCaption: "Notes",
      icon: "fa fa-sticky-note-o",
      component: (
        <div className="mt-2">
          <CustomerNoteDetail isEditablePage={true} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasNotePermission?.hasAccess,
    },
    {
      sMenuItemCaption: "History",
      icon: "fa fa-history",
      component: (
        <div className="">
          <CustomerHistory isEditablePage={true} />
        </div>
      ),
      isVisible: isResponsibleUser ? true : hasHistoryPermission?.hasAccess,
    }
  ];

  const visibleTabs = tabs.filter((tab) => tab.isVisible);

  return (
    <RenderTabs tabs={customerId ? visibleTabs : null} />
  )
}

CustomerViewTab.propTypes = {
  customerId: PropTypes.number.isRequired,
  isBuyingForThirdParty: PropTypes.bool.isRequired
};

export default CustomerViewTab;