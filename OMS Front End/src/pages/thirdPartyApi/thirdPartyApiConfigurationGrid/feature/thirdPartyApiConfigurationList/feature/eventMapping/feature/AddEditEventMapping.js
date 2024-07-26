import React from 'react'
import { useAddApiEventMappingMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditMappingData } from '../config/AddEditMapping.data';

function AddEditEventMapping() {
    const addEditMappingRef = useRef();
    const [addApiEventMapping, { isLoading: isAddApiEventMappingLoading, isSuccess: isAddApiEventMappingSuccess, data: allAddApiEventMappingData, },] = useAddApiEventMappingMutation();

    const handleAddEditAPIPRovider = () => {
        debugger
        const formData = addEditMappingRef.current.getFormData();
        if (formData) {
            let request = {
                ...formData,
                apiEventId: props.viewCardDetails.apiEventId ? props.viewCardDetails.apiEventId : 0,
                apiEventMappingId: 0,
                // endpointID : formData.endpointID,
                // providerID : formData.providerID
            };
            addApiEventMapping(request);
        }
    };

    return (
        <div className="row mt-2 add-address-form">
            <FormCreator
                config={AddEditMappingData}
                ref={addEditMappingRef}
            // key={shouldRerenderFormCreator}
            // onActionChange={formActionHandler}
            />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleAddEditAPIPRovider}
                        isLoading={isAddApiEventMappingLoading}
                    />
                    <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={handleResetAndClose}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddEditEventMapping