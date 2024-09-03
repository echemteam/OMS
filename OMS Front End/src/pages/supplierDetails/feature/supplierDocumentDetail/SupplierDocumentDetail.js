import React, { useContext, useState, useEffect } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import PropTypes from "prop-types";
//** Service */
import { useLazyDownloadDocumentQuery } from "../../../../app/services/documentAPI";

import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import {
  useAddSupplierDocumentsMutation,
  useDeleteSupplierDocumentsByIdMutation,
  useLazyGetSupplierDocumentsByIdQuery,
} from "../../../../app/services/supplierDocuementsAPI";

//** Components */
const DocumentGrid = React.lazy(() =>
  import("../../../../common/features/component/Document/DocumentGrid")
);

const CardSection = React.lazy(() =>
  import("../../../../components/ui/card/CardSection.js")
);

const Unauthorize = React.lazy(() =>
  import("../../../../pages/unauthorize/Unauthorize.js")
);

const supplierSecurityKey = {
  ADD: securityKey.ADDSUPPLIERDOCUMENT,
  DELETE: securityKey.DELETESUPPLIERDOCUMENT,
  DOWNALOD: securityKey.DOWNALODSUPPLIERDOCUMENT,
};

const SupplierDocumentDetail = ({ isEditablePage, supplierStatus }) => {
  const [showNormalDocuments, setShowNormalDocuments] = useState(false);
  const [showArchiveDocuments, setShowArchiveDocuments] = useState(false);

  const {
    supplierId,
    isResponsibleUser,
    activeSubTab,
    handleActiveSubTabClick,
  } = useContext(AddSupplierContext);

  const hasPermissionToSeeDocuments = hasFunctionalPermission(
    securityKey.SUPPLIERDOCUMENT
  );

  useEffect(() => {
    const shouldShowDocuments =
      isEditablePage && !isResponsibleUser
        ? hasPermissionToSeeDocuments.hasAccess
        : true;

    setShowNormalDocuments(shouldShowDocuments);
    setShowArchiveDocuments(shouldShowDocuments);
  }, [isEditablePage, hasPermissionToSeeDocuments]);

  const tabs = [
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2 financial-sec">
          {showNormalDocuments ? (
            <DocumentGrid
              keyId={supplierId || 0}
              isSupplier={true}
              isEditablePage={isEditablePage}
              SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
              customerStatusId={supplierStatus}
              isArchive={false}
              addDocuments={useAddSupplierDocumentsMutation}
              downloadDocument={useLazyDownloadDocumentQuery}
              deleteDocumentsById={useDeleteSupplierDocumentsByIdMutation}
              getDocumentsById={useLazyGetSupplierDocumentsByIdQuery}
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
        <div className="mt-2 shipping-sec">
          {showArchiveDocuments ? (
            <DocumentGrid
              keyId={supplierId || 0}
              isSupplier={true}
              isEditablePage={isEditablePage}
              SecurityKey={!isResponsibleUser ? supplierSecurityKey : null}
              customerStatusId={supplierStatus}
              isArchive={true}
              addDocuments={useAddSupplierDocumentsMutation}
              downloadDocument={useLazyDownloadDocumentQuery}
              deleteDocumentsById={useDeleteSupplierDocumentsByIdMutation}
              getDocumentsById={useLazyGetSupplierDocumentsByIdQuery}
            />
          ) : (
            <Unauthorize />
          )}
        </div>
      ),
    },
  ];

  // Safely retrieve the active tab's component
  const activeTabComponent = tabs[activeSubTab]?.component;

  return (



    <div className="supplier-document-detail">


    <CardSection isDocuments={true}>
      <div className="main-customer-grid setting-tab-sec">
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
      </div>
    </CardSection>
    </div>
  );
};

SupplierDocumentDetail.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
};

export default SupplierDocumentDetail;
