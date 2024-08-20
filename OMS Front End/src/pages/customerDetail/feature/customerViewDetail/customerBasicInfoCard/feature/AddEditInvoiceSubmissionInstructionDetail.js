import { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { InvoiceFormData } from "../../../../../supplierDetails/feature/supplierBasicDetail/config/InvoiceForm.data";
import { useAddEditCustomerInvoiceMutation, useLazyGetDetailsbyCustomerIDQuery } from "../../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../../services/toastService/ToastService";

const AddEditInvoiceSubmissionInstructionDetail = ({ customerId, handleToggleModal, isInvoiceModelShow, setIsInvoiceModelShow }) => {
    const invoiceRef = useRef();
    const [formData, setFormData] = useState(InvoiceFormData);
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [addEditCustomerInvoice, { isLoading: isAddEditCustomerInvoiceLoading, isSuccess: isAddEditCustomerInvoiceSuccess, data: isAddEditCustomerInvoiceData }] = useAddEditCustomerInvoiceMutation();
    const [GetDetailsbyCustomerID, { isFetching: isGetDetailByCustomerIdFetching, isSuccess: isGetDetailByCustomerIdSuccess, data: isGetDetailByCustomerIdData, },] = useLazyGetDetailsbyCustomerIDQuery();

    useEffect(() => {
        if (isInvoiceModelShow) {
            GetDetailsbyCustomerID(customerId);
        }
    }, [isInvoiceModelShow])

    useEffect(() => {
        if (!isGetDetailByCustomerIdFetching && isGetDetailByCustomerIdSuccess && isGetDetailByCustomerIdData) {
            let newFormData = { ...formData };
            newFormData.initialState = {
                invoiceSubmissionInstruction: isGetDetailByCustomerIdData.invoiceSubmissionInstruction,
            };
            setFormData(newFormData);
        }
    }, [isGetDetailByCustomerIdFetching, isGetDetailByCustomerIdSuccess, isGetDetailByCustomerIdData])

    useEffect(() => {
        if (isAddEditCustomerInvoiceSuccess && isAddEditCustomerInvoiceData) {
            ToastService.success(isAddEditCustomerInvoiceData.errorMessage);
            setIsInvoiceModelShow(false);
        }
    }, [isAddEditCustomerInvoiceSuccess, isAddEditCustomerInvoiceData]);

    const handleInvoiceSubmissionData = () => {
        let invoiceData = invoiceRef.current.getFormData();
        let request = {
            customerId: customerId,
            invoiceSubmissionInstruction: invoiceData.invoiceSubmissionInstruction,
            customerAccountingSettingId: isGetDetailByCustomerIdData?.customerAccountingSettingId || 0,
        };

        if (invoiceData && !invoiceData.customerAccountingSettingId) {
            addEditCustomerInvoice(request);
        } else {
            addEditCustomerInvoice(request);
        }
    }

    return (<div className="row custom-height-tiny add-edit-notesForm">
        <FormCreator config={formData} ref={invoiceRef} {...formData} key={shouldRerenderFormCreator} />
        <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Save"
                        onClick={handleInvoiceSubmissionData}
                        isLoading={isAddEditCustomerInvoiceLoading}
                    />
                    <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={handleToggleModal}
                    />
                </div>
            </div>
        </div>
    </div>)
}
export default AddEditInvoiceSubmissionInstructionDetail;