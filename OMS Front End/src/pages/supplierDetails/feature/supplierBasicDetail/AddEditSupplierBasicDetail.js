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
    const [noteId, setNoteId] = useState(0);
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
        const fetchData = async () => {
            await Promise.all([
                getAllUser(),
                getAllCountries(),
                getAllGroupTypes(),
                getAllTerritories(),
                getAllSupplierType()
            ]);

            if (!isOpen) {
                removeFormFields(formData, ['responsibleUserId'], setFormData);
                setFieldSetting(formData, 'name', settingTypeEnums.isInputButton, true);
            }
        };

        fetchData();
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
            const { errorMessage, noteId, keyValue } = isAddEditSupplierBasicInformationData;
            if (errorMessage.includes('exists')) {
                ToastService.warning(errorMessage);
                return;
            }
            setNoteId(noteId)
            if (keyId > 0) {
                getSupplierById();
                ToastService.success(errorMessage);
                onResetForm(supplierBasicData, setFormData);
                onSidebarClose();
            } else {
                setSupplierId(keyValue)
                ToastService.success(errorMessage);
                moveNextPage();
            }
        }
    }, [isAddEditSupplierBasicInformationSuccess, isAddEditSupplierBasicInformationData]);

    useEffect(() => {
        if (isSupplierNameExistSucess && isSupplierNameExistData) {
            const { errorMessage } = isSupplierNameExistData;
            if (errorMessage.includes('exists')) {
                ToastService.warning(errorMessage);
                return;
            }
            ToastService.info(errorMessage);
        }
    }, [isSupplierNameExistSucess, isSupplierNameExistData]);

    //** Handle Function's */
    const handleAddEditSupplier = () => {
        let data = basicDetailRef.current.getFormData();
        if (!data) {
            ToastService.warning('Please enter supplier basic information');
            return;
        }

        const getIdValue = (field) => {
            return field && typeof field === "object" ? field.value : field;
        }

        const req = {
            ...data,
            groupTypeId: getIdValue(data.groupTypeId),
            supplierTypeId: getIdValue(data.supplierTypeId),
            territoryId: getIdValue(data.territoryId),
            countryId: getIdValue(data.countryId),
            responsibleUserId: getIdValue(data.responsibleUserId) || 0,
            supplierId: keyId || supplierId,
            supplierNoteId: noteId || 0
        };

        if (!data.taxId) {
            addEditSupplierBasicInformation(req);
            return;
        }

        const { message: validateTaxIdMessage, minLength, maxLength } = getTaxIdMinMaxLength(req.countryId || 0, supplierBasicData.formFields, 'taxId');
        if (data.taxId.length === minLength || data.taxId.length >= maxLength) {
            addEditSupplierBasicInformation(req);
        } else {
            ToastService.warning(validateTaxIdMessage);
        }
    };



    const handleInputGroupButton = () => {
        if (supplierName.trim() !== '') {
            CheckSupplierNameExist({ name: supplierName.trim() });
        }
    };

    const handleValidateTextId = (data, dataField) => {
        if (dataField !== 'countryId') return;

        const updatedFormFields = getTaxIdMinMaxLength(data.value, supplierBasicData.formFields, 'taxId');
        const filteredFields = supplierBasicData.formFields.filter(field => {
            if (isOpen) {
                return field.id !== "name" && field.dataField !== "note";
            }
            return field.id !== "name-input" && field.dataField !== "responsibleUserId";
        });

        setFormData({ ...formData, formFields: isOpen ? filteredFields : updatedFormFields });
    };

    const handleInputFields = (data, dataField) => {
        if (dataField === 'name') {
            setSupplierName(data.trim());
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
        if (!supplierName || typeof supplierName !== 'string') {
            ToastService.warning('Supplier name is invalid.');
            return;
        }
        const trimmedName = supplierName.trim();

        if (trimmedName.length < 3) {
            ToastService.warning('Please enter at least three characters.');
            return;
        }

        if (parentRef.current) {
            parentRef.current.callChildFunction(trimmedName);
        }
    };

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