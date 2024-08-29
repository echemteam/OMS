/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { DocumentFormData } from "../Config/DocuementsData";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { ModulePathName } from "../../../../../utils/Enums/commonEnums";
import PropTypes from 'prop-types';
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";

const AddDocument = ({ showModal, keyId, isSupplier, addDocuments, handleToggleModal, onSuccess }) => {

    // console.log("editDocumentData", editDocumentData)

    const [formData, setFormData] = useState(DocumentFormData)

    const ref = useRef();

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

    const handleSave = () => {
        const data = ref.current.getFormData();
        if (data) {
            const documentList = [
                {
                    name: data.attachment.fileName,
                    attachment: data.attachment.fileName,
                    base64File: data.attachment.base64Data,
                    documentTypeId: data.documentTypeId && typeof data.documentTypeId === "object" ? data.documentTypeId.value : data.documentTypeId,
                }
            ]
            const requestData = {
                storagePath: isSupplier ? ModulePathName.SUPPLIER : ModulePathName.CUSTOMER,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                documentInfoList: documentList
            };
            add(requestData);
        }
    };


    const onFormDataChange = (updatedData) => {
        formData.initialState = {
            ...updatedData,
            name: updatedData.attachment && updatedData.attachment.fileName
        };
        setFormData(formData);
    }

    return (
        <div className="row add-documentForm">
            <FormCreator config={formData} ref={ref} {...formData} onFormDataChange={onFormDataChange} />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            // buttonText={editDocumentData ? "Update" : "Add"}
                            buttonText="Add"
                            onClick={handleSave}
                            isLoading={isAddLoading} />
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