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
import { useLazyGetAllIncotermQuery, useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useAddEditCustomersBasicInformationMutation, useCheckCustomerNameExistMutation, useGetSearchCustomersDetailsByNameEmailWebsiteMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery, useLazyGetCustomersBasicInformationByIdQuery, useLazyGetCustomersDetailsByCutomerNameQuery } from "../../../../app/services/basicdetailAPI";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";
import { customerbasicData, excludingRoles } from "./config/CustomerBasicDetail.data";
import ExistingCustomerSupplierInfo from "../../../../common/features/component/ExistingInfo/ExistingCustomerSupplierInfo";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import PropTypes from 'prop-types';
import SwalAlert from "../../../../services/swalService/SwalService";
import { validateResponsibleUserId } from "../../../../utils/ResponsibleUser/validateRUser";
import { useSelector } from "react-redux";
import { isCustomerOrSupplierApprovedStatus } from "../../../../utils/CustomerSupplier/CustomerSupplierUtils";
import { SuccessMessage } from "../../../../data/appMessages";
import ValidateCustomerSupplierInfo from "../../../../common/features/component/ExistingInfo/ValidateCustomerSupplierInfo";
import { validateNameEmailWebsiteGrid } from "../../../../common/features/component/ExistingInfo/Config/Existing.data";


const AddEditCustomerBasicDetail = ({ keyId, getCustomerById, isOpen, onSidebarClose, isEditablePage, setSubCustomer, customerStatusId }) => {

    //** State */
    const parentRef = useRef();
    const basicDetailRef = useRef();
    const { confirm } = SwalAlert();
    const [noteId, setNoteId] = useState(0);
    const { formSetting } = customerbasicData;
    const authState = useSelector((state) => state.auth);
    const [customerName, setCustomerName] = useState('');
    const [formData, setFormData] = useState(customerbasicData);
    const [isButtonDisable, setIsButtonDisable] = useState(false);
    const [isResponsibleUser, setIsResponsibleUser] = useState(false);
    const [validateCustomerSupplierInfoModal, setValidateCustomerSupplierInfoModal] = useState(false);
    const [validateCustomerSupplierData, setValidateCustomerSupplierData] = useState([]);
    const [isRemoveFields, setIsRemoveFields] = useState(false);
    const { nextRef, customerId, setCustomerId, moveNextPage, setCustomerCountryId } = useContext(BasicDetailContext);

    //** API Call's */
    const [getAllUser, { isSuccess: isGetAllUserSucess, data: allGetAllUserData }] = useLazyGetAllUserQuery();
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllGroupTypes, { isSuccess: isGetAllGroupTypesSucess, data: allGetAllGroupTypesData }] = useLazyGetAllGroupTypesQuery();
    const [getAllTerritories, { isSuccess: isGetAllTerritoriesSucess, data: allGetAllTerritoriesData }] = useLazyGetAllTerritoriesQuery();
    const [getAllIncoterm, { isSuccess: isGetAllIncotermSucess, data: allGetAllIncotermData }] = useLazyGetAllIncotermQuery();
    const [CheckCustomerNameExist, { isSuccess: isCustomerNameExistSucess, data: isCustomerNameExistData, }] = useCheckCustomerNameExistMutation();
    const [getCustomersBasicInformationById, { isFetching: isGetCustomersBasicInformationByIdFetching, isSuccess: isGetCustomersBasicInformationById,
        data: GetCustomersBasicInformationByIdData }] = useLazyGetCustomersBasicInformationByIdQuery();
    const [addEditCustomersBasicInformation, { isLoading: isAddEditCustomersBasicInformationLoading, isSuccess: isAddEditCustomersBasicInformationSuccess,
        data: isAddEditCustomersBasicInformationData }] = useAddEditCustomersBasicInformationMutation();
    const [validateCustomerNameEmailWebsite, { isSuccess: isValidateCustomerNameEmailWebsiteSucess, data: isValidateCustomerNameEmailWebsiteData, isLoading }] = useGetSearchCustomersDetailsByNameEmailWebsiteMutation();

    //** Security Key */
    const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICCUSTOMERDETAILS);

    //** UseEffect's */
    useEffect(() => {
        if (isEditablePage) {
            if (!isResponsibleUser) {
                if (hasEditPermission.isViewOnly === true) {
                    formSetting.isViewOnly = true;
                    setIsButtonDisable(true);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, true);
                } else if (hasEditPermission.isEditable === true) {
                    formSetting.isViewOnly = false;
                    setIsButtonDisable(false);
                    setFieldSetting(formData, 'responsibleUserId', FieldSettingType.DISABLED, false);
                } else {
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
    }, [isEditablePage, hasEditPermission, isResponsibleUser]);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getAllUser(),
                getAllCountries(),
                getAllGroupTypes(),
                getAllTerritories(),
                getAllIncoterm()
            ]);
            if (!isOpen) {
                const modifyFormFields = removeFormFields(formData, ['responsibleUserId']);
                setFormData(modifyFormFields);
                setIsRemoveFields(true);
                setFieldSetting(customerbasicData, 'name', FieldSettingType.ISINFOBUTTONVISIBLE, true);
            }
        };
        fetchData();
    }, [keyId, isOpen]);

    useEffect(() => {
        if (isOpen) {
            if (customerId > 0) {
                getCustomersBasicInformationById(customerId);
                setFieldSetting(customerbasicData, 'name', FieldSettingType.ISINFOBUTTONVISIBLE);
            }
        }
    }, [isOpen, customerId, getCustomersBasicInformationById]);

    useEffect(() => {
        if (isGetAllGroupTypesSucess && allGetAllGroupTypesData) {
            setDropDownOptionField(allGetAllGroupTypesData, 'groupTypeId', 'type', customerbasicData, 'groupTypeId');
        }
        if (isGetAllUserSucess && allGetAllUserData) {
            const filterData = allGetAllUserData.filter((item) => {
                return (item.roleName === null || !excludingRoles.map((role) => role.toLowerCase()).includes(item.roleName.toLowerCase()));
            });
            // Remove duplicates based on fullName
            const uniqueData = Array.from(new Map(filterData.map((item) => [item.fullName, item])).values());
            setDropDownOptionField(uniqueData, 'userId', 'fullName', customerbasicData, 'responsibleUserId');
        }
        if (isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', customerbasicData, 'countryId');
        }
        if (isGetAllTerritoriesSucess && allGetAllTerritoriesData) {
            setDropDownOptionField(allGetAllTerritoriesData, 'territoryId', 'territory', customerbasicData, 'territoryId');
        }
        if (isGetAllIncotermSucess && allGetAllIncotermData) {
            setDropDownOptionField(allGetAllIncotermData, 'incotermId', 'incotermName', customerbasicData, 'incotermId');
        }
    }, [isGetAllGroupTypesSucess, allGetAllGroupTypesData, isGetAllUserSucess, allGetAllUserData, isGetAllCountriesSucess, allGetAllCountriesData,
        isGetAllTerritoriesSucess, allGetAllTerritoriesData, isGetAllIncotermSucess, allGetAllIncotermData]);

    useEffect(() => {
        if (isAddEditCustomersBasicInformationSuccess && isAddEditCustomersBasicInformationData) {
            if (isAddEditCustomersBasicInformationData.errorMessage.includes('exists')) {
                ToastService.warning(isAddEditCustomersBasicInformationData.errorMessage);
                return;
            }
            setNoteId(isAddEditCustomersBasicInformationData.noteId)
            if (keyId > 0) {
                getCustomerById()
                onreset();
                if (!isCustomerOrSupplierApprovedStatus(customerStatusId)) {
                    ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
                }
            } else {
                setCustomerId(isAddEditCustomersBasicInformationData.keyValue)
                if (!isCustomerOrSupplierApprovedStatus(customerStatusId)) {
                    ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
                }
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
            if (isCustomerOrSupplierApprovedStatus(GetCustomersBasicInformationByIdData.statusId)) {
                setFieldSetting(customerbasicData, 'name', FieldSettingType.DISABLED, true);
                setFieldSetting(formData, 'taxId', 'isDisabled', true);
            } else {
                setFieldSetting(customerbasicData, 'name', FieldSettingType.DISABLED, false);
                setFieldSetting(formData, 'taxId', 'isDisabled');
            }
            const newFrom = { ...customerbasicData };
            const { formFields } = getTaxIdMinMaxLength(GetCustomersBasicInformationByIdData.countryId, customerbasicData.formFields, 'taxId');
            newFrom.formFields = formFields;
            newFrom.initialState = { ...GetCustomersBasicInformationByIdData, attachmentName: GetCustomersBasicInformationByIdData?.base64File };
            newFrom.formFields = customerbasicData.formFields.filter(field => field.dataField !== "note" && field.dataField !== "isSubCustomer" && field.dataField !== "responsibleUserId");
            newFrom.formFields = newFrom.formFields.filter((field) => field.dataField !== 'attachment' && field.dataField !== '');
            setFormData(newFrom);
            setCustomerCountryId(GetCustomersBasicInformationByIdData.countryId);
            setIsResponsibleUser(validateResponsibleUserId(GetCustomersBasicInformationByIdData.responsibleUserId, authState?.user?.userID));
        }
    }, [isGetCustomersBasicInformationById, GetCustomersBasicInformationByIdData, isGetCustomersBasicInformationByIdFetching]);

    useEffect(() => {
        if (isOpen) {
            customerId && getCustomersBasicInformationById(customerId);
        }
    }, [isOpen]);

    useImperativeHandle(nextRef, () => ({
        handleAddBasicDetails,
    }));

    useEffect(() => {
        if (isValidateCustomerNameEmailWebsiteSucess && isValidateCustomerNameEmailWebsiteData) {
            if (isValidateCustomerNameEmailWebsiteData && isValidateCustomerNameEmailWebsiteData.length > 0 && !customerId > 0) {
                setValidateCustomerSupplierData(isValidateCustomerNameEmailWebsiteData);
                setValidateCustomerSupplierInfoModal(true);
            } else {
                setValidateCustomerSupplierInfoModal(false);
                addCustomerCountine();
            }
        }
    }, [isValidateCustomerNameEmailWebsiteSucess, isValidateCustomerNameEmailWebsiteData]);

    const handleAddBasicDetails = async () => {
        let data = basicDetailRef.current.getFormData();
        if (data) {
            if (!isOpen) {
                let req = {
                    CustomerName: data?.name,
                    Website: data?.website,
                    EmailAddress: data?.emailAddress
                }
                await validateCustomerNameEmailWebsite(req).unwrap();
            } else {
                addCustomerCountine();
            }
        } else {
            ToastService.warning('Please fill up all the required fields');
        }
    };

    const addCustomerCountine = () => {
        let data = basicDetailRef.current.getFormData();
        setSubCustomer && setSubCustomer(data.isSubCustomer);
        let countryId = data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId;
        let req = {
            ...data,
            groupTypeId: data.groupTypeId && typeof data.groupTypeId === "object" ? data.groupTypeId.value : data.groupTypeId,
            territoryId: data.territoryId && typeof data.territoryId === "object" ? data.territoryId.value : data.territoryId,
            incotermId: data.incotermId && typeof data.incotermId === "object" ? data.incotermId.value : data.incotermId,
            countryId: data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId,
            responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
            customerId: keyId ? keyId : customerId,
            customerNoteId: noteId ? noteId : 0,
            attachmentName: data.attachment ? data.attachment?.fileName : null,
            base64File: data.attachment ? data.attachment?.base64Data : null,
            storagePath: 'CustomerProfilePic'
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
                if (data.taxId.length >= minLength || data.taxId.length <= maxLength) {
                    let value = {
                        ...req,
                        attachmentName: data.attachment ? data.attachment?.fileName : null,
                        base64File: data.attachment ? data.attachment?.base64Data : null,
                        storagePath: 'CustomerProfilePic',
                        responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
                    }
                    addEditCustomersBasicInformation(value);
                } else {
                    ToastService.warning(validateTaxIdMessage);
                }
            }
        }
    }

    const handleValidateTextId = (data, dataField) => {
        if (dataField === 'countryId') {
            const { formFields } = getTaxIdMinMaxLength(data.value, customerbasicData.formFields, 'taxId');
            const updatedForm = { ...formData };
            updatedForm.formFields = formFields;
            if (isOpen) {
                updatedForm.formFields = customerbasicData.formFields.filter(field => field.dataField !== "note" && field.dataField !== "isSubCustomer" && field.dataField !== "responsibleUserId");
            } else {
                updatedForm.formFields = customerbasicData.formFields.filter(field => field.dataField !== "responsibleUserId");
            }
            setFormData(updatedForm);
        }
    }
    const handleCheckboxchange = (data, datafield) => {
        if (customerId) {
            if (datafield === "isBuyingForThirdParty" && GetCustomersBasicInformationByIdData.isBuyingForThirdParty === true) {
                confirm(
                    "Warning?",
                    SuccessMessage.Confirm_Update.replace("{0}", "Is Buying For ThirdParty"),
                    "Yes",
                    "Cancel"
                ).then((confirmed) => {
                    if (confirmed) {
                        let request = {
                            ...formData,
                            isBuyingForThirdParty: data,
                        };
                        setFormData(request);
                    }
                });
            }
        }
    }
    const formActionHandler = {
        DDL_CHANGED: handleValidateTextId,
        CHECK_CHANGE: handleCheckboxchange
    };
    const handleInputFields = (data, dataField) => {
        if (dataField === 'name') {
            const newName = data.replace(/[.,]/g, '')
            const trimName = newName.replace(/\s+/g, ' ').trim();
            setCustomerName(trimName);
            basicDetailRef.current.updateFormFieldValue({
                name: newName
            });
        }
        if (dataField === 'website') {
            const trimmedUrl = data.replace(/\/$/, "");
            const newUrl = trimmedUrl.replace(/^(https?:\/\/)?www\./, '$1');
            basicDetailRef.current.updateFormFieldValue({
                website: newUrl
            });
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
        if (customerName !== '' && customerName.length >= 3) {
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
                    {!isGetCustomersBasicInformationByIdFetching && isRemoveFields ?
                        <FormCreator
                            config={formData}
                            ref={basicDetailRef}
                            {...formData}
                            onActionChange={formActionHandler}
                            onCheckBoxChange={formActionHandler}
                            onInputChange={formInputHandler}
                            handleInputGroupButton={handleInputGroupButton}
                            handleInputShowInfo={handleExistingInfo}

                        />
                        : <DataLoader />}
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
                <ExistingCustomerSupplierInfo parentRef={parentRef} isOrderManage={false} isSupplier={false}
                    getExistingInfoByName={useLazyGetCustomersDetailsByCutomerNameQuery} />
                : null}

            {validateCustomerSupplierInfoModal && isValidateCustomerNameEmailWebsiteSucess ?
                <ValidateCustomerSupplierInfo
                    isSupplier={false}
                    isModalOpen={validateCustomerSupplierInfoModal}
                    gridCnfiguration={validateNameEmailWebsiteGrid}
                    gridData={validateCustomerSupplierData}
                    isGridLoading={isLoading}
                    onAdd={addCustomerCountine}
                />
                : null}
        </div>
    );
};

AddEditCustomerBasicDetail.propTypes = {
    keyId: PropTypes.number,
    getCustomerById: PropTypes.func,
    isOpen: PropTypes.bool,
    onSidebarClose: PropTypes.func,
    isEditablePage: PropTypes.bool,
};
export default AddEditCustomerBasicDetail;
