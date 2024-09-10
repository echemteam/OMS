import React, { useState } from 'react'
import RenderTabs from '../../../../../../../components/ui/tabs/RenderTabs';
import EventMapping from '../eventMapping/EventMapping';
import ParameterMapping from '../parameterMapping/ParameterMapping';
import EventRequiredFields from '../eventRequiredFields/EventRequiredFields';
import RequiredFieldsMapping from '../requiredFieldsMapping/RequiredFieldsMapping';
import EventParamter from '../eventParamter/EventParamter';
import EventHistory from '../eventHistory/EventHistory';


const ThirdPartyApiConfigurationViewTab = ({ keyId }) => {

    const [endpointId, setEndpointId] = useState(0);

    const tabs = [
        {
            sMenuItemCaption: "Provider Mapping",
            component: (
                <div className="mt-2">
                    <EventMapping
                        keyId={keyId}
                        setEndpointId={setEndpointId}
                    />
                </div>
            ),
            // isVisible: hasAddressPermission.hasAccess,
        },
        {
            sMenuItemCaption: "API Event Paramter",
            component: (
                <div className="mt-2">
                    <EventParamter
                        keyId={keyId}
                    />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Parameter Mapping",
            component: (
                <div className="mt-2">
                    <ParameterMapping
                        keyId={keyId}
                        endpointId={endpointId}
                    />
                </div>
            ),
            // isVisible: hasContactPermission.hasAccess,/
        },
        {
            sMenuItemCaption: "Required Fields",
            component: (
                <div className="mt-2">
                    <EventRequiredFields
                        keyId={keyId}
                    />
                </div>
            ),
            // isVisible: hasDocumentPermission.hasAccess,
        },
        {
            sMenuItemCaption: "Required Fields Mapping",
            component: (
                <div className="mt-2">
                    <RequiredFieldsMapping
                        keyId={keyId}
                    />
                </div>
            ),
            // isVisible: hasNotePermission.hasAccess,
        },
        {
            sMenuItemCaption: "History",
            component: (
                <div className="mt-2">
                    <EventHistory
                        keyId={keyId}
                    />
                </div>
            ),
            // isVisible: hasNotePermission.hasAccess,
        },
    ];
    return (
        // <CardSection
        //     cardTitle="Address"
        //     buttonClassName="theme-button"

        // >
        <div className='vertical-tab-inner'>
            <RenderTabs tabs={tabs} isCollapse={true} />
        </div>
        // </CardSection>
    )
}

export default ThirdPartyApiConfigurationViewTab