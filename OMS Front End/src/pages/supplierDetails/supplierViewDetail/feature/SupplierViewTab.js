import React, { useContext } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Component's */
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
const SupplierHistory = React.lazy(() => import("../../feature/supplierHistoryDetail/SupplierHistory"));
const SupplierNoteDetail = React.lazy(() => import("../../feature/supplierNoteDetail/SupplierNoteDetail"));
const SupplierContactDetail = React.lazy(() => import("../../feature/supplierContactDetail/SupplierContactDetail"));
const SuplierAddressDetails = React.lazy(() => import("../../feature/supplierAddressDetail/SupplierAddressDetails"));
const SupplierDocumentDetail = React.lazy(() => import("../../feature/supplierDocumentDetail/SupplierDocumentDetail"));

const SupplierViewTab = (supplierId) => {

    const { isResponsibleUser } = useContext(AddSupplierContext);

    const hasNotePermission = hasFunctionalPermission(securityKey.SUPPLIERNOTES);
    const hasAddressPermission = hasFunctionalPermission(securityKey.SUPPLIERADDRESS);
    const hasContactPermission = hasFunctionalPermission(securityKey.SUPPLIERCONTACT);
    const hasHistoryPermission = hasFunctionalPermission(securityKey.SUPPLIERHISTORY);
    const hasDocumentPermission = hasFunctionalPermission(securityKey.SUPPLIERDOCUMENT);

    const tabs = [
        {
            sMenuItemCaption: "Address",
            component: (
                <div className="mt-2">
                    <SuplierAddressDetails isEditablePage={true} />
                </div>
            ),
            isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Contact",
            component: (
                <div className="mt-2">
                    <SupplierContactDetail isEditablePage={true} isSearchFilterShow={true} />
                </div>
            ),
            isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Documents",
            component: (
                <div className="mt-2">
                    <SupplierDocumentDetail isEditablePage={true} />
                </div>
            ),
            isVisible: hasDocumentPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Notes",
            component: (
                <div className="mt-2">
                    <SupplierNoteDetail isEditablePage={true} />
                </div>
            ),
            isVisible: hasNotePermission.hasAccess,
        },
        {
            sMenuItemCaption: "History",
            component: (
                <div className="mt-2">
                    <SupplierHistory />
                </div>
            ),
            isVisible: hasHistoryPermission.hasAccess,
        },
    ];

    const visibleTabs = !isResponsibleUser ? tabs.filter((tab) => tab.isVisible) : tabs;

    return (
        <RenderTabs tabs={supplierId ? visibleTabs : null} />
    )
}
export default SupplierViewTab;