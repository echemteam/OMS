import React, { useEffect, useRef, useState } from 'react'
import { rulesFormData } from './config/RulesForm.data';
import FormCreator from '../../../components/Forms/FormCreator';
import Buttons from '../../../components/ui/button/Buttons';
import { useLazyGetAllFunctionalitiesQuery, useLazyGetAllModulesQuery } from '../../../app/services/configurationAPI';

const AddEditRules = ({ onClose }) => {

    const ruleFormRef = useRef();
    const [formData, setFormData] = useState(rulesFormData);

    const [
        getAllFunctionalities,
        {
            isSuccess: isGetAllFunctionalitiesSucess,
            data: allGetAllFunctionalitiesData,
        },
    ] = useLazyGetAllFunctionalitiesQuery();

    const [
        getAllModules,
        {
            isSuccess: isgetAllModulesSucess,
            data: allGetAllModulesData,
        },
    ] = useLazyGetAllModulesQuery();

    useEffect(() => {
        getAllFunctionalities();
        getAllModules();
    }, []);

    // useEffect(() => {
    //     if (
    //         isGetAllFunctionalitiesSucess &&
    //         allGetAllFunctionalitiesData
    //     ) {
    //         const getData = allGetAllFunctionalitiesData.map((item) => ({
    //             value: item.countryId,
    //             label: item.name,
    //         }));
    //         const dropdownField = rulesFormData.formFields.find(
    //             (item) => item.dataField === "countryId"
    //         );
    //         dropdownField.fieldSetting.options = getData;
    //     }
    // }, [
    //     isGetAllFunctionalitiesSucess,
    //     allGetAllFunctionalitiesData,
    // ]);

    // useEffect(() => {
    //     if (
    //         isgetAllModulesSucess &&
    //         allGetAllModulesData
    //     ) {
    //         const getData = allGetAllModulesData.map((item) => ({
    //             value: item.countryId,
    //             label: item.name,
    //         }));
    //         const dropdownField = rulesFormData.formFields.find(
    //             (item) => item.dataField === "countryId"
    //         );
    //         dropdownField.fieldSetting.options = getData;
    //     }
    // }, [
    //     isgetAllModulesSucess,
    //     allGetAllModulesData,
    // ]);

    return (
        <div className="row horizontal-form mt-3 add-address-form">
            <FormCreator
                config={formData}
                ref={ruleFormRef}
                {...formData}
            // onActionChange={formActionHandler}
            // onCheckBoxChange={formActionHandler}
            // key={shouldRerenderFormCreator}
            />
            <div className="col-md-12">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        // buttonText={updateSetData ? "Update" : "Save"}
                        buttonText="Save"
                    // onClick={handleAddress}
                    // isLoading={isAddAddressLoading || isUpdateAddAddressLoading}
                    // isDisable={isButtonDisable}
                    />
                    <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddEditRules