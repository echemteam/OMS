/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useImperativeHandle, useContext } from "react";
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import { settingTypeEnums } from "../../../../utils/Enums/enums";
import { supplierBasicData } from "./config/SupplierBasicDetail.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { setFieldSetting, setOptionFieldSetting } from "../../../../utils/FieldsSetting/SetFieldSetting";
import { excludingRoles } from "../../../customerDetail/features/basicDetail/config/BasicDetailForm.data";
//** Context API */
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from "../../../../app/services/basicdetailAPI";
import {
    useAddEditSupplierBasicInformationMutation, useCheckSupplierNameExistMutation, useLazyGetAllSupplierTypeQuery, useLazyGetSupplierBasicInformationByIdQuery,
    useLazyGetSupplierDetailsBySupplierNameQuery
} from "../../../../app/services/supplierAPI";
import { getTaxIdMinMaxLength } from "../../../customerDetail/feature/customerBasicDetail/config/TaxIdValidator";

//** Compoent's */
const ExistingCustomerSupplierInfo = React.lazy(() => import("../../../../common/features/component/ExistingInfo/ExistingCustomerSupplierInfo"));

const AddEditSupplierBasicDetail = ({ keyId, getSupplierById, isOpen, onSidebarClose }) => {

    //** State */
    const parentRef = useRef();
    const basicDetailRef = useRef();
    const [noteId, setNotId] = useState(0);
    const { formSetting } = supplierBasicData;
    const [supplierName, setSupplierName] = useState('');
    const [formData, setFormData] = useState(supplierBasicData);

    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const { nextStepRef, setSupplierId, moveNextPage, supplierId, isResponsibleUser } = useContext(AddSupplierContext);

    //** API Call's */
    const [getAllUser, { isSuccess: isGetAllUserSucess, data: allGetAllUserData, }] = useLazyGetAllUserQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData, }] = useLazyGetAllCountriesQuery();
    const [getAllGroupTypes, { isSuccess: isGetAllGroupTypesSucess, data: allGetAllGroupTypesData, }] = useLazyGetAllGroupTypesQuery();
    const [getAllTerritories, { isSuccess: isGetAllTerritoriesSucess, data: allGetAllTerritoriesData }] = useLazyGetAllTerritoriesQuery();
    const [getAllSupplierType, { isSuccess: isGetAllSupplierTypeSucess, data: allGetAllSupplierTypeData }] = useLazyGetAllSupplierTypeQuery();
    const [CheckSupplierNameExist, { isSuccess: isSupplierNameExistSucess, data: isSupplierNameExistData, }] = useCheckSupplierNameExistMutation();
    const [getSupplierBasicInformationById, { isFetching: isGetSupplierBasicInformationByIdFetching, isSuccess: isGetSupplierBasicInformationById,
        data: GetSupplierBasicInformationByIdData }] = useLazyGetSupplierBasicInformationByIdQuery();
    const [addEditSupplierBasicInformation, { isLoading: isAddEditSupplierBasicInformationLoading, isSuccess: isAddEditSupplierBasicInformationSuccess,
        data: isAddEditSupplierBasicInformationData }] = useAddEditSupplierBasicInformationMutation();

    //** Security Key */
    const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICSUPPLIERDETAILS);

    //** UseEffect's */
    useEffect(() => {
        if (isOpen) {
            if (!isResponsibleUser) {
                if (hasEditPermission.isViewOnly === true) {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
                    setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
                }
                else {
                    formSetting.isViewOnly = false;
                    setIsButtonDisable(false);
                    setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, false);
                }
            }
            if (isResponsibleUser) {
                formSetting.isViewOnly = false;
                setIsButtonDisable(false);
                setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
            }
        }
    }, [isOpen, hasEditPermission, formSetting, formData, isResponsibleUser])

    useEffect(() => {
        getAllUser();
        getAllCountries();
        getAllGroupTypes();
        getAllTerritories();
        getAllSupplierType();
        if (!isOpen) {
            removeFormFields(formData, ['responsibleUserId'], setFormData);
            setFieldSetting(formData, 'name', settingTypeEnums.isInputButton, true);
        }
    }, [keyId, isOpen]);

    useEffect(() => {
        if (isOpen) {
            if (supplierId > 0) {
                getSupplierBasicInformationById(supplierId);
                setFieldSetting(formData, 'name', settingTypeEnums.isInputButton);
            }
        }
    }, [isOpen, supplierId, getSupplierBasicInformationById])

    useEffect(() => {
        if (isGetAllGroupTypesSucess && allGetAllGroupTypesData) {
            setOptionFieldSetting(allGetAllGroupTypesData, 'groupTypeId', 'type', supplierBasicData, 'groupTypeId');
        }
        if (isGetAllUserSucess && allGetAllUserData) {
            const filterCondition = (item) => {
                return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());;
            };
            setOptionFieldSetting(allGetAllUserData, 'userId', 'fullName', supplierBasicData, 'responsibleUserId', filterCondition);
        }
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setOptionFieldSetting(allGetAllCountriesData, 'countryId', 'name', supplierBasicData, 'countryId');
        }
        if (isGetAllTerritoriesSucess && allGetAllTerritoriesData) {
            setOptionFieldSetting(allGetAllTerritoriesData, 'territoryId', 'territory', supplierBasicData, 'territoryId');
        }
        if (isGetAllSupplierTypeSucess && allGetAllSupplierTypeData) {
            setOptionFieldSetting(allGetAllSupplierTypeData, 'supplierTypeId', 'type', supplierBasicData, 'supplierTypeId');
        }
    }, [isGetAllGroupTypesSucess, allGetAllGroupTypesData, isGetAllUserSucess, allGetAllUserData, isGetAllCountriesSucess, allGetAllCountriesData,
        isGetAllTerritoriesSucess, allGetAllTerritoriesData, isGetAllSupplierTypeSucess, allGetAllSupplierTypeData]);

    useEffect(() => {
        if (isGetSupplierBasicInformationById && GetSupplierBasicInformationByIdData && !isGetSupplierBasicInformationByIdFetching) {
            const newFrom = { ...supplierBasicData };
            const { formFields } = getTaxIdMinMaxLength(GetSupplierBasicInformationByIdData.countryId, supplierBasicData.formFields, 'taxId');
            newFrom.formFields = formFields;
            newFrom.initialState = { ...GetSupplierBasicInformationByIdData };
            newFrom.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "note");
            setFormData(newFrom);
        }
    }, [isGetSupplierBasicInformationById, GetSupplierBasicInformationByIdData, isGetSupplierBasicInformationByIdFetching]);

    useEffect(() => {
        if (isAddEditSupplierBasicInformationSuccess && isAddEditSupplierBasicInformationData) {
            if (isAddEditSupplierBasicInformationData.errorMessage.includes('exists')) {
                ToastService.warning(isAddEditSupplierBasicInformationData.errorMessage);
                return;
            }
            setNotId(isAddEditSupplierBasicInformationData?.noteId)
            if (keyId > 0) {
                getSupplierById();
                ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
                onResetForm(supplierBasicData, setFormData);
                onSidebarClose();
            } else {
                setSupplierId(isAddEditSupplierBasicInformationData.keyValue)
                ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
                moveNextPage();
            }
        }
    }, [isAddEditSupplierBasicInformationSuccess, isAddEditSupplierBasicInformationData]);

    useEffect(() => {
        if (isSupplierNameExistSucess && isSupplierNameExistData) {
            if (isSupplierNameExistData.errorMessage.includes('exists')) {
                ToastService.warning(isSupplierNameExistData.errorMessage);
                return;
            }
            ToastService.info(isSupplierNameExistData.errorMessage);
        }
    }, [isSupplierNameExistSucess, isSupplierNameExistData]);

    //** Handle Function's */
    const handleAddEditSupplier = () => {
        let data = basicDetailRef.current.getFormData();
        if (data) {
            let countryId = data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId;
            let req = {
                ...data,
                groupTypeId: data.groupTypeId && typeof data.groupTypeId === "object"
                    ? data.groupTypeId.value
                    : data.groupTypeId,
                supplierTypeId: data.supplierTypeId && typeof data.supplierTypeId === "object"
                    ? data.supplierTypeId.value
                    : data.supplierTypeId,
                territoryId: data.territoryId && typeof data.territoryId === "object"
                    ? data.territoryId.value
                    : data.territoryId,
                countryId: data.countryId && typeof data.countryId === "object"
                    ? data.countryId.value
                    : data.countryId,
                responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object"
                    ? data.responsibleUserId.value
                    : data.responsibleUserId,
                supplierId: keyId ? keyId : supplierId,
                supplierNoteId: noteId ? noteId : 0
            }

            if (data.taxId === "") {
                let value = {
                    ...req,
                    responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                }
                addEditSupplierBasicInformation(value);
            } else {
                if (data.taxId) {
                    const { message: validateTaxIdMessage, minLength, maxLength } = getTaxIdMinMaxLength(countryId ? countryId : 0, supplierBasicData.formFields, 'taxId');
                    if (data.taxId.length === minLength || data.taxId.length >= maxLength) {
                        let value = {
                            ...req,
                            responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                        }
                        addEditSupplierBasicInformation(value);
                    } else {
                        ToastService.warning(validateTaxIdMessage);
                    }
                }
            }

        } else {
            ToastService.warning('Please enter supplier basic information');
        }
    };
    const handleInputGroupButton = () => {
        if (supplierName !== '') {
            let request = {
                name: supplierName
            }
            CheckSupplierNameExist(request);
        }
    };
    const handleValidateTextId = (data, dataField) => {
        if (dataField === 'countryId') {
            const modifyFormFields = getTaxIdMinMaxLength(data.value, supplierBasicData.formFields, 'taxId');
            const updatedForm = { ...formData };
            updatedForm.formFields = modifyFormFields;
            if (isOpen) {
                updatedForm.formFields = supplierBasicData.formFields.filter(field => field.id !== "name" && field.dataField !== "note");
            } else {
                updatedForm.formFields = supplierBasicData.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
            }
            setFormData(updatedForm);
        }
    };
    const handleInputFields = (data, dataField) => {
        if (dataField === 'name') {
            const trimCustomerName = data.replace(/\s+/g, '');
            setSupplierName(trimCustomerName);
        }
    };

    //** Use Imperative Handle */
    useImperativeHandle(nextStepRef, () => ({
        handleAddEditSupplier
    }));

    //** Form Handler */
    const formInputHandler = {
        INPUT_CHANGED: handleInputFields
    }
    const formActionHandler = {
        DDL_CHANGED: handleValidateTextId
    };

    const handleExistingInfo = () => {
        if (supplierName !== '' && supplierName.trim().length >= 3) {
            if (parentRef.current) {
                parentRef.current.callChildFunction(supplierName);
            }
        } else {
            ToastService.warning('Please enter at least three characters.');
        }
    }

    return (
        <React.Fragment>
            <div className="row horizontal-form basic-info-step">
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
                            onClick={handleAddEditSupplier}
                            isLoading={isAddEditSupplierBasicInformationLoading}
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
            {!isOpen ?
                <ExistingCustomerSupplierInfo parentRef={parentRef} isSupplier={true} getExistingInfoByName={useLazyGetSupplierDetailsBySupplierNameQuery} />
                : null}
        </React.Fragment>
    );
}

export default AddEditSupplierBasicDetail;