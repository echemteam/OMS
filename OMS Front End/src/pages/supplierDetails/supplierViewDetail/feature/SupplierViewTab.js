import { useContext } from "react";
import { securityKey } from "../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";

import SuplierAddressDetails from "../../feature/supplierAddressDetail/SupplierAddressDetails";
import SupplierContactDetail from "../../feature/supplierContactDetail/SupplierContactDetail";
import SupplierDocumentDetail from "../../feature/supplierDocumentDetail/SupplierDocumentDetail";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import SupplierNoteDetail from "../../feature/supplierNoteDetail/SupplierNoteDetail";
import { SupplierHistory } from "../../feature/supplierHistoryDetail/SupplierHistory";

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