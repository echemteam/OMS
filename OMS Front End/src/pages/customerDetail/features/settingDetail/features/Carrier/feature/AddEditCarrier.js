import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import CenterModel from "../../../../../../../components/ui/centerModel/CenterModel";
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../../../components/ui/button/Buttons";
import { addEditCarrierFormData } from "../config/CarrierConfig";
import { useAddShppingDeliveryCarriersMutation, useUpdateShppingDeliveryCarriersMutation } from "../../../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const AddEditCarrier = forwardRef(({ showModal, handleToggleModal, isEdit, editFormData, childRef, onSuccess }) => {

    //** State */
    const ref = useRef();
    const { formFields } = addEditCarrierFormData;
    const { customerId } = useContext(BasicDetailContext);
    const [formData, setFormData] = useState(addEditCarrierFormData);

    //** API Call's */
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddShppingDeliveryCarriersMutation();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateShppingDeliveryCarriersMutation();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        let request;
        if (data) {
            request = {
                customerId: customerId,
                isPrimary: data.isCarrierPrimary,
                accountNumber: data.accountNumber,
                customerDeliveryCarrierId: data.customerDeliveryCarrierId ? data.customerDeliveryCarrierId : 0,
                carrierId: data.carrier && typeof data.carrier === "object" ? data.carrier.value : data.carrierId,
            }
            if (data && !data.customerDeliveryCarrierId) {
                addEdit(request)
            } else if (data && data.customerDeliveryCarrierId) {
                update(request);
            }
        }
    };

    //** UseEffect */
    useEffect(() => {
        if (isAddEditSuccess && isAddEditData) {
            if (isAddEditData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isAddEditData.errorMessage);
                return;
            }
            ToastService.success(isAddEditData.errorMessage);
            onSuccess();
        }
    }, [isAddEditSuccess, isAddEditData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            if (isUpdateData.errorMessage.includes('EXISTS')) {
                ToastService.warning(isUpdateData.errorMessage);
                return;
            }
            ToastService.success(isUpdateData.errorMessage);
            onSuccess();
        }
    }, [isUpdateSuccess, isUpdateData]);

    useEffect(() => {
        if (isEdit && editFormData) {
            formFieldsDisabled(true);
            let form = { ...addEditCarrierFormData };
            form.initialState = {
                ...editFormData,
                isCarrierPrimary: editFormData.isPrimary
            }
            setFormData(form);
        } else if (!isEdit) {
            onResetData();
            formFieldsDisabled(false);
        }
    }, [isEdit, editFormData]);

    const formFieldsDisabled = (isDisable) => {
        if (formFields) {
            let chargeTypeData = formFields.find(data => data.id === 'carrier');
            if (chargeTypeData && chargeTypeData.fieldSetting) {
                chargeTypeData.fieldSetting.isDisabled = isDisable;
            }
        }
    }

    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditCarrierFormData };
        form.initialState = { ...addEditCarrierFormData.initialState };
        setFormData(form);
    };

    //** Use Imperative Handle  */
    useImperativeHandle(childRef, () => ({
        callChildFunction: onResetData,
    }));

    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Carrier" modelSizeClass="w-30" >
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <FormCreator config={formData} ref={ref} {...formData} />
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="d-flex align-item-end justify-content-end">
                        <div className="d-flex align-item-end">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText={isEdit ? 'Edit' : 'Add'}
                                onClick={handleAddEdit}
                                isLoading={isAddEditLoading || isUpdateLoading}
                            />
                            <Buttons
                                buttonTypeClassName="dark-btn ml-5"
                                buttonText="Cancel"
                                onClick={handleToggleModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CenterModel>
    )
});

export default AddEditCarrier;