/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import { getTaxIdMinMaxLength } from "./config/TaxIdValidator";
import FormCreator from "../../../../components/Forms/FormCreator";
import CardSection from "../../../../components/ui/card/CardSection";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useAddEditCustomersBasicInformationMutation, useCheckCustomerNameExistMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery, useLazyGetCustomersBasicInformationByIdQuery, useLazyGetCustomersDetailsByCutomerNameQuery } from "../../../../app/services/basicdetailAPI";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";
import { customerbasicData, excludingRoles } from "./config/CustomerBasicDetail.data";
import ExistingCustomerSupplierInfo from "../../../../common/features/component/ExistingInfo/ExistingCustomerSupplierInfo";
import { setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";

const AddEditCustomerBasicDetail = ({ keyId, getCustomerById, isOpen, onSidebarClose, isEditablePage }) => {
    const parentRef = useRef();
    const basicDetailRef = useRef();
    const [customerName, setCustomerName] = useState('');
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const [noteId, setNoteId] = useState("")

    const [formData, setFormData] = useState(customerbasicData);
    const { nextRef, customerId, setCustomerId, moveNextPage, isResponsibleUser } = useContext(BasicDetailContext);

    const { formSetting } = customerbasicData;
    const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICCUSTOMERDETAILS);

    const [getCustomersBasicInformationById, { isFetching: isGetCustomersBasicInformationByIdFetching, isSuccess: isGetCustomersBasicInformationById,
        data: GetCustomersBasicInformationByIdData }] = useLazyGetCustomersBasicInformationByIdQuery();
    const [CheckCustomerNameExist, { isSuccess: isCustomerNameExistSucess, data: isCustomerNameExistData, }] = useCheckCustomerNameExistMutation();

    useEffect(() => {
        if (isEditablePage) {
            if (!isResponsibleUser) {
                if (hasEditPermission.isViewOnly === true) {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, true);
                }
                else {
                    formSetting.isViewOnly = false;
                    setIsButtonDisable(false);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, false);
                }
            }
            if (isResponsibleUser) {
                formSetting.isViewOnly = false;
                setIsButtonDisable(false);
                setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, true);
            }
        } else {
            formSetting.isViewOnly = false;
        }
        if (isOpen) {
            const modifyFormFields = removeFormFields(customerbasicData, ['responsibleUserId', 'isSubCompany', 'note']);
            setFormData(modifyFormFields);
            setFieldSetting(customerbasicData, 'name', FieldSettingType.INPUTBUTTON);
            setFieldSetting(customerbasicData, 'name', FieldSettingType.SECOUNDRYINPUTBUTTON);
        } else if (!isOpen) {
            setFieldSetting(customerbasicData, 'name', FieldSettingType.INPUTBUTTON, true);
            setFieldSetting(customerbasicData, 'name', FieldSettingType.SECOUNDRYINPUTBUTTON, true);
            const modifyFormFields = removeFormFields(formData, ['responsibleUserId']);
            setFormData(modifyFormFields);
        }
    }, [isOpen, hasEditPermission, formSetting.isViewOnly, isResponsibleUser])

    const [
        getAllGroupTypes,
        {
            isSuccess: isGetAllGroupTypesSucess,
            data: allGetAllGroupTypesData,
        },
    ] = useLazyGetAllGroupTypesQuery();

    const [
        getAllCountries,
        {
            isSuccess: isGetAllCountriesSucess,
            data: allGetAllCountriesData,
        },
    ] = useLazyGetAllCountriesQuery();

    const [
        getAllTerritories,
        {
            isSuccess: isGetAllTerritoriesSucess,
            data: allGetAllTerritoriesData,
        },
    ] = useLazyGetAllTerritoriesQuery();

    const [
        getAllUser,
        {
            isSuccess: isGetAllUserSucess,
            data: allGetAlluserData,
        },
    ] = useLazyGetAllUserQuery();

    const [
        addEditCustomersBasicInformation,
        {
            isLoading: isAddEditCustomersBasicInformationLoading,
            isSuccess: isAddEditCustomersBasicInformationSuccess,
            data: isAddEditCustomersBasicInformationData,
        },
    ] = useAddEditCustomersBasicInformationMutation();

    useEffect(() => {
        getAllGroupTypes();
        getAllCountries();
        getAllTerritories();
        getAllUser();
    }, []);

    const manageFilteredForm = () => {
        const manageData = { ...formData }
        const filteredFormFields = customerbasicData.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
        manageData.formFields = filteredFormFields;
        setFormData(manageData)
    };

    useEffect(() => {
        if (
            isGetAllGroupTypesSucess &&
            allGetAllGroupTypesData
        ) {
            const getData = allGetAllGroupTypesData.filter(x => x.isForCustomers).map((item) => ({
                value: item.groupTypeId,
                label: item.type,
            }));
            const dropdownField = customerbasicData.formFields.find(
                (item) => item.dataField === "groupTypeId"
            );
            dropdownField.fieldSetting.options = getData;
        }
    }, [
        isGetAllGroupTypesSucess,
        allGetAllGroupTypesData,
    ]);

    useEffect(() => {
        if (
            isGetAllCountriesSucess &&
            allGetAllCountriesData
        ) {
            const getData = allGetAllCountriesData.map((item) => ({
                value: item.countryId,
                label: item.name,
            }));
            const dropdownField = customerbasicData.formFields.find(
                (item) => item.dataField === "countryId"
            );
            dropdownField.fieldSetting.options = getData;
        }
    }, [
        isGetAllCountriesSucess,
        allGetAllCountriesData,
    ]);

    useEffect(() => {
        if (
            isGetAllTerritoriesSucess &&
            allGetAllTerritoriesData
        ) {
            const getData = allGetAllTerritoriesData.map((item) => ({
                value: item.territoryId,
                label: item.territory,
            }));
            const dropdownField = customerbasicData.formFields.find(
                (item) => item.dataField === "territoryId"
            );
            dropdownField.fieldSetting.options = getData;
        }
    }, [
        isGetAllTerritoriesSucess,
        allGetAllTerritoriesData,
    ]);

    useEffect(() => {
        if (isGetAllUserSucess && allGetAlluserData) {
            const filterData = allGetAlluserData.filter((item) => {
                return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());
            });

            const getData = filterData.map((item) => ({
                value: item.userId,
                label: item.fullName,
            }));
            const dropdownField = customerbasicData.formFields.find(
                (item) => item.dataField === "responsibleUserId"
            );
            dropdownField.fieldSetting.options = getData;
        }
    }, [isGetAllUserSucess, allGetAlluserData,]);

    useEffect(() => {
        if (isAddEditCustomersBasicInformationSuccess && isAddEditCustomersBasicInformationData) {
            if (isAddEditCustomersBasicInformationData.errorMessage.includes('exists')) {
                ToastService.warning(isAddEditCustomersBasicInformationData.errorMessage);
                return;
            }
            setNoteId(isAddEditCustomersBasicInformationData.noteId)
            if (keyId > 0) {
                getCustomerById()
                onreset()
                ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
            } else {
                setCustomerId(isAddEditCustomersBasicInformationData.keyValue)
                ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
                moveNextPage();
            }
        }
    }, [isAddEditCustomersBasicInformationSuccess, isAddEditCustomersBasicInformationData]);

    const onreset = () => {
        onSidebarClose()
        let restData = { ...customerbasicData };
        restData.initialState = { ...formData };
        setFormData(restData);
    }

    useEffect(() => {
        if (isGetCustomersBasicInformationById && GetCustomersBasicInformationByIdData && !isGetCustomersBasicInformationByIdFetching) {
            const newFrom = { ...customerbasicData };
            const { formFields } = getTaxIdMinMaxLength(GetCustomersBasicInformationByIdData.countryId, customerbasicData.formFields, 'taxId');
            newFrom.formFields = formFields;
            newFrom.initialState = { ...GetCustomersBasicInformationByIdData };
            newFrom.formFields = customerbasicData.formFields.filter(field => field.dataField !== "note" && field.id !== "name");
            setFormData(newFrom);
        }
    }, [isGetCustomersBasicInformationById, GetCustomersBasicInformationByIdData, isGetCustomersBasicInformationByIdFetching]);

    useEffect(() => {
        if (isOpen) {
            customerId && getCustomersBasicInformationById(customerId);
        }
    }, [isOpen])

    useImperativeHandle(nextRef, () => ({
        handleAddBasicDetails,
    }));

    const handleAddBasicDetails = () => {
        let data = basicDetailRef.current.getFormData();
        if (data) {
            let countryId = data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId;
            let req = {
                ...data,
                groupTypeId: data.groupTypeId && typeof data.groupTypeId === "object" ? data.groupTypeId.value : data.groupTypeId,
                territoryId: data.territoryId && typeof data.territoryId === "object" ? data.territoryId.value : data.territoryId,
                countryId: data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId,
                responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                customerId: keyId ? keyId : customerId,
                customerNoteId: noteId ? noteId : 0
            };

            if (data.taxId === "") {
                let value = {
                    ...req,
                    responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                }
                addEditCustomersBasicInformation(value);
            } else {
                if (data.taxId) {
                    const { message: validateTaxIdMessage, minLength, maxLength } = getTaxIdMinMaxLength(countryId ? countryId : 0, customerbasicData.formFields, 'taxId');
                    if (data.taxId.length === minLength || data.taxId.length >= maxLength) {
                        let value = {
                            ...req,
                            responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                        }
                        addEditCustomersBasicInformation(value);
                    } else {
                        ToastService.warning(validateTaxIdMessage);
                    }
                }
            }
        } else {
            ToastService.warning('Please enter customer basic information');
        }
    };

    const handleValidateTextId = (data, dataField) => {
        if (dataField === 'countryId') {
            const { formFields } = getTaxIdMinMaxLength(data.value, customerbasicData.formFields, 'taxId');
            const updatedForm = { ...formData };
            updatedForm.formFields = formFields;
            if (isOpen) {
                updatedForm.formFields = customerbasicData.formFields.filter(field => field.id !== "name" && field.dataField !== "note");
            } else {
                updatedForm.formFields = customerbasicData.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
            }
            setFormData(updatedForm);
        }
    }

    const formActionHandler = {
        DDL_CHANGED: handleValidateTextId
    };

    const handleInputFields = (data, dataField) => {
        if (dataField === 'name') {
            const trimCustomerName = data.replace(/\s+/g, '');
            setCustomerName(trimCustomerName);
        }
    }
    const formInputHandler = {
        INPUT_CHANGED: handleInputFields,
    }


    const handleInputGroupButton = () => {
        if (customerName !== '') {
            let request = {
                name: customerName
            }
            CheckCustomerNameExist(request);
        }
    }

    const handleExistingInfo = () => {
        if (customerName !== '' && customerName.trim().length >= 3) {
            if (parentRef.current) {
                parentRef.current.callChildFunction(customerName);
            }
        } else {
            ToastService.warning('Please enter at least three characters.');
        }
    }

    useEffect(() => {
        if (isCustomerNameExistSucess && isCustomerNameExistData) {
            if (isCustomerNameExistData.errorMessage.includes('exists')) {
                ToastService.warning(isCustomerNameExistData.errorMessage);
                return;
            }
            ToastService.info(isCustomerNameExistData.errorMessage);
        }
    }, [isCustomerNameExistSucess, isCustomerNameExistData]);

    return (
        <div className="basic-info-sec half-sec">
            <CardSection buttonClassName="theme-button">
                <div className="row basic-info-step">
                    <FormCreator
                        config={formData}
                        ref={basicDetailRef}
                        {...formData}
                        onActionChange={formActionHandler}
                        onInputChange={formInputHandler}
                        handleInputGroupButton={handleInputGroupButton}
                        handleInputShowInfo={handleExistingInfo}
                    />
                </div>

                {isOpen &&
                    <div className="col-md-12">
                        <div className="d-flex align-item-end justify-content-end">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText="Update"
                                onClick={handleAddBasicDetails}
                                isLoading={isAddEditCustomersBasicInformationLoading}
                                isDisable={isButtonDisable}
                            />
                            <Buttons
                                buttonTypeClassName="dark-btn ml-5"
                                buttonText="Cancel"
                                onClick={onSidebarClose}
                            />
                        </div>
                    </div>
                }

            </CardSection>

            {!isOpen ?
                <ExistingCustomerSupplierInfo parentRef={parentRef} isSupplier={false} getExistingInfoByName={useLazyGetCustomersDetailsByCutomerNameQuery} />
                : null}

        </div>
    );
};


export default AddEditCustomerBasicDetail;
