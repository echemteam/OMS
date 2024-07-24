import RenderTabs from "../../../../../../components/ui/tabs/RenderTabs";
import { securityKey } from "../../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import ApiAuthentication from "../../apiAuthentication/ApiAuthenticationGrid";
import ApiEndPoints from "../../apiEndPoints/ApiEndPointsGrid";


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
      component: (
        <div className="mt-2 contact-accrodiaon-scroll">
          <ApiEndPoints providerId={providerId} />
        </div>
      ),
      isVisible: hasApiEndpointPermission.hasAccess,
    },
    {
      sMenuItemCaption: "API Authentication Management",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll contact-card-section-new">
          <ApiAuthentication
            providerObject={providerData}
            providerId={providerId}
          />
        </div>
      ),
      isVisible: hasApiAuthenticationPermission.hasAccess,
    },
  ];

  const visibleTabs = !providerId ? tabs.filter((tab) => tab.isVisible) : tabs;

  return (
    <>
      <RenderTabs tabs={providerId ? visibleTabs : null} />
    </>
  );
};
export default ApiproviderViewTab;
