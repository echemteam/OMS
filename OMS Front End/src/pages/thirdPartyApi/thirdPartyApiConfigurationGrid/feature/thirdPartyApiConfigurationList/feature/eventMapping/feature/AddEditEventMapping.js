import React, { useEffect, useRef, useState } from 'react'
import { useAddApiEventMappingMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditMappingData } from '../config/AddEditMapping.data';
import { useLazyGetAllAPIProvidersQuery } from '../../../../../../../../app/services/apiEndPointsAPI';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { setDropDownOptionField } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import FormCreator from '../../../../../../../../components/Forms/FormCreator';
import { useLazyGetAllAPIEndpointsQuery } from '../../../../../../../../app/services/apiParametersAPI';

const AddEditEventMapping = (props) => {
    const addEditMappingRef = useRef();
    const [addEditMappingData, setAddEditMappingData] = useState(AddEditMappingData)
    const [addApiEventMapping, { isLoading: isAddApiEventMappingLoading, isSuccess: isAddApiEventMappingSuccess, data: allAddApiEventMappingData, },] = useAddApiEventMappingMutation();
    const [getAllAPIProviders, { isSuccess: isGetAllAPIProvidersSucess, data: allGetAllAPIProvidersData }] = useLazyGetAllAPIProvidersQuery();
    const [getAllAPIEndpoints, { isSuccess: isGetAllAPIEndpointsSucess, data: allGetAllAPIEndpointsData }] = useLazyGetAllAPIEndpointsQuery();

    useEffect(() => {
        getAllAPIProviders()
        getAllAPIEndpoints()
    }, [])

    useEffect(() => {
        debugger
        if (isAddApiEventMappingSuccess && allAddApiEventMappingData) {
            if (allAddApiEventMappingData.errorMessage.includes("exists")) {
                ToastService.warning(allAddApiEventMappingData.errorMessage);
                handleResetAndClose();
                return;
            }
            //   if (!props.keyId) {
            //     ToastService.success(allAddApiEventMappingData.errorMessage);
            //     handleResetAndClose();
            //     props.onGetData()
            //   } else {
            //     handleResetAndClose()
            //     props.onRepetGetData(props.keyId)
            //   }
        }
    }, [isAddApiEventMappingSuccess, allAddApiEventMappingData]);

    useEffect(() => {
        debugger
        if (isGetAllAPIProvidersSucess && allGetAllAPIProvidersData) {
            setDropDownOptionField(allGetAllAPIProvidersData, 'providerId', 'name', AddEditMappingData, 'providerId');
        }
        if (isGetAllAPIEndpointsSucess && allGetAllAPIEndpointsData) {
            setDropDownOptionField(allGetAllAPIEndpointsData, 'endpointId', 'name', AddEditMappingData, 'endpointId');
        }

    }, [isGetAllAPIProvidersSucess, allGetAllAPIProvidersData, isGetAllAPIEndpointsSucess, allGetAllAPIEndpointsData]);

    const handleAddEditAPIPRovider = () => {
        debugger
        const formData = addEditMappingRef.current.getFormData();
        if (formData) {
            let request = {
                ...formData,
                apiEventId: props.keyId ? props.keyId : 0,
                apiEventMappingId: 0,
                endpointId : formData.endpointId.value,
                providerId : formData.providerId.value
            };
            addApiEventMapping(request);
        }
    };

    const handleResetAndClose = () => {
        onResetForm(addEditMappingData, setAddEditMappingData, null);
        props.onClose();
    };

    return (
        <div className="row mt-2 add-address-form">
            <FormCreator
                config={addEditMappingData}
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