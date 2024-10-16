/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
//** Lib's */
import FormCreator from "../../../../components/FinalForms/FormCreator";
import { getValue } from "../../../../utils/CommonUtils/CommonUtilsMethods";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

//** Service's */
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../app/services/addressAPI";
import DataLoader from "../../../../components/FinalMolGrid/ui/dataLoader/DataLoader";

const DynamicAddressForm = forwardRef(({ formConfig, isGetAddressDetailsSuccess, isGetAddressDetails }, ref) => {

    //** State's */
    const formCreatorRef = useRef();
    const [formData, setFormData] = useState(formConfig);

    //** API Call's */
    const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();

    //** Use Effect's */
    useEffect(() => {
        getAllStates();
        getAllCountries();
    }, []);

    useEffect(() => {
        if (!isGetAllStateFetching && isGetAllStateSuccess && isGetAddressDetailsSuccess && isGetAddressDetails) {
            let data = { ...formData };
            if (isGetAddressDetails.countryId) {
                setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === isGetAddressDetails.countryId);
            }
            if (isGetAddressDetails.stateId) {
                getAllCities(isGetAddressDetails.stateId)
            }
            data.initialState = {
                addressId: isGetAddressDetails.addressId,
                addressLine1Id: isGetAddressDetails.addressLine1,
                addressLine2Id: isGetAddressDetails.addressLine2,
                countryId: isGetAddressDetails.countryId,
                zipCode: isGetAddressDetails.zipCode,
                stateId: isGetAddressDetails.stateId,
                cityId: isGetAddressDetails.cityId,
            };
            setFormData(data);
        }
    }, [isGetAllStateFetching, isGetAllStateSuccess, isGetAddressDetailsSuccess, isGetAddressDetails]);

    useEffect(() => {
        if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', formData, 'countryId', null, setFormData);
        }
    }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);

    useEffect(() => {
        if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', formData, 'cityId', null, setFormData);
        }
    }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);

    //** handle Change */
    const handleColumnChange = (dataField, updatedData) => {
        const manageData = { ...formData };
        const stateId = getValue(updatedData.stateId);
        const countryId = getValue(updatedData.countryId);
        if (dataField === "countryId") {
            setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === countryId);
            setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
            manageData.initialState = {
                ...updatedData,
                stateId: null,
                cityId: null
            }
        } else if (dataField === "stateId") {
            getAllCities(stateId);
            manageData.initialState = {
                ...updatedData,
                stateId: stateId,
                countryId: countryId,
                cityId: null
            }
        }
        setFormData(manageData);
    }

    useImperativeHandle(ref, () => ({
        getFormData: () => {
            return formCreatorRef.current.getFormData();
        }
    }), [formData]);

    if (isGetAllStateFetching) {
        return <div><DataLoader /></div>;
    }

    return (
        <div className="row">
            <FormCreator config={formData}
                ref={formCreatorRef} onColumnChange={handleColumnChange} />
        </div>
    )
})

// PropTypes for the component
DynamicAddressForm.propTypes = {
    ref: PropTypes.object.isRequired,
    formConfig: PropTypes.object.isRequired,
    isGetAddressDetails: PropTypes.object.isRequired,
    isGetAddressDetailsSuccess: PropTypes.bool.isRequired

};
export default DynamicAddressForm;