import React from 'react'
import RenderTabs from '../../../../../../../components/ui/tabs/RenderTabs';
import EventMappingCrud from '../eventMappingCrud/EventMappingCrud';
import EventParamterCrud from '../eventParamterCrud/EventParamterCrud';
import ParameterMappingCrud from '../parameterMappingCrud/ParameterMappingCrud';
import EventRequiredFieldsCrud from '../eventRequiredFieldsCrud/EventRequiredFieldsCrud';
import RequiredFieldsMappingCrud from '../requiredFieldsMappingCrud/RequiredFieldsMappingCrud';

const ThirdPartyApiConfigurationViewTab = () => {
    const tabs = [
        {
            sMenuItemCaption: "Event Mapping Crud",
            component: (
                <div className="mt-2">
                    <EventMappingCrud />
                </div>
            ),
            // isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Event Paramter Crud",
            component: (
                <div className="mt-2">
                    <EventParamterCrud />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Parameter Mapping Crud",
            component: (
                <div className="mt-2">
                    <ParameterMappingCrud />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,/
        },
        {
            sMenuItemCaption: "Event Required Fields Crud",
            component: (
                <div className="mt-2">
                    <EventRequiredFieldsCrud />
                </div>
            ),
            // isVisible: hasDocumentPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Required Fields Mapping Crud",
            component: (
                <div className="mt-2">
                    <RequiredFieldsMappingCrud />
                </div>
            ),
            // isVisible: hasNotePermission.hasAccess,
        },
    ];
    return (
        <div className='vertical-tab-inner'>
        <RenderTabs tabs={tabs} />
        </div>
    )
}

export default ThirdPartyApiConfigurationViewTab