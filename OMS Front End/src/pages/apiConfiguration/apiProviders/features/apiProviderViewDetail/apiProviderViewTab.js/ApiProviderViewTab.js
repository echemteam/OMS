import React from "react";
import PropTypes from "prop-types";
import RenderTabs from "../../../../../../components/ui/tabs/RenderTabs";
import { securityKey } from "../../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
const ApiEndPoints = React.lazy(() => import("../../apiEndPoints/ApiEndPoints"));
const ApiAuthentication = React.lazy(() => import("../../apiAuthentication/ApiAuthentication"));

const ApiproviderViewTab = ({ providerId, providerData }) => {
  const hasApiEndpointPermission = hasFunctionalPermission(
    securityKey.APIENDPOINTS
  );
  const hasApiAuthenticationPermission = hasFunctionalPermission(
    securityKey.APIAUTHENTICATION
  );

  const tabs = [
    {
      sMenuItemCaption: "API EndPoints Management",
      icon: "fa fa-tasks",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll">
          <ApiEndPoints providerId={providerId} />
        </div>
      ),
      isVisible: hasApiEndpointPermission?.hasAccess,
    },
    {
      sMenuItemCaption: "API Authentication Management",
      icon: "fa fa-tasks",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll contact-card-section-new">
          <ApiAuthentication
            providerObject={providerData}
            providerId={providerId}
          />
        </div>
      ),
      isVisible: hasApiAuthenticationPermission?.hasAccess,
    },
  ];

  const visibleTabs = !providerId ? tabs.filter((tab) => tab.isVisible) : tabs;

  return (
     
      <RenderTabs tabs={providerId ? visibleTabs : null} />
    
  );
};

ApiproviderViewTab.propTypes = {
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  providerData: PropTypes.object,
};
export default ApiproviderViewTab;
