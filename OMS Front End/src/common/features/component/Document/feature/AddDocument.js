/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { DocumentFormData } from "../Config/DocuementsData";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { FieldSettingType, ModulePathName } from "../../../../../utils/Enums/commonEnums";
import PropTypes from 'prop-types';
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { useValidateAndAddApprovalRequests } from "../../../../../utils/CustomHook/useValidateAndAddApproval";
import { FunctionalitiesName } from "../../../../../utils/Enums/ApprovalFunctionalities";
import { setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

const AddDocument = ({ showModal, keyId, isSupplier, addDocuments, handleToggleModal, onSuccess, isEditablePage, customerStatusId }) => {

    const ref = useRef();
    const [formData, setFormData] = useState(DocumentFormData);
    const { ValidateRequestByApprovalRules, isApprovelLoading } = useValidateAndAddApprovalRequests();

    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
    */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addDocuments();

    useEffect(() => {
        if (showModal) {

            onResetForm(formData, setFormData, DocumentFormData.initialState);
        }
    }, [showModal])

    useEffect(() => {
        if (isAddSuccess && isAddData) {
            if (isAddData.errorMessage.includes('Document name')) {
                ToastService.warning(isAddData.errorMessage);
                return;
            } else if (isAddData.errorMessage.includes('exists')) {
                ToastService.warning(isAddData.errorMessage);
                return;
            }
            onSuccess();
            onResetForm(formData, setFormData, DocumentFormData.initialState);
            ToastService.success(isAddData.errorMessage);
        }
    }, [isAddSuccess, isAddData]);

    const handleSave = async () => {
        const data = ref.current.getFormData();
        if(data){
        const transformedData = buildTransformedDocumentData(data, isSupplier, keyId,);

        const documentList = [
            {   
                name: data?.name,
                attachment: data?.attachment.fileName,
                base64File: data?.attachment.base64Data,
                documentTypeId: transformedData?.documentTypeId,
                documentType:transformedData.documentType
            }
        ];

        const requestData = {
            storagePath: isSupplier ? ModulePathName.SUPPLIER : ModulePathName.CUSTOMER,
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            documentInfoList: documentList,
            // ...transformedData,  
        };

        // Uncomment the following lines if you need to handle approval requests
        // if (!isSupplier && isEditablePage && isCustomerOrSupplierApprovedStatus(customerStatusId)) {
        //     await handleApprovalRequest(requestData, null);
        // } else {
        add(requestData);
    }
        // }
    };


    const handleApprovalRequest = async (newValue) => {
        const request = { newValue, oldValue: null, isFunctional: true, eventName: FunctionalitiesName.UPLOADCUSTOMERDOCUMENT };
        const modifyData = await ValidateRequestByApprovalRules(request);
        if (modifyData.newValue) {
            onSuccess();
            onResetForm(formData, setFormData, DocumentFormData.initialState);
        }
    };

    const buildTransformedDocumentData = (data, isSupplier, keyId) => {

        const transformDocumentTypeData = (data) => {
            if (data && typeof data === 'object') {
                return {
                    id: data.value || data.id || 0,
                    type: data.text || "",
                };
            }
            return {
                id: data || 0,
                type: "",
            };
        };


        const { id: documentTypeId, type: documentType } = transformDocumentTypeData(data?.documentTypeId);

        return {
            ...data,
            [isSupplier ? 'supplierId' : 'customerId']: keyId,
            documentTypeId,
            documentType,
            createdAt:  new Date(),

        };
    };

    const onFormDataChange = (updatedData) => {
        const fileName = updatedData.name ? updatedData.name : (updatedData.attachment && updatedData.attachment.fileName) || "";
        setFormData(prevFormData => ({
            ...prevFormData,
            initialState: {
                ...updatedData,
                name: updatedData.name || fileName,
                attachment: {
                    base64Data: updatedData.attachment.base64Data,
                    fileName: fileName
                }
            }
        }));
    }
    const handleDropdownAction = (data, dataField) => {
        if (dataField === 'documentTypeId') {
            if (!data) {
                setFieldSetting(formData, 'documentTypeId', FieldSettingType.ISTEXT, data);
                ref.current.updateFormFieldValue({ documentTypeId: null });
            }
        }
    }
    //** Action Handler */
    const formActionHandler = {
        DA_CHANGED: handleDropdownAction
    };
    return (
        <div className="row add-documentForm">
            <FormCreator config={formData} ref={ref} {...formData} onFormDataChange={onFormDataChange} onDropdownAction={formActionHandler} />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            // buttonText={editDocumentData ? "Update" : "Add"}
                            buttonText="Add"
                            onClick={handleSave}
                            isLoading={isApprovelLoading || isAddLoading} />
                        {/* <Buttons
                            buttonTypeClassName="theme-button ml-5"
                            buttonText={editDocumentData ? "Update and Close" : "Add and Close"}
                            onClick={handleSave}
                            isLoading={isAddLoading} /> */}
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={handleToggleModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}
AddDocument.propTypes = {
    keyId: PropTypes.number.isRequired,
    isSupplier: PropTypes.bool.isRequired,
    addDocuments: PropTypes.func.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};
export default AddDocument;