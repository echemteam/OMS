import React, { useState } from 'react'
import RenderTabs from '../../../../../../../components/ui/tabs/RenderTabs';
import EventMapping from '../eventMapping/EventMapping';
import EventParamter from '../eventParamter/EventParamter';
import ParameterMapping from '../parameterMapping/ParameterMapping';
import EventRequiredFields from '../eventRequiredFields/EventRequiredFields';
import RequiredFieldsMapping from '../requiredFieldsMapping/RequiredFieldsMapping';

const ThirdPartyApiConfigurationViewTab = ({ keyId }) => {

    const [endpointId, setEndpointId] = useState(0);
    const [providerId, setProviderId] = useState(0);

    const tabs = [
        {
            sMenuItemCaption: "Event Mapping",
            component: (
                <div className="mt-2">
                    <EventMapping
                        keyId={keyId}
                        setEndpointId={setEndpointId}
                        setProviderId={setProviderId}
                    />
                </div>
            ),
            // isVisible: hasAddressPermission.hasAccess,
        },
        // {
        //     sMenuItemCaption: "Event Paramter",
        //     component: (
        //         <div className="mt-2">
        //             <EventParamter
        //                 keyId={keyId}
        //             />
        //         </div>
        //     ),
        //     // isVisible: hasContactPermission.hasAccess,
        // },
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
            sMenuItemCaption: "Event Required Fields",
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
    ];
    return (
        <div className='vertical-tab-inner'>
            <RenderTabs tabs={tabs} />
        </div>
    )
}

export default ThirdPartyApiConfigurationViewTab