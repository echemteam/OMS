import React from 'react'
import RenderTabs from '../../../../../../../components/ui/tabs/RenderTabs';
import EventMapping from '../eventMapping/EventMapping';
import EventParamter from '../eventParamter/EventParamter';
import ParameterMapping from '../parameterMapping/ParameterMapping';
import EventRequiredFields from '../eventRequiredFields/EventRequiredFields';
import RequiredFieldsMapping from '../requiredFieldsMapping/RequiredFieldsMapping';

const ThirdPartyApiConfigurationViewTab = () => {
    const tabs = [
        {
            sMenuItemCaption: "Event Mapping",
            component: (
                <div className="mt-2">
                    <EventMapping />
                </div>
            ),
            // isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Event Paramter",
            component: (
                <div className="mt-2">
                    <EventParamter />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Parameter Mapping",
            component: (
                <div className="mt-2">
                    <ParameterMapping />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,/
        },
        {
            sMenuItemCaption: "Event Required Fields",
            component: (
                <div className="mt-2">
                    <EventRequiredFields />
                </div>
            ),
            // isVisible: hasDocumentPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Required Fields Mapping",
            component: (
                <div className="mt-2">
                    <RequiredFieldsMapping />
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