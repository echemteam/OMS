/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { useAddApiEventMappingMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditMappingData } from '../config/AddEditMapping.data';
import { useLazyGetAllAPIProvidersQuery } from '../../../../../../../../app/services/apiEndPointsAPI';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import { setDropDownOptionField } from '../../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting';
import Buttons from '../../../../../../../../components/ui/button/Buttons';
import { onResetForm } from '../../../../../../../../utils/FormFields/ResetForm/handleResetForm';
import FormCreator from '../../../../../../../../components/FinalForms/FormCreator';
import { useLazyGetAllAPIEndpointsQuery } from '../../../../../../../../app/services/apiParametersAPI';
import { getValue } from '../../../../../../../../utils/CommonUtils/CommonUtilsMethods';

const AddEditEventMapping = (props) => {

    const addEditMappingRef = useRef();
    const [mainProviderId, setMainProviderId] = useState(0)
    const [addEditMappingData, setAddEditMappingData] = useState(AddEditMappingData);

    const [addApiEventMapping, { isLoading: isAddApiEventMappingLoading, isSuccess: isAddApiEventMappingSuccess, data: allAddApiEventMappingData, },] = useAddApiEventMappingMutation();
    const [getAllAPIProviders, { isSuccess: isGetAllAPIProvidersSucess, data: allGetAllAPIProvidersData }] = useLazyGetAllAPIProvidersQuery();
    const [getAllAPIEndpoints, { isFetching, isSuccess: isGetAllAPIEndpointsSucess, data: allGetAllAPIEndpointsData }] = useLazyGetAllAPIEndpointsQuery();

    useEffect(() => {
        getAllAPIProviders()
        getAllAPIEndpoints()
    }, [])

    useEffect(() => {
        if (isAddApiEventMappingSuccess && allAddApiEventMappingData) {
            if (allAddApiEventMappingData.errorMessage.includes("exists")) {
                ToastService.warning(allAddApiEventMappingData.errorMessage);
                handleResetAndClose();
                return;
            }
            ToastService.success(allAddApiEventMappingData.errorMessage);
            handleResetAndClose();
            props.onGetData()
        }
    }, [isAddApiEventMappingSuccess, allAddApiEventMappingData]);

    useEffect(() => {
        if (isGetAllAPIProvidersSucess && allGetAllAPIProvidersData) {
            setDropDownOptionField(allGetAllAPIProvidersData, 'providerId', 'name', AddEditMappingData, 'providerId');
        }
    }, [isGetAllAPIProvidersSucess, allGetAllAPIProvidersData]);

    useEffect(() => {
        if (mainProviderId && !isFetching && isGetAllAPIEndpointsSucess && allGetAllAPIEndpointsData) {
            const modifyEndPointList = allGetAllAPIEndpointsData.filter(data => data.providerId === mainProviderId);
            setDropDownOptionField(modifyEndPointList, 'endpointId', 'name', AddEditMappingData, 'endpointId');
        }
    }, [mainProviderId, isFetching, isGetAllAPIEndpointsSucess, allGetAllAPIEndpointsData]);


    const handleAddEditAPIPRovider = () => {
        const formData = addEditMappingRef.current.getFormData();
        if (formData) {
            let request = {
                ...formData,
                apiEventId: props.keyId ? props.keyId : 0,
                apiEventMappingId: 0,
                endpointId: formData.endpointId.value,
                providerId: formData.providerId.value
            };
            addApiEventMapping(request);
        }
    };

    useEffect(() => {
        onResetForm(addEditMappingData, setAddEditMappingData, null);
    }, [props.isOpen])

    const handleResetAndClose = () => {
        onResetForm(addEditMappingData, setAddEditMappingData, null);
        props.onClose();
    };

    const handleColumnChange = (dataField, updatedData) => {
        const manageData = { ...addEditMappingData };
        if (dataField === 'providerId') {
            const providerId = getValue(updatedData.providerId);
            setMainProviderId(providerId);
            manageData.initialState = {
                ...updatedData,
                endpointId: 0,
            }
        }
        setAddEditMappingData(manageData);
    }

    return (
        <div className="row mt-2 add-address-form">
            <div className='col-12'>
            <FormCreator config={addEditMappingData} ref={addEditMappingRef}
                onColumnChange={handleColumnChange} />
                </div>
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
AddEditEventMapping.propTypes = {
    keyId: PropTypes.number,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onGetData: PropTypes.func.isRequired
};
export default AddEditEventMapping