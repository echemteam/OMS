/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useImperativeHandle, useContext } from "react";
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";
import FormCreator from "../../../../components/Forms/FormCreator";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { setFieldSetting, setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Context API */
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllIncotermQuery, useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from "../../../../app/services/basicdetailAPI";
import {
    useAddEditSupplierBasicInformationMutation, useCheckSupplierNameExistMutation, useLazyGetAllSupplierTypeQuery, useLazyGetSupplierBasicInformationByIdQuery,
    useLazyGetSupplierDetailsBySupplierNameQuery
} from "../../../../app/services/supplierAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { supplierBasicData } from "./config/SupplierBasicDetail.data";
import { excludingRoles } from "../../../customerDetail/feature/customerBasicDetail/config/CustomerBasicDetail.data";
import { getTaxIdMinMaxLength } from "../../../customerDetail/feature/customerBasicDetail/config/TaxIdValidator";
import PropTypes from 'prop-types';
import { validateResponsibleUserId } from "../../../../utils/ResponsibleUser/validateRUser";
import { useSelector } from "react-redux";
import SwalAlert from "../../../../services/swalService/SwalService";

//** Compoent's */
const ExistingCustomerSupplierInfo = React.lazy(() => import("../../../../common/features/component/ExistingInfo/ExistingCustomerSupplierInfo"));

const AddEditSupplierBasicDetail = ({ keyId, getSupplierById, isOpen, onSidebarClose, isEditablePage }) => {

    //** State */
    const parentRef = useRef();
    const basicDetailRef = useRef();
    const { confirm } = SwalAlert();
    const authState = useSelector((state) => state.auth);
    const [noteId, setNoteId] = useState(0);
    const { formSetting } = supplierBasicData;
    const [supplierName, setSupplierName] = useState('');
    const [formData, setFormData] = useState(supplierBasicData);
    const [isResponsibleUser, setIsResponsibleUser] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    // const { ValidateRequestByApprovalRules } = useValidateAndAddApprovalRequests();
    const { nextStepRef, setSupplierId, moveNextPage, supplierId } = useContext(AddSupplierContext);
    const [checkExistingInformation] = useLazyGetSupplierDetailsBySupplierNameQuery();

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
    const [getAllIncoterm, { isSuccess: isGetAllIncotermSucess, data: allGetAllIncotermData }] = useLazyGetAllIncotermQuery();

    //** Security Key */
    const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICSUPPLIERDETAILS);

    //** UseEffect's */
    useEffect(() => {
        if (isEditablePage) {
            if (!isResponsibleUser) {
                if (hasEditPermission.isViewOnly === true) {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, true);
                }
                else if (hasEditPermission.isEditable === true) {
                    formSetting.isViewOnly = false;
                    setIsButtonDisable(false);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, false);
                }
                else {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
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
            // setFieldSetting(supplierBasicData, 'name', FieldSettingType.ISPRIMARYBUTTONVISIBLE);
            setFieldSetting(supplierBasicData, 'name', FieldSettingType.ISINFOBUTTONVISIBLE);
        } else if (!isOpen) {
            // setFieldSetting(supplierBasicData, 'name', FieldSettingType.ISPRIMARYBUTTONVISIBLE, true);
            setFieldSetting(supplierBasicData, 'name', FieldSettingType.ISINFOBUTTONVISIBLE, true);
        }

    }, [isOpen, isEditablePage, hasEditPermission, formSetting, formData, isResponsibleUser])

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getAllUser(),
                getAllCountries(),
                getAllGroupTypes(),
                getAllTerritories(),
                getAllSupplierType(),
                getAllIncoterm(),
            ]);

            if (!isOpen) {
                const modifyFormFields = removeFormFields(formData, ['responsibleUserId']);
                setFormData(modifyFormFields);
                // setFieldSetting(formData, 'name', FieldSettingType.ISPRIMARYBUTTONVISIBLE, true);
            }
        };

        fetchData();
    }, [keyId, isOpen]);


    useEffect(() => {
        if (isOpen) {
            if (supplierId > 0) {
                getSupplierBasicInformationById(supplierId);
                // setFieldSetting(formData, 'name', FieldSettingType.ISPRIMARYBUTTONVISIBLE);
            }
        }
    }, [isOpen, supplierId, getSupplierBasicInformationById])

    useEffect(() => {
        if (isGetAllGroupTypesSucess && allGetAllGroupTypesData) {
            setDropDownOptionField(allGetAllGroupTypesData, 'groupTypeId', 'type', supplierBasicData, 'groupTypeId');
        }
        if (isGetAllUserSucess && allGetAllUserData) {
            const filterData = allGetAllUserData.filter((item) => {
                return (item.roleName === null || !excludingRoles.map((role) => role.toLowerCase()).includes(item.roleName.toLowerCase()));
            });
            // Remove duplicates based on fullName
            const uniqueData = Array.from(new Map(filterData.map((item) => [item.fullName, item])).values());
            setDropDownOptionField(uniqueData, 'userId', 'fullName', supplierBasicData, 'responsibleUserId');
        }
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', supplierBasicData, 'countryId');
        }
        if (isGetAllTerritoriesSucess && allGetAllTerritoriesData) {
            setDropDownOptionField(allGetAllTerritoriesData, 'territoryId', 'territory', supplierBasicData, 'territoryId');
        }
        if (isGetAllSupplierTypeSucess && allGetAllSupplierTypeData) {
            setDropDownOptionField(allGetAllSupplierTypeData, 'supplierTypeId', 'type', supplierBasicData, 'supplierTypeId');
        }
        if (isGetAllIncotermSucess && allGetAllIncotermData) {
            setDropDownOptionField(allGetAllIncotermData, 'incotermId', 'incotermName', supplierBasicData, 'incotermId');
        }
    }, [isGetAllGroupTypesSucess, allGetAllGroupTypesData, isGetAllUserSucess, allGetAllUserData, isGetAllCountriesSucess, allGetAllCountriesData,
        isGetAllTerritoriesSucess, allGetAllTerritoriesData, isGetAllSupplierTypeSucess, allGetAllSupplierTypeData, isGetAllIncotermSucess, allGetAllIncotermData]);

    useEffect(() => {
        if (isGetSupplierBasicInformationById && GetSupplierBasicInformationByIdData && !isGetSupplierBasicInformationByIdFetching) {
            const newFrom = { ...supplierBasicData };
            const { formFields } = getTaxIdMinMaxLength(GetSupplierBasicInformationByIdData.countryId, supplierBasicData.formFields, 'taxId');
            newFrom.formFields = formFields;
            newFrom.initialState = { ...GetSupplierBasicInformationByIdData };
            newFrom.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "note");
            setFormData(newFrom);
            setIsResponsibleUser(validateResponsibleUserId(GetSupplierBasicInformationByIdData.responsibleUserId, authState?.user?.userID));

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
    const handleAddEditSupplier = async () => {
        let data = basicDetailRef.current.getFormData();
        if (!data) {
            ToastService.warning('Please enter supplier basic information');
            return;
        }
        if (!isOpen) {
            const result = await checkExistingInformation(data.name).unwrap().catch(error => {
                ToastService.warning('Failed to check existing information.');
            });
            if (result && result.length > 0) {
                confirm("Similar Supplier Names Found?", "We've found some supplier with matching names. Would you like to review them before moving forward? Simply click the magnifier button to view the existing supplier details, or proceed with adding the new supplier.",
                    "Countine", 'Close and View', true).then((confirmed) => {
                        if (confirmed) {
                            addSupplierCountine();
                        }
                    });
            } else {
                addSupplierCountine();
            }
        } else {
            addSupplierCountine();
        }
    };

    const addSupplierCountine = () => {
        let data = basicDetailRef.current.getFormData();
        const getIdValue = (field) => {
            return field && typeof field === "object" ? field.value : field;
        }
        const req = {
            ...data,
            groupTypeId: getIdValue(data.groupTypeId),
            supplierTypeId: getIdValue(data.supplierTypeId),
            territoryId: getIdValue(data.territoryId),
            incotermId: getIdValue(data.incotermId),
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
        if (data.taxId.length >= minLength || data.taxId.length <= maxLength) {
            addEditSupplierBasicInformation(req);
        } else {
            ToastService.warning(validateTaxIdMessage);
        }
    }

    const handleInputGroupButton = () => {
        if (supplierName.trim() !== '') {
            CheckSupplierNameExist({ name: supplierName.trim() });
        }
    };

    const handleValidateTextId = (data, dataField) => {
        if (dataField === 'countryId') {
            const { formFields } = getTaxIdMinMaxLength(data.value, supplierBasicData.formFields, 'taxId');
            const updatedForm = { ...formData };
            updatedForm.formFields = formFields;
            if (isOpen) {
                updatedForm.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "note" && field.dataField !== "responsibleUserId");
            } else {
                updatedForm.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "responsibleUserId");
            }
            setFormData(updatedForm);
        }
    }

    const handleInputFields = (data, dataField) => {
        if (dataField === 'name') {
            const trimName = data.replace(/\s+/g, ' ').trim();
            setSupplierName(trimName);
        }
        if (dataField === 'website') {
            const trimmedUrl = data.replace(/\/$/, "");
            basicDetailRef.current.updateFormFieldValue({
                website: trimmedUrl
            });
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
        // const trimmedName = supplierName.trim();

        if (supplierName.length < 3) {
            ToastService.warning('Please enter at least three characters.');
            return;
        }

        if (parentRef.current) {
            parentRef.current.callChildFunction(supplierName);
        }
    };

    return (
        <React.Fragment>
            <div className="row basic-info-step">
                {!isGetSupplierBasicInformationByIdFetching ?
                    <FormCreator
                        config={formData}
                        ref={basicDetailRef}
                        {...formData}
                        onActionChange={formActionHandler}
                        onInputChange={formInputHandler}
                        handleInputGroupButton={handleInputGroupButton}
                        handleInputShowInfo={handleExistingInfo}
                    />
                    : <DataLoader />
                }
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
            {!isOpen &&
                <ExistingCustomerSupplierInfo parentRef={parentRef} isOrderManage={false} isSupplier={true} getExistingInfoByName={useLazyGetSupplierDetailsBySupplierNameQuery} />
            }
        </React.Fragment>
    );
}

AddEditSupplierBasicDetail.propTypes = {
    keyId: PropTypes.number,
    getSupplierById: PropTypes.func,
    isOpen: PropTypes.bool,
    onSidebarClose: PropTypes.func,
    isEditablePage: PropTypes.bool
};
export default AddEditSupplierBasicDetail;