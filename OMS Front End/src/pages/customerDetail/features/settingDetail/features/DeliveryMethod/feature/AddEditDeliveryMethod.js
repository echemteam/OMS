import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CenterModel from "../../../../../../../components/ui/centerModel/CenterModel";
import Buttons from "../../../../../../../components/ui/button/Buttons";
import { addEditDeliveryFormData } from "../config/DevliveryConfig";
import { useAddDeliveryMethodsMutation, useUpdateDeliveryMethodsMutation } from "../../../../../../../app/services/customerSettingsAPI";
import BasicDetailContext from "../../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import ToastService from "../../../../../../../services/toastService/ToastService";

const AddEditDeliveryMethod = forwardRef(({ showModal, handleToggleModal, isEdit, editFormData, childRef, onSuccess }) => {
    //** State */
    const ref = useRef();
    const { customerId } = useContext(BasicDetailContext);
    const [formData, setFormData] = useState(addEditDeliveryFormData);

    //** API Call's */
    const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddDeliveryMethodsMutation();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateDeliveryMethodsMutation();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        let request;
        if (data) {
            request = {
                charge: data.charge,
                customerId: customerId,
                isPrimary: data.isDeliveryMethodPrimary,
                customerDeliveryMethodId: data.customerDeliveryMethodId ? data.customerDeliveryMethodId : 0,
                deliveryMethodId: data.chargeType && typeof data.chargeType === "object" ? data.chargeType.value : data.chargeType,
            }
            if (data && !data.customerDeliveryMethodId) {
                addEdit(request)
            } else if (data && data.customerDeliveryMethodId) {
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
            let form = { ...addEditDeliveryFormData };
            form.initialState = {
                ...editFormData,
                chargeType: editFormData.deliveryMethodId,
                charge: editFormData.charge,
                isDeliveryMethodPrimary: editFormData.isPrimary,
            }
            setFormData(form);
        } else if (!isEdit) {
            onResetData();
        }
    }, [isEdit, editFormData])
    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditDeliveryFormData };
        form.initialState = { ...addEditDeliveryFormData.initialState };
        setFormData(form);
    };



    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Delivery Method" modelSizeClass="w-30" >
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
})

export default AddEditDeliveryMethod;