import React from 'react'
import RenderTabs from '../../../../../../components/ui/tabs/RenderTabs';
import ManageResponsibleUsers from '../manageResponsibleUsers/ManageResponsibleUsers';
import ViewFunctionalEvents from '../viewFunctionalEvents/ViewFunctionalEvents';

const FunctionalConfigurationViewTabs = (props) => {
    const tabs = [
        {
            sMenuItemCaption: "Manage Responsible Users",
            icon: "fa fa-user",
            component: (
                <div className="mt-2">
                    <ManageResponsibleUsers functionalityId={props.functionalityId} />
                </div>
            ),
            // isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "View Functional Events",
            icon: "fa fa-calendar",
            component: (
                <div className="mt-2">
                    <ViewFunctionalEvents functionalityId={props.functionalityId} />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,
        },
    ];
    return (
        <div>
            <RenderTabs tabs={tabs} />
        </div>
    )
}

export default FunctionalConfigurationViewTabs