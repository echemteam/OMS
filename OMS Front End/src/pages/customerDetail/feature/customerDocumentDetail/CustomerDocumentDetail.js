/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import PropTypes from "prop-types";
//** Service */
import { useAddCustomerDocumentsMutation, useDeleteCustomerDocumentsByIdMutation, useLazyDownloadDocumentQuery, useLazyGetCustomerDocumentsByIdQuery, } from "../../../../app/services/documentAPI";

import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const DocumentGrid = React.lazy(() => import("../../../../common/features/component/Document/DocumentGrid"));
const Unauthorize = React.lazy(() => import("../../../../pages/unauthorize/Unauthorize.js"));
const CardSection = React.lazy(() => import("../../../../components/ui/card/CardSection.js"));

const customerSecurityKey = {
  ADD: securityKey.ADDCUSTOMERDOCUMENT,
  DELETE: securityKey.DELETECUSTOMERDOCUMENT,
  DOWNALOD: securityKey.DOWNALODCUSTOMERDOCUMENT,
};

const CustomerDocumentDetail = ({ isEditablePage, customerStatusId }) => {
  const [showNormalDocuments, setShowNormalDocuments] = useState(false);
  const [showArchiveDocuments, setShowArchiveDocuments] = useState(false);

  const hasPermissionToSeeDocuments = hasFunctionalPermission(
    securityKey.CUSTOMERDOCUMENT
  );

  const {
    customerId,
    isResponsibleUser,
    activeSubTab,
    handleActiveSubTabClick,
  } = useContext(BasicDetailContext);

  useEffect(() => {
    if (isEditablePage && !isResponsibleUser) {
      if (hasPermissionToSeeDocuments.hasAccess === true) {
        setShowArchiveDocuments(true);
      } else {
        setShowArchiveDocuments(false);
      }
    } else {
      setShowArchiveDocuments(true);
    }
  }, [isEditablePage, hasPermissionToSeeDocuments]);

  useEffect(() => {
    if (isEditablePage && !isResponsibleUser) {
      if (hasPermissionToSeeDocuments.hasAccess === true) {
        setShowNormalDocuments(true);
      } else {
        setShowNormalDocuments(false);
      }
    } else {
      setShowNormalDocuments(true);
    }
  }, [isEditablePage, hasPermissionToSeeDocuments]);

  const tabs = [
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="financial-sec">
          {showNormalDocuments ? (
            <DocumentGrid
              keyId={customerId || 0}
              isSupplier={false}
              isEditablePage={isEditablePage}
              SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
              customerStatusId={customerStatusId}
              isArchive={false}
              addDocuments={useAddCustomerDocumentsMutation}
              downloadDocument={useLazyDownloadDocumentQuery}
              deleteDocumentsById={useDeleteCustomerDocumentsByIdMutation}
              getDocumentsById={useLazyGetCustomerDocumentsByIdQuery}
            />
          ) : (
            <Unauthorize />
          )}
        </div>
      ),
    },
    {
      sMenuItemCaption: "Archive Documents",
      component: (
        <div className="shipping-sec">
          {showArchiveDocuments ? (
            <DocumentGrid
              keyId={customerId || 0}
              isSupplier={false}
              isEditablePage={isEditablePage}
              SecurityKey={!isResponsibleUser ? customerSecurityKey : null}
              customerStatusId={customerStatusId}
              isArchive={true}
              addDocuments={useAddCustomerDocumentsMutation}
              downloadDocument={useLazyDownloadDocumentQuery}
              deleteDocumentsById={useDeleteCustomerDocumentsByIdMutation}
              getDocumentsById={useLazyGetCustomerDocumentsByIdQuery}
            />
          ) : (
            <Unauthorize />
          )}
        </div>
      ),
    },
  ];

  return (
    /**
     * This component displays an DocumentGrid for the  module.
     * This hook dynamically sets the API call based on the module (customer or supplier).
     */

    <div className="customer-document-detail">
      <CardSection>
        <div className="main-customer-grid setting-tab-sec">
          <div className="tab-section tab-2-section">
            {tabs && tabs.length > 0 && (
              <div className="row main-inactive-grid">
                <div className="col-12">
                  <div className="tab-sub-section mb-0">
                    <div className="tab-sub-header">
                      {tabs &&
                        tabs.map((tab, index) => (
                          <>
                            {isEditablePage ? (
                              <button
                                key={index}
                                className={
                                  activeSubTab === index ? "active" : ""
                                }
                                onClick={() =>
                                  handleActiveSubTabClick(index, tab.sPage)
                                }
                              >
                                {tab.sMenuItemCaption}
                              </button>
                            ) : (
                              <button
                                key={index}
                                className={
                                  activeSubTab === index ? "active" : ""
                                }
                              >
                                {tab.sMenuItemCaption}
                              </button>
                            )}
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
        </div>
      </CardSection>
    </div>
  );
};
CustomerDocumentDetail.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
};
export default CustomerDocumentDetail;
