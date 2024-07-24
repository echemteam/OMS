/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { DocumentFormData } from "../Config/DocuementsData";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
//** Service's */
import ToastService from "../../../../../services/toastService/ToastService";
import { ModulePathName } from "../../../../../utils/Enums/commonEnums";
import PropTypes from 'prop-types'; 

const AddDocument = ({ keyId, isSupplier, addDocuments, handleToggleModal, onSuccess }) => {

    const ref = useRef();

    /**
        * This hook dynamically sets the API call based on the module (customer or supplier).
        * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
    */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = addDocuments();

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
            ToastService.success(isAddData.errorMessage);
        }
    }, [isAddSuccess, isAddData]);

    const handleSave = () => {
        const data = ref.current.getFormData();
        if (data) {
            const requestData = {
                ...data,
                base64File: data.attachment.base64Data,
                attachment: data.attachment.fileName,
                storagePath: isSupplier ? ModulePathName.Supplier : ModulePathName.Customer,
                [isSupplier ? 'supplierId' : 'customerId']: keyId,
                documentTypeId: data.documentTypeId && typeof data.documentTypeId === "object" ? data.documentTypeId.value : data.documentTypeId,
            };
            add(requestData);
        }
    };

    return (
        <div className="row add-documentForm">
            <FormCreator config={DocumentFormData} ref={ref} {...DocumentFormData} />
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText="Add"
                            onClick={handleSave}
                            isLoading={isAddLoading} />
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