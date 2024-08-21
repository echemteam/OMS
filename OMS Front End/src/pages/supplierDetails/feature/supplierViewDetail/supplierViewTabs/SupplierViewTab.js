import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { securityKey } from "../../../../../data/SecurityKey";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";

//** Component's */
import RenderTabs from "../../../../../components/ui/tabs/RenderTabs";
const FinancialSettings = React.lazy(() => import("../../financialSettings/FinancialSettings"));
const SupplierHistory = React.lazy(() => import("../../supplierHistoryDetail/SupplierHistory"));
const SupplierNoteDetail = React.lazy(() => import("../../supplierNoteDetail/SupplierNoteDetail"));
const SupplierContactDetail = React.lazy(() => import("../../supplierContactDetail/SupplierContactDetail"));
const SuplierAddressDetails = React.lazy(() => import("../../supplierAddressDetail/SupplierAddressDetails"));
const SupplierDocumentDetail = React.lazy(() => import("../../supplierDocumentDetail/SupplierDocumentDetail"));

const SupplierViewTab = ({supplierId , contryIdCode , supplierStatus}) => {

    const { isResponsibleUser } = useContext(AddSupplierContext);

    const hasNotePermission = hasFunctionalPermission(securityKey.SUPPLIERNOTES);
    const hasAddressPermission = hasFunctionalPermission(securityKey.SUPPLIERADDRESS);
    const hasContactPermission = hasFunctionalPermission(securityKey.SUPPLIERCONTACT);
    const hasHistoryPermission = hasFunctionalPermission(securityKey.SUPPLIERHISTORY);
    const hasDocumentPermission = hasFunctionalPermission(securityKey.SUPPLIERDOCUMENT);

    const tabs = [
        {
            sMenuItemCaption: "Address",
            icon: "fa fa-address-book-o",
            component: (
                <div className="mt-2 contact-accrodiaon-scroll">
                    <SuplierAddressDetails isEditablePage={true} supplierStatus={supplierStatus}/>
                </div>
            ),
            isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Contact",
            icon: "fa fa-phone",
            component: (
                <div className="mt-2 contact-accrodiaon-scroll contact-card-section-new">
                    <SupplierContactDetail isEditablePage={true} isSearchFilterShow={true} contryIdCode={contryIdCode}/>
                </div>
            ),
            isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Financial Settings",
            icon: "fa fa-cog",
            component: (
                <div className="mt-2 supplier-setting-sec">
                    <FinancialSettings
                        supplierId={supplierId}
                        isEditablePage={true}
                    />
                </div>
            ),
            isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Documents",
            icon: "fa fa-file-text-o",
            component: (
                <div className="mt-2">
                    <SupplierDocumentDetail isEditablePage={true} />
                </div>
            ),
            isVisible: hasDocumentPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Notes",
            icon: "fa fa-sticky-note-o",
            component: (
                <div className="mt-2">
                    <SupplierNoteDetail isEditablePage={true} />
                </div>
            ),
            isVisible: hasNotePermission.hasAccess,
        },
        {
            sMenuItemCaption: "History",
            icon: "fa fa-history",
            component: (
                <div className="">
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

// PropTypes for the component
SupplierViewTab.propTypes = {
    supplierId: PropTypes.number,
};

export default SupplierViewTab;